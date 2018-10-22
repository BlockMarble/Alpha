var addrChars = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
var randAddrs = [];
var randAddrUsed = 0;



var shortToLong = {};
function short(addr){ if(shortToLong[addr]) return addr;return addr.substr(2,8);}
function genRandAddr(){	var addr = randAddrs[randAddrUsed];	randAddrUsed++;	return addr;}


for(var i = 0 ; i<300 ; i++){

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

var chain_interface = {};
chain_interface.defaultArgs = {};
chain_interface.funcsList = [];
chain_interface.argNames = {};
	

var maps = [];
var games = {};
var gameArray = [];

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

function makeOwnRelation(player,land){
	land.owner = player.addr;
	player.owns[''+land.x+'_'+land.y] = true;
}
function removeOwnRelation(player,land){
	land.owner = null;
	delete player.owns[''+land.x+'_'+land.y];
}
function ownsKeyToLand(k){
	let xy = k.match(/\d+/g);
	let land = lands[parseInt(xy[1])][parseInt(xy[0])];	
	return land;
}

function liquidateVal(land){
	return land.price + land.buildings * 1000;
}

function transfer(cash,from,to,str){

	if(!from){from = {addr:"Ox<dealer>000000000000000",cash:0}};
	if(!to){to = {addr:"Ox<dealer>000000000000000000",cash:0}};
	
	var resultString = "";
	console.log(` ${short(from.addr)} had cash ${from.cash} and '${str}' paid ${cash} to ${short(to.addr)}`);
	from.cash -= cash;
	
	resultString += ` now ${short(from.addr)} has cash ${from.cash}`;
	to.cash += cash;
	resultString += ` now ${short(to.addr)} has cash ${to.cash}`;
	console.log(resultString);
}

function liquidate(land){
	let owner = players[short(land.owner)];
	removeOwnRelation(owner,land);	
	transfer(liquidateVal(land),null,owner, `liquidation of ${land.x}_${land.y}`);
}

var build_i_totalCount = 0;

function build_i(player,land,num){
	if(land && land.owner == player.addr){
		if( player.cash >= 1000*num){
			land.buildings += num;
			build_i_totalCount+=num; 
			transfer(1000*num,player,null,`building cost is ${num} X 1000 at ${land.x}_${land.y}`)
			return true;
		}else{
			console.log("build attempt invalid : player has not enough money")	
		}
	}else{
		console.log("build attempt invalid")	
		return false;
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
		for(let k  in owns){
			if(Math.random()>0.5){
				build_i(player,ownsKeyToLand(k),1);
			}	
		}
	}

}

chain_interface.funcsList.push("createMap_panelId-0_fakeArgs_to-createGame");
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



chain_interface.argNames['loadMap'] = "mapid";
chain_interface.defaultArgs['loadMap'] = [0];
chain_interface.funcsList.push("loadMap_input-1_panelId-0");
chain_interface.loadMap = function(id,callback){
	if(maps[id]){
		callback(maps[id]);
	}else{
		console.log("map does not exist");
	}
}
	
chain_interface.funcsList.push("createGame_input-1_panelId-0_to-joinGame");
chain_interface.createGame = function(mapid,callback){
	var addr = genRandAddr();
	var shortAddr = short(addr);
	games[shortAddr] = {};
	var map = maps[mapid];


	["width","height","playerMin","playerMax","diceMin","diceMax","walls","prices"].forEach(elm=>{
		games[shortAddr][elm] = map[elm]
	})

	var game = games[shortAddr];
	gameArray.push(addr);


	game.addr = addr;
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

chain_interface.funcsList.push("joinGame_input-1_panelId-0");
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
		callback("!: game does not exist");
	}
}

chain_interface.funcsList.push("startGame_panelId-0");
chain_interface.startGame = function(callback){
	if(game){
		for(let k in players) players[k].dice = genDice();
		callback("success");
	}else{
		callback("!: no game please join a game ")
	}
}

chain_interface.defaultArgs["useFakePlayerAddress"] = ["xxxx"];
chain_interface.funcsList.push("useFakePlayerAddress_input-1_panelId-0");
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

chain_interface.funcsList.push("useRealPlayerAddress_panelId-0");
chain_interface.useRealPlayerAddress = function(callback){
	currentAddr = realAddr;
	callback(realAddr);
}


chain_interface.funcsList.push("rollDice_panelId-1");
chain_interface.rollDice = function(callback){
	if(players && players[short(currentAddr)]){
		callback(players[short(currentAddr)].dice);
		return;
	}
	callback("!: error, unable to roll dice");
}

chain_interface.funcsList.push("viewBoard_panelId-1");
chain_interface.viewBoard = function(callback){
	callback(game);
}


chain_interface.funcsList.push("left_input-1_panelId-1");
chain_interface.funcsList.push("right_input-1_panelId-1");
chain_interface.funcsList.push("up_input-1_panelId-1");
chain_interface.funcsList.push("down_input-1_panelId-1");
var dirs = {left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]};
var counter = {left:"right",right:"left",up:"down",down:"up"}
for(let k in dirs){
	let dir = k;
	chain_interface[dir] = function(num,callback){
		let vels = dirs[dir];
		let player = players[short(currentAddr)];

		if(player.dice == 0){
			callback("!: dice is 0 unable to move")
			return;
		}

		if(!player.testPos){
			player.testPos = [player.pos[0],player.pos[1]];
		}
		if(!player.testDice){
			player.testDice = player.dice;
		}

		if(counter[player.prevDir] == dir){
			callback("!: cannot move to the direction you came from")
			return;
		}

		player.prevDir = dir;

		if(player.testDice < num){
			callback("!: cannon make move, need more dice .. ")
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

				callback("!: move exceeds bounds");
				return;
			}

			if(game.walls[testTestPos[0]][testTestPos[1]] == 0){
				
				callback("!: an invalid move, found wall in path");
				return;
			}
		}

		player.testPos = testTestPos;
		player.testDice -= num;
		if(player.testDice <= 0){
			player.dice = 0;
			player.pos = player.testPos;
			player.dice = player.testDice;
			player.testPos = null;
			player.testDice = null;
			callback("success : move register finished, no more dice to consume");
		}else{
			callback("success : move registered, dice still left :" + player.testDice);
		}
	}
}


chain_interface.funcsList.push("bid_input-1_panelId-1");
chain_interface.bid = function(money,callback){
	var player = players[short(currentAddr)]; 
	if(player.cash >= money){
		bid_i(player,money);	
	}else{
		console.log(" ! error : not enough cash ");
	}
}

chain_interface.funcsList.push("sell_input-2_panelId-1");
chain_interface.sell = function(landposX,landposY,callback){
	var land = lands[landposY][landposX];
	var player = players[short(currentAddr)]; 	
	if(land.owner == currentAddr){
		liquidate(land);
	}else{
		console.log("!: you do not own this land, cannot sell")
	}
}



chain_interface.funcsList.push("build_input-3_panelId-1");
chain_interface.build = function(landposX,landposY,num,callback){
	var player = players[short(currentAddr)]; 	
	if(build_i(player,lands[landposY][landposX],num)){
		callback("success");
	}else{
		callback("!: failed for some reason ");
	}	
};

chain_interface.funcsList.push("endTurn_panelId-1");
chain_interface.endTurn = function(callback){
	if(players[short(currentAddr)].dice == 0){
		callback("success")
	}else{
		console.log("!: consume more dice")	
	}	
};


function calcFee(x,y){
	var land = lands[y][x];
	return Math.floor(land.price*Math.pow(2,land.buildings)*0.1);
}

chain_interface.funcsList.push("sum_panelId-1");
chain_interface.sum = function(callback){
	console.log('---------------');
	var players = game.players;

	for(let k in players){
		let player = players[k];
		let land = lands[player.pos[1]][player.pos[0]];
		let landOwner = land.owner;

		
		if( landOwner && short(landOwner) != k ){  //leelang : 그냥 ~.owner is player ? 로 처리하게 한다면 ?
			let fee = calcFee(player.pos[0],player.pos[1]);

			for(let k in player.owns){
				if(player.cash > fee){
					break;
				}
				liquidate(ownsKeyToLand(k));
			}


			if(fee>player.cash){
				fee = player.cash;
				console.log("player["+shortToLong[k]+"] has lost the game");
				transfer(fee,player,players[short(landOwner)],`(broke) fee cost of land ${land.x}_${land.y}`);
			}else{
				transfer(fee,player,players[short(landOwner)],`fee cost of land ${land.x}_${land.y}`);
			}

		}
	}


	for(let i = 0; i < lands.length ; i++){
		let landRow = lands[i];
		for(let j = 0; j < landRow.length ; j++){
			let land = landRow[j];
			
			if(land&&!land.owner && land.greatestBidder){
				let player = players[short(land.greatestBidder)];
				
				transfer(land.greatestBid,player,null,`bought ${j}_${i}`);
				makeOwnRelation(player,land);

				land.greatestBidder = null;
				land.greatestBid = land.price;
			}
		}
	}


	for(let k in players){
		if(players[k].dice > 0){
			automove(k)
			autotrade(k)
			players[k].dice = genDice();
		}
	}
};



chain_interface.funcsList.push("viewMapList_input-2_panelId-0");
chain_interface.viewMapList = function(start,end,callback){
	var mapsList = [];

	var lastIndex = maps.length-1;
	var i0 = start > lastIndex ? lastIndex : start; 
	var i1 = end > lastIndex ? lastIndex : end;

	for(let i = i0 ; i <= i1 ; i++){
		mapsList.push(maps[i]);
	}

	callback(mapsList);
}

chain_interface.funcsList.push("viewBoardPlayerPoses_panelId-0");
chain_interface.viewBoardPlayerPoses = function(callback){

	var board = new Array(game.height);
	for(let i = 0 ; i < board.length ; i++){
		board[i] = new Array(game.width);
		board[i].fill(0);
	}

	for(let k in players){
		let player = players[k];
		board[player.pos[1]][player.pos[0]]++;
	}

	callback(board);
};


chain_interface.funcsList.push("viewGamesList_input-2_panelId-0");
chain_interface.viewGamesList = function(start,end,callback){
	var list = [];

	var lastIndex = gameArray.length-1;
	var i0 = start > lastIndex ? lastIndex : start; 
	var i1 = end > lastIndex ? lastIndex : end;

	for(let i = i0 ; i <= i1 ; i ++){
		game = games[short(gameArray[i])];
		var gameInfo = {};

		['mapid','width','height','addr'].forEach(elm=>{gameInfo[elm] = game[elm];})

		list.push(gameInfo);
	}

	callback(list);
};

chain_interface.funcsList.push("viewPlayerStates_panelId-0");
chain_interface.viewPlayerStates = function(callback){
	callback(players);
}

chain_interface.funcsList.push("viewLandStates_panelId-0");
chain_interface.viewLandStates = function(callback){
	var list = [];
	for(var i = 0 ; i < lands.length ; i++){
		for(var j = 0 ; j < lands[i].length ; j++){
			if(lands[i][j]){
				//console.log(`owner of (${j},${i}) : ${lands[i][j].owner}`);
				list.push(lands[i][j]);
			}
		}
	}
	callback(list); 
}

var viewLandsLiquidVal = function(){
	var sum = 0;
	for(var i = 0 ; i < lands.length ; i++){
		for(var j = 0 ; j < lands[i].length ; j++){
			if(lands[i][j]){
				//console.log(`owner of (${j},${i}) : ${lands[i][j].owner}`);
				let land = lands[i][j];
				sum+= land.buildings * 1000;
				sum+= land.price;
			}
		}
	}
	return sum; 
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


