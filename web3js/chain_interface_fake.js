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
function short(addr){if(addr.length == 8) return addr; return addr.substr(2,8);}
function genRandAddr(){	var addr = randAddrs[randAddrUsed];	randAddrUsed++;	return addr;}

var realAddr = genRandAddr();
var currentAddr = realAddr;


var game = null;
var players = {};
var lands = [];

function genDices(){
	for(k in players){
		players[k].dice = Math.floor(game.diceMin+Math.random()*(game.diceMax-game.diceMin+0.9999));		
	}
}

function joinAndInitPlayer(addr,game){
	var players_ = players;
	if(game){
		players_ = game.players;
	}

	var player = {};
	player.prevDir = "none";
	player.pos = [0,0];
	player.cash = 100000;
	players_[short(addr)] = player;
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
			let posX1 = pos[0]+move[0]; 	
			let posY1 = pos[1]+move[1];

			if( 
				i != counderMoveId[prevMoveId] 
				&& posX1>=0 && posX1< game.width && posY1>=0 && posY1<game.height 
				&& game.walls[posY1][posX1] != 0
				){

				console.log(" got : !! : ");
				console.log(pos);

				prevMoveId = i; 
				pos = [posX1,posY1];
				break;
			}
		}

	}
	
	player.pos = pos;
	player.prevDir = moveIndexToDir[prevMoveId];
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

	games[shortAddr].width = map.width;
	games[shortAddr].height = map.height;
	games[shortAddr].playerMin = map.playerMin;
	games[shortAddr].playerMax = map.playerMax;
	games[shortAddr].diceMin = map.diceMin;
	games[shortAddr].diceMax = map.diceMax;
	games[shortAddr].walls = map.walls;
	games[shortAddr].prices = map.prices;

	var game = games[shortAddr];

	game.players = [];
	game.cashes = {};
	game.poses = {};
	game.dices = {};

	game.owners = {};
	game.buildings = {};


	lands = [];
	for(let i = 0 ; i < map.walls.length ; i++){
		let row = map.walls[i];
		landsRow = new Array(row.length);
		for(let j = 0 ; j < row.length ; j ++){
			if(row[j] != 0){
				let land = {};
				land.greatestBid = 0;				
				land.greatestBidder = null;
				land.buildings = 0;
				landsRow[j] = land;
			}
		}
		lands[i] = landsRow;	
	}

	game.lands = lands;
	game.players = {};

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
		genDices();
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
	var land = lands[player.pos[1]][player.pos[0]];
	if(player.cash >= money){
		if(land.greatestBid<money){
			land.greatestBidder = currentAddr;
			land.greatestBid = money;
		}
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
	var land = lands[landposY][landposX];
	var player = players[short(currentAddr)]; 	
	if(land.owner == short(currentAddr) && player.cash >= 1000*num){
		player.cash -= 1000*num;
		land.buildings += num; 
	}else{
		console.log("invalid")	
	}	
};

chain_interface.endTurn = function(callback){
	if(game.dices[short(currentAddr)] == 0){
		callback("success")
	}else{
		console.log("invalid")	
	}	
};


chain_interface.sum = function(callback){
	var players = game.players;

	console.log(lands);

	for(let i = 0; i < lands.length ; i++){
		let landRow = lands[i];
		for(let j = 0; j < landRow.length ; j++){
			let land = landRow[j];
			if(land&&!land.owner && land.greatestBid > 0){
				land.owner = land.greatestBidder;
				land.greatestBidder = null;
				land.greatestBid = null;
			}
		}
	}


	for(k in players){
		if(players[k].dice > 0){
			automove(k)
		}
		console.log(players[k].dice);
	}
};



["createMap","createGame","joinGame","endTurn","sum"].forEach(elm=>{
	var tmp = chain_interface[elm];
	chain_interface[elm] = function(){
		if(confirm("transaction : "+elm)){
			tmp.apply(null,arguments);
		}
	};
});

["build","sell","bid"].forEach(elm=>{
	var tmp = chain_interface[elm];
	chain_interface[elm] = function(){
		if(players[short(currentAddr)].dice != 0){
			arguments[arguments.length-1]("you should consume all your moves to make this command!");
		}else{
			tmp.apply(null,arguments);
		}
	};
});