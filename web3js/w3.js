var w3 = {};



w3.gameABI = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "owners", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "addrids", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "v_viewrow", "outputs": [ { "name": "", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bidder", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sum_moves_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" } ], "name": "join_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "cashes", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "actionids", "type": "uint8[]" }, { "name": "params", "type": "uint256[]" } ], "name": "action", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numDone", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "board", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "v_prices", "outputs": [ { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "poses", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "built", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bid", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "join", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "v_dices", "outputs": [ { "name": "dices_", "type": "uint8[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "prices", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "start", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "dices", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "camefroms", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "actionids", "type": "uint8[]" }, { "name": "params", "type": "uint256[]" }, { "name": "sender", "type": "address" } ], "name": "action_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewBoard", "outputs": [ { "name": "players_", "type": "address[]" }, { "name": "cashes_", "type": "uint256[]" }, { "name": "poses_", "type": "uint8[2][]" }, { "name": "owners_", "type": "address[]" }, { "name": "buidings_", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewGame", "outputs": [ { "name": "", "type": "uint8" }, { "name": "", "type": "uint8" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "id_", "type": "uint256" }, { "name": "bj_", "type": "address" }, { "name": "infos_", "type": "uint8[6]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "type_", "type": "uint256" }, { "indexed": true, "name": "addr", "type": "address" } ], "name": "GameEvent", "type": "event" } ]

w3.creatorABI = [ { "constant": false, "inputs": [ { "name": "width", "type": "uint8" }, { "name": "height", "type": "uint8" }, { "name": "playermin", "type": "uint8" }, { "name": "playermax", "type": "uint8" }, { "name": "dicemin", "type": "uint8" }, { "name": "dicemax", "type": "uint8" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "name": "createMap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "mapid", "type": "uint256" }, { "name": "wait", "type": "uint256" } ], "name": "createGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumGames", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "page", "type": "uint256" } ], "name": "fetchGames", "outputs": [ { "name": "list", "type": "address[10]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumMaps", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "creatBasicGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "fetchMap", "outputs": [ { "name": "info_", "type": "uint8[6]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "requester", "type": "address" }, { "indexed": true, "name": "_type", "type": "uint256" }, { "indexed": true, "name": "value", "type": "uint256" } ], "name": "CreatorEvent", "type": "event" } ]

w3.creatorAddress = "0x0CcfE03F2a84e4385ba964abF4350290A917b724";
w3.gameAddress = null;
w3.playerAddress = null;


w3.creatorContractClass = web3.eth.contract(w3.creatorABI);
w3.creatorContract = null;
w3.gameContractClass = web3.eth.contract(w3.gameABI); 
w3.gameContract= null;

function i_setCreatorAddress(address){
	w3.creatorAddress = address;
	w3.creatorContract = w3.creatorContractClass.at(address);
}

function i_setPlayerAddress(address){
	if(w3.gameAddress){
		w3.playerAddress = address;
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}

function i_setGameAddress(address){
	w3.gameAddress = address;
	w3.gameContract = w3.gameContractClass.at(address);
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

function i_restartEventListener(){

	// event CreatorEvent(address indexed requester, uint indexed _type, uint indexed value);

	if(w3.creatorAddress && w3.creatorAddress != currentListeningCreator){
			
		if(currentListeningCreator){currentListeningCreator.stopWatching()}
		var filter = web3.eth.filter({address:w3.creatorAddress});
		// watch for changes
		filter.watch(function(error, result){
			console.log(" address watcher ");
			if (!error){
			    console.log(result);
			    for(var i = 0 ; i < result.topics.length ; i++){
			        console.log(result.topics[i]);
			    }
			}else{
			    console.log("error !!");
			}
		});

		currentFilterCreator = filter;
		currentListeningCreator = w3.creatorAddress;
	}else{
		console.log("w3.creatorAddress undefined or already listening to it");
		
	}

	// event GameEvent(uint indexed type_,address indexed addr);

	if(w3.gameAddress && w3.gameAddress != currentListeningGame){

		if(currentListeningGame){currentListeningGame.stopWatching()}
		
		var filter = web3.eth.filter({
			address:w3.gameAddress,
			topics:[null,null,null]
		});
		// watch for changes
		filter.watch(function(error, result){
			console.log(" address watcher ");
			if (!error){
			    console.log(result);
			    for(var i = 0 ; i < result.topics.length ; i++){
			        console.log(result.topics[i]);
			    }
			}else{
			    console.log("error !!");
			}
		});	

		currentFilterGame = filter;
		currentListeningGame = w3.gameAddress;
	}else{
		console.log("w3.gameAddress undefined or already listening to it");
	}

}


 if( typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
}else{
    web3 = new Web3(Web3.providers.HttpProvider());
}
var account0 = web3.eth.accounts[0]
i_setPlayerAddress(account0);

var mapCache={};

function i_interpretMap(){

}

function i_listifyMap(start,end){

	todo

	return list;
}

var viewMapListCallId = 0;

// view access 


function createMap(size,walls /* 2d ary */,prices /* 2d ary */,playermin,playermax,dicemin,dicemax,callback){

	walls = [];
	prices = [];

	var number = new BigNumber(0)
	var index = 0;

	for(let i = 0 ; i < walls.length ; i ++){

		let wall = walls[i];
		for(let j = 0; j < wall.length ; j ++){
			if(index > ){
				walls.push(number);
				number = new BigNumber(0);
				index = 0;
			}

			number = number.multipliedBy(2);

			let val = 0;

			if(wall[j]){
				val = 1;
				
			}

			number = number.plus(val);
		}	
	}


	creatorContract.createMap()
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

function viewMapList(idstart ,idend ,callback){

	let id = viewMapListCallId++;
	let deficit_finallized = false;
	let default = 0;

	for(let i = idstart; i<idend ; i++){

		if (!mapCache[i]){
			
			deficit++;		

			if(i == idend-1){
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

function createGame(mapid,callback){
	creatorContract.createGame(mapid,5,function(err,res){
		if(err){

		}else{
			callback(res);
		}
	});
}

w3.createMap = createMap;
w3.createGame = createGame;
w3.viewMap = viewMap;
w3.viewMapList = viewMapList;

