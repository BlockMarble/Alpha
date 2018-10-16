var addrChars = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
var randAddrs = [];
var shortToLong = {};
var randAddrUsed = 0;


for(var i = 0 ; i<100 ; i++){

	let s;
	
	while(!s || shortToLong[s]){
		s = "";
		for(var j = 0 ; j < 8 ; j ++){
			var x = Math.floor(Math.random() * 15.999);
			s += addrChars[x];
		}
	}

	for(var j = 8 ; j < 40 ; j ++){
		var x = Math.floor(Math.random() * 15.999);
		s += addrChars[x];
	}	

	s = "0x"+s;
	shortToLong[short(s)] = s;
	randAddrs.push(s);
}


console.log(randAddrs);

var chain_interface = {};

var maps = [];
var games = {};
var gameArray = [];

function short(addr){
	if(shortToLong[addr]) return addr;
	return addr.substr(2,8);
}
function genRandAddr(){	var addr = randAddrs[randAddrUsed];	randAddrUsed++;	return addr;}

var realAddr = genRandAddr();
var currentAddr = realAddr;


var game = null;
var players = {};
var lands = [];

function genDice(){ return Math.floor(game.diceMin+Math.random()*(game.diceMax-game.diceMin+0.9999));}

function joinAndInitPlayer(addr,game){
	var players_ = null;
	if(game){
		players_ = game.players;
	}else{
		players_ = players;
	}

	var player = {};
	player.addr = addr;
	player.prevDir = "none";
	player.pos = [0,0];
	player.cash = 100000;
	player.owns = {};

	players_[short(addr)] = player;
}

function makeOwnRelation(){

}
function removeOwnRelation(player,land){
	land.owner = null;
	delete player.owns[''+land.x+'_'+land.y];
}

function liquidateVal(land){
	return land.price + land.buildings * land.price * 0.1;
}

function liquidate(addr,target){
	var player = players[short(addr)];
	var owns = player.owns;
	for(let k in owns){
		let xy = k.match(/\d+/g);
		let land = lands[parseInt(xy[1])][parseInt(xy[0])];
		removeOwnRelation(player,land);
		player.cash += liquidateVal(land);
		if(player.cash >= target){
			break;
		}
	}
}

function build_i(player,posX,posY,num){
	var land = lands[posY][posX];

	if(land && land.owner == player.addr && player.cash >= 1000*num){
		player.cash -= 1000*num;
		land.buildings += num; 
	}else{
		console.log("build attempt invalid")	
	}
}


function bid_i(player,money){
	var land = lands[player.pos[1]][player.pos[0]];
	if(land.greatestBid<money){
		land.greatestBidder = player.addr;
		land.greatestBid = money;
	} 
}


function automove(addr){
	var player = players[addr];
	var pos = player.pos;

	var dirToMoveIndex = {left:0,right:1,up:2,down:3};
	var moveIndexToDir = {0:"left",1:"right",2:"up",3:"down"};

	var	moves = [[-1,0],[1,0],[0,-1],[0,1]];
	var counderMoveId = [1,0,3,2];
	var prevMoveId = dirToMoveIndex[player.prevDir];

	while(player.dice > 0){
		player.dice -- ;

		for(let i = 0 ; i < 4 ; i ++){

			let move = moves[i];
			let pos0_new = pos[0]+move[0]; 	
			let pos1_new = pos[1]+move[1];

			if( 
				i != counderMoveId[prevMoveId] 
				&& pos0_new>=0 && pos0_new< game.width && pos1_new>=0 && pos1_new<game.height 
				&& game.walls[pos1_new][pos0_new] != 0
				){

				prevMoveId = i; 
				pos = [pos0_new,pos1_new];
				break;
			}
		}

	}
	
	player.pos = pos;
	player.prevDir = moveIndexToDir[prevMoveId];
}

function autotrade(addr){
	var player = players[addr];
	var pos = player.pos;
	var land = lands[pos[1]][pos[0]]

	if(Math.random()>0.5 && !land.owner && land.greatestBid+1 <= player.cash ){
		var bid = land.greatestBid + 1;
		bid_i(player,bid);
		console.log(`player[${addr}] bidding ${bid} to land at ${pos[0]}/${pos[1]}`);	
	}


	if(Math.random()>0.5){
		let owns = player.owns;
		for(k in owns){
			if(Math.random()>0.5){
				let xy = k.match(/\d+/g);
				//build_i(player,parseInt(xy[0]),parseInt(xy[1]),1);
			}	
		}
	}
}

	// ["createMap_from_panelId-0",
chain_interface.createMap = function(width,height,playerMin,playerMax,diceMin,diceMax,walls,prices,callback){
	var id = maps.length;
	var map = {};
	maps.push(map);

	map.width = width;
	map.height = height;
	map.playerMin = playerMin;
	map.playerMax = playerMax;
	map.diceMin = diceMin;
	map.diceMax = diceMax;
	map.walls = walls;
	map.prices = prices;

	callback(id);
};


	// "loadMap_input_panelId-0",
chain_interface.loadMap = function(id,callback){
	if(maps[id]){
		callback(maps[id]);
	}else{
		console.log("map does not exist");
	}
}
	
	// "createGame_input_panelId-0",
chain_interface.createGame = function(mapid,callback){
	var addr = genRandAddr();
	var shortAddr = short(addr);
	games[shortAddr] = {};
	var map = maps[mapid];




	["width","height","playerMin","playerMax","diceMin","diceMax","walls","prices"].forEach(elm=>{
		games[shortAddr][elm] = map[elm]
	})

	var game = games[shortAddr];
	gameArray.push(shortAddr);


	game.mapid = mapid;

	game.players = [];
	game.cashes = {};
	game.poses = {};
	game.dices = {};

	game.owners = {};
	game.buildings = {};

	players = {};
	lands = [];
	for(let i = 0 ; i < map.walls.length ; i++){
		let row = map.walls[i];
		landsRow = new Array(row.length);
		for(let j = 0 ; j < row.length ; j ++){
			if(row[j] != 0){
				let land = {};
				land.x = j;
				land.y = i;
				land.greatestBidder = null;
				land.owner = null;
				land.buildings = 0;
				land.price = map.prices[j][i];
				land.greatestBid = land.price;				
				landsRow[j] = land;
			}
		}
		lands[i] = landsRow;	
	}

	game.lands = lands;
	game.players = players;

	joinAndInitPlayer(currentAddr,game);

	callback(addr);
}

	// "joinGame_input_panelId-0",
chain_interface.joinGame = function(addr,callback){
	if(games[short(addr)]){
		game = games[short(addr)];
		lands = game.lands;
		players = game.players;

		if(!game.players[short(currentAddr)]){
			joinAndInitPlayer(currentAddr);
			callback("success");
		}else{
			callback("success : you were already joined, setting game to "+ addr);
		}

	}else{
		callback("game does not exist");
	}
}
	// "startGame_panelId-0",
chain_interface.startGame = function(callback){
	if(game){
		for(k in players) players[k].dice = genDice();
		callback("success");
	}else{
		callback("no game")
	}
}

	// "useFakePlayerAddress_input_panelId-0",
chain_interface.useFakePlayerAddress = function(addr,callback){
	var fakeAddr = null;
	var genNewdMsg = "";
	if(shortToLong[short(addr)]){
		fakeAddr = shortToLong[short(addr)];
	}else{
		fakeAddr = genRandAddr();
		genNewdMsg = " newly gened : " 
	}
	currentAddr = fakeAddr;
	callback(fakeAddr);
}

	// "useRealPlayerAddress_panelId-0",
chain_interface.useRealPlayerAddress = function(callback){
	currentAddr = realAddr;
	callback(realAddr);
}

	// "rollDice_panelId-1",
chain_interface.rollDice = function(callback){
	console.log(short(currentAddr));
	callback(players[short(currentAddr)].dice);
}


	// "viewMap_panelId-1",
chain_interface.viewMap = function(mapid,callback){
	callback(maps[mapid]);	
}

	// "viewBoard_panelId-1",
chain_interface.viewBoard = function(callback){
	callback(game);
}

var dirs = {left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]};
var counter = {left:"right",right:"left",up:"down",down:"up"}
for(k in dirs){
	let dir = k;

	chain_interface[dir] = function(num,callback){
		let vels = dirs[dir];
		let player = players[short(currentAddr)];

		console.log(player)
		console.log(players)
		console.log(currentAddr)
		console.log(dir)

		if(player.dice == 0){
			callback("dice is 0 unable to move")
			return;
		}

		if(!player.testPos){
			player.testPos = [player.pos[0],player.pos[1]];
		}
		if(!player.testDice){
			player.testDice = player.dice;
		}

		if(counter[player.prevDir] == dir){
			callback("cannot move to the direction you came from")
			return;
		}

		player.prevDir = dir;

		if(player.dice < num){
			callback("need more dice .. ")
			return;
		}


		var testTestPos = [player.testPos[0],player.testPos[1]];

		for(let i = 0;i<=num;i++){
			testTestPos[0] = player.testPos[0] + vels[0]*i;
			testTestPos[1] = player.testPos[1] + vels[1]*i;
			

			if(	testTestPos[0]>=game.walls[0].length ||  
				testTestPos[1]>=game.walls.length ||  
				testTestPos[0]<0 ||  
				testTestPos[1]<0 ) {

				console.log(num);
				console.log(game.walls[0].length)
				console.log(game.walls.length)
				console.log(testTestPos);

				callback(" move exceeds bounds");
				return;
			}

			if(game.walls[testTestPos[0]][testTestPos[1]] == 0){
				
				callback("an invalid move, found wall in path");
				return;
			}
		}

		player.testPos = testTestPos;
		player.testDice -= num;
		callback("success : move registered for flush");

	}
}

	// "bid_input_panelId-1",
chain_interface.bid = function(money,callback){
	var player = players[short(currentAddr)]; 
	if(player.cash >= money){
		bid_i(player,money);	
	}else{
		console.log(" ! error : not enough cash ");
	}
}

	// "sell_input_panelId-1",
chain_interface.sell = function(landposX,landposY,callback){
	var land = lands[landposY][landposX];
	var player = players[short(currentAddr)]; 	
	if(land.owner == short(currentAddr)){
		players[land.owner].cash += 100000;
		land.owner = null;
	}else{
		console.log("cannot sell")
	}
}

	// "build_input_panelId-1"].forEach(plotInPanel)



chain_interface.build = function(landposX,landposY,num,callback){
	var player = players[short(currentAddr)]; 	
	if(build_i(player,landposX,landposY,num)){
		callback("success");
	}else{
		callback("failed");
	}	
};

chain_interface.endTurn = function(callback){
	if(game.dices[short(currentAddr)] == 0){
		callback("success")
	}else{
		console.log("invalid")	
	}	
};


function calcFee(x,y){
	var land = lands[y][x];
	return land.price*Math.pow(1.1,land.buildings)*0.1;
}

chain_interface.sum = function(callback){
	console.log('---------------');
	var players = game.players;

	for(k in players){
		let player = players[k];
		let landOwner = lands[player.pos[1]][player.pos[0]].owner;

		if( landOwner && short(landOwner) != k ){  //leelang : 그냥 ~.owner is player ? 로 처리하게 한다면 ?
			let fee = calcFee(player.pos[0],player.pos[1]);
			if(fee>player.cash && !liquidate(k,fee-player.cash)){
				console.log("player["+shortToLong[k]+"] has lost the game");
			}

			console.log(`player ${k} has payed the fee ${fee} to player ${short(landOwner)}`)
			player.cash -= fee;
			players[short(landOwner)].cash += fee;
		}
	}


	for(let i = 0; i < lands.length ; i++){
		let landRow = lands[i];
		for(let j = 0; j < landRow.length ; j++){
			let land = landRow[j];
			
			if(land&&!land.owner && land.greatestBidder){
				players[short(land.greatestBidder)].owns[`${j}_${i}`] = true;
				players[short(land.greatestBidder)].cash -= land.greatestBid;
				land.owner = land.greatestBidder;
				land.greatestBidder = null;
				land.greatestBid = land.price;
			}
		}
	}


	for(k in players){
		if(players[k].dice > 0){
			automove(k)
			autotrade(k)
			players[k].dice = genDice();
		}
	}
};


chain_interface.viewMapList = function(start,end,callback){




}

chain_interface.viewBoardPlayerPoses = function(callback){

	var board = new Array(game.height);
	for(let i = 0 ; i < board.length ; i++){
		board[i] = new Array(game.width);
		board[i].fill(0);
	}

	for(k in players){
		let player = players[k];
		board[player.pos[1]][player.pos[0]]++;
	}

	callback(board);
};

chain_interface.view


chain_interface.viewGamesList = function(start,end,callback){
	var list = [];

	var lastIndex = gameArray.length-1;
	var i0 = start > lastIndex ? lastIndex : start; 
	var i1 = end > lastIndex ? lastIndex : end;

	for(let i = i0 ; i <= i1 ; i ++){
		game = games[gameArray[i]];
		var gameInfo = {};

		['mapid','width','height'].forEach(elm=>{gameInfo[elm] = game[elm];})

		list.push(gameInfo);
	}

	callback(list);
};

chain_interface.viewPlayerStates = function(callback){
	callback(players);
}

chain_interface.viewLandOwners = function(callback){
	var list = [];
	for(var i = 0 ; i < lands.length ; i++){
		for(var j = 0 ; j < lands[i].length ; j++){
			if(lands[i][j]){
				//console.log(`owner of (${j},${i}) : ${lands[i][j].owner}`);
				list.push([lands[i][j].owner,j,i]);
			}
		}
	} 
}


;if(false)["createMap","createGame","joinGame","endTurn","sum"].forEach(elm=>{
	var tmp = chain_interface[elm];
	chain_interface[elm] = function(){
		if(confirm("transaction : "+elm)){
			tmp.apply(null,arguments);
		}
	};
})

;["build","sell","bid"].forEach(elm=>{
	var tmp = chain_interface[elm];
	chain_interface[elm] = function(){
		if(players[short(currentAddr)].dice != 0){
			arguments[arguments.length-1]("you should consume all your moves to make this command!");
		}else{
			tmp.apply(null,arguments);
		}
	};
});


