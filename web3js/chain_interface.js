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



// requires contract.js

chain_interface = {};
chain_interface.defaultArgs = {};
chain_interface.extern = {};
chain_interface.decor = {};
chain_interface.funcsList = [];
chain_interface.argNames = {};



let maps = [];
let games = [];

let game = {};
let board = [];
let players = {};
let lands = [];

let funcName;

let player_cache = {};
player_cache.actionParams = [];

function uintToAddr(uint){
	return uint.substr(0,2) + uint.substr(26);
}

function posToLandId(){
	if(arguments[0]){
		if(arguments[1]){
			return lands[arguments[1]][arguments[0]];
		}else if(arguments[0][0]){
			return lands[arguments[0][1]][arguments[0][0]];
		}
	}
};

funcName = "createGame";
chain_interface.argNames[funcName] = "width,height,playerMin,playerMax,diceMin,diceMax,walls,prices";
chain_interface.funcsList.push(funcName+"_panelId-0_fakeArgs_to-createGame");
chain_interface.decor[funcName] = "require-userAddress,";
chain_interface[funcName] = function(width,height,playerMin,playerMax,diceMin,diceMax,walls,prices,callback){
	
	var infos = [width,height,playerMin,playerMax,diceMin,diceMax];

	var walls_bin = [];
	var prices_nonNull = [];

	let bitIndex = -1;
	let bignum = new BigNumber(0);
	for(let i = 0 ; i < walls.length ; i ++){for(let j = 0 ; j < walls[i].length ; j ++){
		bitIndex++;
		if(bitIndex > 255){
			bitIndex = 0;
			walls_bin.push(bignum);
			bignum = new BigNumber(0);
		}
		
		let val = walls[i][j];

		bignum = bignum.multipliedBy(2);
		bignum = bignum.plus(val);

		if(val != 0){
			prices_nonNull.push(prices[i][j]);
		}
	}}
	while(bitIndex < 255){
		bignum = bignum.multipliedBy(2);
		bitIndex++;
	}

	walls_bin.push(bignum);


	args[0] = infos;
	args[1] = walls_bin;
	args[2] = prices_nonNull;

	contract.creator.createMap(infos,walls_bin,prices_nonNull,(eventType,res)=>{
		if(eventType%2 == 1){
			var mapid = (new BigNumber(res.topics[3])).toNumber();
			callback(mapid);		
		}else{
			callback("failed");
		}
	});
}

funcName = "loadMap";
chain_interface.argNames[funcName] = "mapid";
chain_interface.defaultArgs[funcName] = [0];
chain_interface.funcsList.push(funcName+"_input-1_panelId-0");
chain_interface[funcName] = function(id,callback){
	callback("failed : not implemented");	
};

funcName = "createGame";
chain_interface.argNames[funcName] = "mapid";
chain_interface.defaultArgs[funcName] = [0];
chain_interface.funcsList.push(funcName+"_input-1_panelId-0_to-joinGame");
chain_interface[funcName] = function(id,callback){
	contract.createGame(mapid,(eventType,res)=>{
		if(eventType%2 == 1){
			callback(uintToAddr(res.topics[3]);
		}else{
			callback("failed");
		}
	});
};

chain_interface.funcsList.push("joinGame_input-1_panelId-0");
chain_interface.joinGame = function(addr,callback){
	contract.joinGame(addr,(eventType,res)=>{
		if(eventType%2 == 1){
			callback("success");
		}else{
			callback("failed");
		}
	});
};

chain_interface.funcsList.push("startGame_panelId-0");
chain_interface.startGame = function(callback){
	contract.startGame((eventType,res)=>{
		callback("failed #8");
	});
};


chain_interface.funcsList.push("endTurn_panelId-1");
chain_interface.endTurn = function(callback){
	contract.action(player_cache.actionParams,(eventType,res)=>{
		if(eventType%2 == 1){
			callback("success");
		}else{
			callback("failed");
		}
	});
	player_cache.actionParams = [];
};

chain_interface.funcsList.push("sum_panelId-1");
chain_interface.sum = function(callback){
	contract.sum((res)=>)
};



chain_interface.defaultArgs["useFakePlayerAddress"] = ["xxxx"];
chain_interface.funcsList.push("useFakePlayerAddress_input-1_panelId-0");
chain_interface.useFakePlayerAddress = function(addr,callback){
	var msg;
	if(shortToLong[short(addr)]){
		msg = shortToLong[short(addr)];
		contract.fakeAddr = msg;
	}else{
		var fakeAddr = genRandAddr();
		contract.fakeAddr = fakeAddr;
		msg = "newly generated : "+ fakeAddr;
	}
	callback(msg);
};
chain_interface.funcsList.push("useRealPlayerAddress_panelId-0");
chain_interface.useRealPlayerAddress = function(callback){
	contract.fakeAddr = null;
};



chain_interface.funcsList.push("rollDice_panelId-1");
chain_interface.rollDice = function(callback){
	if(contract.fakeAddr){
		contract.game.roll_i(callback);
	}else{
		contract.game.roll(callback);
	}
};

chain_interface.funcsList.push("viewBoard_panelId-1");
chain_interface.viewBoard = function(callback){
	contract.game.viewBoard(callback);
};

let dirs = {
	left:{vels:[-1,0],counter:"right"},
	right:{vels:[1,0],counter:"left"},
	up:{vels:[0,-1],counter:"down"},
	down:{vels:[0,1],counter:"up"}
};
for(let k in dirs){
	chain_interface.funcsList.push(k+"_input-1_panelId-1");

	chain_interface[k] = function(num,callback){

		/**
			if player cache dice 0 

				return 	
		

			if move valid  
				
				update playercache.pos		
			
				push left id and num to player cache action params	
	
		*/
	}
}




chain_interface.funcsList.push("bid_input-1_panelId-1");
chain_interface.bid = function(money,callback){
	/**
	
		if money < player cache cash 
			
			push bid id and money to playercache action params 

		else return 

	*/
};
chain_interface.funcsList.push("sell_input-2_panelId-1");
chain_interface.sell = function(landposX,landposY,callback){};
chain_interface.funcsList.push("build_input-3_panelId-1");
chain_interface.build = function(landposX,landposY,num,callback){};


chain_interface.funcsList.push("viewMapList_input-2_panelId-0");
chain_interface.viewMapList = function(start,end,callback){};
chain_interface.funcsList.push("viewGamesList_input-2_panelId-0");
chain_interface.viewGamesList = function(start,end,callback){};



chain_interface.funcsList.push("viewPlayerStates_panelId-0");
chain_interface.viewPlayerStates = function(callback){};
chain_interface.funcsList.push("viewLandStates_panelId-0");
chain_interface.viewLandStates = function(callback){};




