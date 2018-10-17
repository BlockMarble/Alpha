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
let lands = []

let funcName;

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
			bitIndex = -1;
			walls_bin.push(bignum);
			bignum = new BigNumber(0);
		}
		
		let val = walls[i][j];

		bignum = bignum.multipliedBy(2);
		bignum = bignum.plus(val);
		console.log(bignum.toNumber());
		console.log(bignum.toString(2));

		if(val != 0){
			prices_nonNull.push(prices[i][j]);
		}
	}}
	walls_bin.push(bignum);

	contract.creator.createMap(infos,walls_bin,prices_nonNull,(res)=>{
		if(res){
			callback(res);			
		}
	});
}

funcName = "loadMap";
chain_interface.argNames[funcName] = "mapid";
chain_interface.defaultArgs[funcName] = [0];
chain_interface.funcsList.push(funcName+"_input-1_panelId-0");
chain_interface[funcName] = function(id,callback){



	contract.creaotr.loadMap();
};




funcName = "createGame";
chain_interface.argNames[funcName] = "mapid";
chain_interface.defaultArgs[funcName] = [0];
chain_interface.funcsList.push(funcName+"_input-1_panelId-0");
chain_interface[funcName] = function(id,callback){
	contract.createGame(mapid,()=>{

		callback(res);

	});
};

chain_interface.funcsList.push("createGame_input-1_panelId-0_to-joinGame");
chain_interface.createGame = function(mapid,callback){};
chain_interface.funcsList.push("joinGame_input-1_panelId-0");
chain_interface.joinGame = function(addr,callback){};
chain_interface.funcsList.push("startGame_panelId-0");
chain_interface.startGame = function(callback){};
chain_interface.defaultArgs["useFakePlayerAddress"] = ["xxxx"];
chain_interface.funcsList.push("useFakePlayerAddress_input-1_panelId-0");
chain_interface.useFakePlayerAddress = function(addr,callback){};
chain_interface.funcsList.push("useRealPlayerAddress_panelId-0");
chain_interface.useRealPlayerAddress = function(callback){};
chain_interface.funcsList.push("rollDice_panelId-1");
chain_interface.rollDice = function(callback){};
chain_interface.funcsList.push("viewBoard_panelId-1");
chain_interface.viewBoard = function(callback){};


let dirs = {
	left:{vels:[-1,0],counter:"right"},
	right:{vels:[1,0],counter:"left"},
	up:{vels:[0,-1],counter:"down"},
	down:{vels:[0,1],counter:"up"}
};
for(let k in dirs){
	chain_interface.funcsList.push("left_input-1_panelId-1");

}


chain_interface.funcsList.push("bid_input-1_panelId-1");
chain_interface.bid = function(money,callback){};
chain_interface.funcsList.push("sell_input-2_panelId-1");
chain_interface.sell = function(landposX,landposY,callback){};
chain_interface.funcsList.push("build_input-3_panelId-1");
chain_interface.build = function(landposX,landposY,num,callback){};
chain_interface.funcsList.push("endTurn_panelId-1");
chain_interface.endTurn = function(callback){};
chain_interface.funcsList.push("sum_panelId-1");
chain_interface.sum = function(callback){};
chain_interface.funcsList.push("viewMapList_input-2_panelId-0");
chain_interface.viewMapList = function(start,end,callback){};
chain_interface.funcsList.push("viewBoardPlayerPoses_panelId-0");
chain_interface.viewBoardPlayerPoses = function(callback){};
chain_interface.funcsList.push("viewGamesList_input-2_panelId-0");
chain_interface.viewGamesList = function(start,end,callback){};
chain_interface.funcsList.push("viewPlayerStates_panelId-0");
chain_interface.viewPlayerStates = function(callback){};
chain_interface.funcsList.push("viewLandStates_panelId-0");
chain_interface.viewLandStates = function(callback){};