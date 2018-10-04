var gameABI = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "owners", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "addrids", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "v_viewrow", "outputs": [ { "name": "", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bidder", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sum_moves_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" } ], "name": "join_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "cashes", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "actionids", "type": "uint8[]" }, { "name": "params", "type": "uint256[]" } ], "name": "action", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numDone", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "board", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "v_prices", "outputs": [ { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "poses", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "built", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bid", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "join", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "v_dices", "outputs": [ { "name": "dices_", "type": "uint8[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "prices", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "start", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "dices", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "camefroms", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "actionids", "type": "uint8[]" }, { "name": "params", "type": "uint256[]" }, { "name": "sender", "type": "address" } ], "name": "action_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewBoard", "outputs": [ { "name": "players_", "type": "address[]" }, { "name": "cashes_", "type": "uint256[]" }, { "name": "poses_", "type": "uint8[2][]" }, { "name": "owners_", "type": "address[]" }, { "name": "buidings_", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewGame", "outputs": [ { "name": "", "type": "uint8" }, { "name": "", "type": "uint8" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "id_", "type": "uint256" }, { "name": "bj_", "type": "address" }, { "name": "infos_", "type": "uint8[6]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "type_", "type": "uint256" }, { "indexed": true, "name": "addr", "type": "address" } ], "name": "GameEvent", "type": "event" } ]


var creatorABI = [ { "constant": false, "inputs": [ { "name": "width", "type": "uint8" }, { "name": "height", "type": "uint8" }, { "name": "playermin", "type": "uint8" }, { "name": "playermax", "type": "uint8" }, { "name": "dicemin", "type": "uint8" }, { "name": "dicemax", "type": "uint8" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "name": "createMap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "mapid", "type": "uint256" }, { "name": "wait", "type": "uint256" } ], "name": "createGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumGames", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "page", "type": "uint256" } ], "name": "fetchGames", "outputs": [ { "name": "list", "type": "address[10]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumMaps", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "creatBasicGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "fetchMap", "outputs": [ { "name": "info_", "type": "uint8[6]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "requester", "type": "address" }, { "indexed": true, "name": "_type", "type": "uint256" }, { "indexed": true, "name": "value", "type": "uint256" } ], "name": "CreatorEvent", "type": "event" } ]


var creatorAddress = "0x0CcfE03F2a84e4385ba964abF4350290A917b724";
var gameAddress = null;
var playerAddress = null;


var creatorContractClass = web3.eth.contract(creatorABI);
var creatorContract = null;
var gameContractClass = web3.eth.contract(gameABI); 
var gameContract= null;

function setCreatorAddress(address){
	creatorAddress = address;
	creatorContract = creatorContractClass.at(address);
}

function setPlayerAddress(address){
	if(gameAddress){
		playerAddress = address;
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}

function setGameAddress(address){
	gameAddress = address;
	gameContract = gameContractClass.at(address);
}

function startGame(){
	if(gameAddress){
		gameContract.start();
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}


function sendAction(){
	if(gameAddress){
		gameContract.action();
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}

function viewDice(){
	if(playerAddress){
		


		
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}

}

function viewBoard(){
	if(gameAddress){
		
		gameContract.viewBoard(function(err,res){

		});

		
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}

function viewGame(){
	if(gameAddress){
		
		gameContract.viewGame(function(err,res){

		});

		
	}else{
		console.log("!: The address of game is not set please call setGameAddress() first.")
	}
}   



var currentListeningCreator;
var currentListeningGame;

function startEventListener(){

	// event CreatorEvent(address indexed requester, uint indexed _type, uint indexed value);

	if(creatorAddress && creatorAddress != currentListeningCreator){
		var filter = web3.eth.filter({address:creatorAddress});
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
		}

		currentListeningCreator = creatorAddress;
	}else{
		console.log("creatorAddress undefined or already listening to it");
		
	}

	// event GameEvent(uint indexed type_,address indexed addr);

	if(gameAddress && gameAddress != currentListeningGame){
		var filter = web3.eth.filter({
			address:gameAddress,
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
		}	
		currentListeningGame = gameAddress;
	}else{
		console.log("gameAddress undefined or already listening to it");
	}

}


