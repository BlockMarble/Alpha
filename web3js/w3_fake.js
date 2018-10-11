String.prototype.replaceAt=function(start,end, replacement) {
    return this.substr(0, start) + replacement + this.substr(end);
}









var w3 = {};

if( typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
}else{
    web3 = new Web3(Web3.providers.HttpProvider());
}
var account0 = web3.eth.accounts[0];
var mapCache={};
var gameCache={};

w3.gameABI = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "owners", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "addrids", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "v_viewrow", "outputs": [ { "name": "", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bidder", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sum_moves_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" } ], "name": "join_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "cashes", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "actionids", "type": "uint8[]" }, { "name": "params", "type": "uint256[]" } ], "name": "action", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numDone", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "board", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "v_prices", "outputs": [ { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "poses", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "built", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bid", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "join", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "v_dices", "outputs": [ { "name": "dices_", "type": "uint8[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "prices", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "start", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "dices", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "camefroms", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "actionids", "type": "uint8[]" }, { "name": "params", "type": "uint256[]" }, { "name": "sender", "type": "address" } ], "name": "action_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewBoard", "outputs": [ { "name": "players_", "type": "address[]" }, { "name": "cashes_", "type": "uint256[]" }, { "name": "poses_", "type": "uint8[2][]" }, { "name": "owners_", "type": "address[]" }, { "name": "buidings_", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewGame", "outputs": [ { "name": "", "type": "uint8" }, { "name": "", "type": "uint8" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "id_", "type": "uint256" }, { "name": "bj_", "type": "address" }, { "name": "infos_", "type": "uint8[6]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "type_", "type": "uint256" }, { "indexed": true, "name": "addr", "type": "address" } ], "name": "GameEvent", "type": "event" } ];

w3.creatorABI = [ { "constant": false, "inputs": [ { "name": "width", "type": "uint8" }, { "name": "height", "type": "uint8" }, { "name": "playermin", "type": "uint8" }, { "name": "playermax", "type": "uint8" }, { "name": "dicemin", "type": "uint8" }, { "name": "dicemax", "type": "uint8" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "name": "createMap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "mapid", "type": "uint256" }, { "name": "wait", "type": "uint256" } ], "name": "createGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumGames", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "page", "type": "uint256" } ], "name": "fetchGames", "outputs": [ { "name": "list", "type": "address[10]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumMaps", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "creatBasicGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "fetchMap", "outputs": [ { "name": "info_", "type": "uint8[6]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "requester", "type": "address" }, { "indexed": true, "name": "_type", "type": "uint256" }, { "indexed": true, "name": "value", "type": "uint256" } ], "name": "CreatorEvent", "type": "event" } ];

w3.creatorAddress = "0xa514239a7358c75007fab91be233daf3104baf9a";
w3.gameAddress = null;
w3.playerAddress = null;


w3.creatorContractClass = web3.eth.contract(w3.creatorABI);
w3.creatorContract = null;
w3.gameContractClass = web3.eth.contract(w3.gameABI); 
w3.gameContract= null;



// event CreatorEvent(address indexed requester, uint indexed _type, uint indexed value);
// createGame : 1 
// createMap : 3 

var i_restartEventListener;

function i_setCreatorAddress(address){
	w3.creatorAddress = address;
	w3.creatorContract = w3.creatorContractClass.at(address);
	i_restartEventListener();
}

function i_setGameAddress(address){
	w3.gameAddress = address;
	w3.gameContract = w3.gameContractClass.at(address);
	i_restartEventListener();
}

function i_startGame(){
	if(w3.gameAddress){
		w3.gameContract.start();
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}


function i_sendAction(){
	if(w3.gameAddress){
		w3.gameContract.action();
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}

function i_viewDice(){
	if(w3.playerAddress){
		


		
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}

}

function i_viewBoard(){
	if(w3.gameAddress){
		
		w3.gameContract.viewBoard(function(err,res){

		});

		
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}

function i_viewGame(){
	if(w3.gameAddress){
		
		w3.gameContract.viewGame(function(err,res){

		});

		
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}   

function i_fetchMapInfo(id,callback){
	w3.creatorContract.fetchMap(id,function(err,res){
		if(err){

		}else{
			callback(res);
		}
	})
}



var currentListeningCreator;
var currentFilterCreator;
var currentListeningGame;
var currentFilterGame;
var currentListenersCreator = {};
var currentListenersGame = {};

i_restartEventListener = function(){

	// event CreatorEvent(address indexed requester, uint indexed _type, uint indexed value);

	if(w3.creatorAddress && w3.creatorAddress != currentListeningCreator){
		currentListeningCreator = w3.creatorAddress;
			
		if(currentFilterCreator){currentFilterCreator.stopWatching()}
		currentFilterCreator = web3.eth.filter({address:w3.creatorAddress});
		// watch for changes
		currentFilterCreator.watch(function(error, result){
			console.log(" creator watcher received event ");
			if (!error){
				for(var i = 0 ; i < result.topics.length ; i++){
			        console.log(result.topics[i]);
			    }
				for(var k in currentListenersCreator){
			    	currentListenersCreator[k](result);
			    }
			}else{
			    console.log("error !!");
			}
		});

	}else{
		console.log("w3.creatorAddress undefined or already listening to it");
		
	}

	// event GameEvent(uint indexed type_,address indexed addr);

	if(w3.gameAddress && w3.gameAddress != currentListeningGame){
		currentListeningGame = w3.gameAddress;

		if(currentFilterGame){currentFilterGame.stopWatching()}
		
		currentFilterGame = web3.eth.filter({
			address:w3.gameAddress,
			topics:[null,null,null]
		});
		// watch for changes
		currentFilterGame.watch(function(error, result){
			console.log(" game watcher event received");
			if (!error){
			    console.log(result);
			    for(var i = 0 ; i < result.topics.length ; i++){
			        console.log(result.topics[i]);
			    }
			    for(var k in currentListenersCreator){
			    	currentListenersGame[k](result);
			    }
			   
			}else{
			    console.log("error !!");
			}
		});	

	}else{
		console.log("w3.gameAddress undefined or already listening to it");
	}

}




function i_interpretMap(){

	var info = mapraw[0];
	var w = info[0];
	var h = info[1];
	var playermin = info[2];
	var playermax = info[3];
	var dicemin = info[4];
	var dicemax = info[5];

	wallIndex = 0;
	bignumber = walls[wallIndex];

	var count = 0;

	var board = {};

	for(var i = 0 ; i < h ; i ++){

		var ary = {};
		
		for(var j = 0 ; j < w ; j ++){
			if(count>255){
				count = 0;
				wallIndex++;
				bignumber = walls[wallIndex];
			}	
			count++;

			let val = 0; 

			if 



			ary.push(val);
		}

		board.push(ary);
	}

}

function i_listifyMap(start,end){

	var ary = {};
	for(var i = start;i<end;i++){
		ary.push(mapCache[i][0]);
	}

	return list;
}

var viewMapListCallId = 0;



i_setCreatorAddress(w3.creatorAddress);
i_restartEventListener()


function toEventId(s){
	return (new BigNumber(s)).toNumber();
}


// view access 




w3.useFakePlayerAddress = function(){

}
w3.useRealPlayerAddress = function(){

}



function createMap(size,walls /* 2d ary */,prices /* 2d ary */,playermin,playermax,dicemin,dicemax,callback){

	_walls = [];
	_prices = [];

	var number = new BigNumber(0)
	var index = 0;

	for(let i = 0 ; i < walls.length ; i ++){

		let wall = walls[i];
		for(let j = 0; j < wall.length ; j ++){
			if(index > 255){
				_walls.push(number);
				number = new BigNumber(0);
				index = 0;
			}

			number = number.multipliedBy(2);

			let val = 0;

			if(wall[j] != false || wall[j] != 0){
				val = 1;
				_prices.push(prices[i][j]);
			}

			number = number.plus(val);
		}	
	}

	_walls.push(number);

	//function createMap(uint8 width, uint8 height, uint8 playermin, uint8 playermax, uint8 dicemin, uint8 dicemax, uint[] walls_, uint32[] prices_) public{
	
	currentListenersCreator.creation = function(res){
		var eventType = (new BigNumber(res.topics[2])).toNumber();	
		if(eventType == 3){
			callback(res.topics[3]);
		}	
	};
	w3.creatorContract.createMap(size,size,playermin,playermax,dicemin,dicemax,_walls,_prices,function(){})
}

function viewMap(id,callback){

	if(!mapCache[id]){
		i_fetchMapInfo(id,function(res){
			mapCache[id] = res;
			callback(i_interpretMap(mapCache[id]));
		});
	}else{
		callback(i_interpretMap(mapCache[id]));
	}

	/*
		callback(obj);
		
		obj.walls 
		obj.prices - 2d 
		obj.playerMin
		obj.playerMax
		obj.diceMin
		obj.diceMax
	
	*/
}

function viewBoard(){
	if(w3.gameAddress){
		w3.gameContract
	}else{
		console.log(" ! : game address is not set ");
	}
}

w3.viewMapList = function(idstart ,idend ,callback){

	let id = viewMapListCallId++;
	let deficit_finallized = false;
	let deficit = 0;

	for(let i = idstart; i<idend ; i++){

		if (!mapCache[i]){
			
			deficit++;		

			if(i+1 >= idend){
				deficit_finallized = true;
			}
			
			i_fetchMapInfo(id,function(res){
				mapCache[id] = res;
				if( viewMapListCallId == id){
					deficit--;
					if(deficit_finallized && deficit == 0){
						callback(i_listifyMap(idstart,idend))
					}
				}
			});
		}
	}

}


function saveMap(mapid,size,walls /* 2d ary */,prices /* 2d ary */,playermin,playermax,dicemin,dicemax,callback){
	
}


w3.createMap = createMap;

w3.viewMap = viewMap;
w3.viewMapList = viewMapList;

w3.createGame = function(mapid,callback){
	w3.creatorContract.createGame(parseInt(mapid),5,function(){})
	currentListenersCreator.gameCreated = function(result){
		switch(toEventId(result.topics[2])){
			case(1):
				callback(result.topics[3].replaceAt(3,3+24,""));
				break;
		}
	}
}

w3.joinGame = function(address,callback){

	i_setGameAddress(address);
	w3.gameContract.join(function(){})
	currentListenersGame.joined = function(result){
		switch(toEventId(result.topics[1])){
			case(2):
				callback("success")
				break;
			case(3):
				callback("failed")
				break;
		}
	}

}

w3.viewGameStatic = function(callback){

	w3.gameContract.viewGame(function(err,res){
		if(!err){


			var obj = {};
			

			callback(obj);
		}
	});
}

w3.viewBoard = function(callback){
	
	w3.gameContract.viewBoard(function(err,res){

		if(!err){
			var players_ = res[0];//players;
		    
		    var cashes_ = res[1];//new uint[](players.length);
		    var poses_ = res[2]; // new uint8[2][](players.length); //
		     
		    var owners_ = res[3]; //owners; //
		    var buidings_ = res[4]; // built;	

			var obj = {};
			obj.players = [];
			obj.lands = [];

			for(let i = 0; i < players_.length ; i++){
				let player = {};
				player.address = players_[i];
				player.cash = cashes_[i];
				player.x = poses_[i][1];
				player.y = poses_[i][0];
				player.owns = [];
				obj.players.push(player);
			}
			
			for(let i = 0; i < owners_.length ; i++){
				let land = {};
				land.buidings = buidings_[i];
				land.owner = owners_[i];
				lands.push(land);
			}

			callback(obj);
		
		}
	});
}

w3.roll = function(callback){
	w3.gameContract.viewDice(function(){});
}
