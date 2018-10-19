
function NULL_CALLBACK(){};

if( typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);

}else{
    web3 = new Web3(Web3.providers.HttpProvider());
}
var account0 = web3.eth.accounts[0]


var contract = {};

contract.addrs = {};

contract.addrs.creator = '0xe7c7eaed28486d4511c04a2647e91a9901be8c97';
contract.addrs.game = null;


contract.abis = {};
contract.abis.creator = [ { "constant": false, "inputs": [ { "name": "info", "type": "uint8[]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "name": "createMap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "width", "type": "uint8" }, { "name": "height", "type": "uint8" }, { "name": "playermin", "type": "uint8" }, { "name": "playermax", "type": "uint8" }, { "name": "dicemin", "type": "uint8" }, { "name": "dicemax", "type": "uint8" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "name": "saveMap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "mapid", "type": "uint256" }, { "name": "wait", "type": "uint256" } ], "name": "createGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumGames", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "page", "type": "uint256" } ], "name": "fetchGames", "outputs": [ { "name": "list", "type": "address[10]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewNumMaps", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "creatBasicGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "fetchMap", "outputs": [ { "name": "info_", "type": "uint8[]" }, { "name": "walls_", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "requester", "type": "address" }, { "indexed": true, "name": "_type", "type": "uint256" }, { "indexed": true, "name": "value", "type": "uint256" } ], "name": "CreatorEvent", "type": "event" } ];
contract.abis.game = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "owners", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "addrids", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "v_viewrow", "outputs": [ { "name": "", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bidder", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sum_moves_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" } ], "name": "join_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "cashes", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "dicemax", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numDone", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "M", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "params", "type": "uint256[]" } ], "name": "action", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "consolog", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "board", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "v_prices", "outputs": [ { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "poses", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "built", "outputs": [ { "name": "", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewDice", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "highest_bid", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "playermin", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "playermax", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "join", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "v_dices", "outputs": [ { "name": "dices_", "type": "uint8[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "prices", "outputs": [ { "name": "", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "start", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "dices", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "N", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "camefroms", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "boardRaw", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "params", "type": "uint256[]" }, { "name": "sender", "type": "address" } ], "name": "action_i", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "viewBoard", "outputs": [ { "name": "players_", "type": "address[]" }, { "name": "cashes_", "type": "uint256[]" }, { "name": "poses_", "type": "uint8[2][]" }, { "name": "owners_", "type": "address[]" }, { "name": "buidings_", "type": "uint16[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "dicemin", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewGame", "outputs": [ { "name": "", "type": "uint8" }, { "name": "", "type": "uint8" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "mapid_", "type": "uint256" }, { "name": "sender", "type": "address" }, { "name": "infos_", "type": "uint8[]" }, { "name": "wallsRaw", "type": "uint256[]" }, { "name": "prices_", "type": "uint32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "addr", "type": "address" }, { "indexed": true, "name": "eventType", "type": "uint256" } ], "name": "GameEvent", "type": "event" } ];
contract.class= {};
contract.class.creator = web3.eth.contract(contract.abis.creator);
contract.class.game = web3.eth.contract(contract.abis.game);

contract.game = {};
contract.creator = contract.class.creator.at(contract.addrs.creator);




contract.filters = {};



contract.currentEventListeners = {};
contract.currentListeningAddr = {};
contract.currentWatchers = {};
contract.currentWatchers.public = {};
contract.currentWatchers.private = {};
contract.currentPublicWatcher = {};
contract.logIdsReceived = {};
contract.logIdsReceived.creator = {};
contract.logIdsReceived.game = {};

contract.jigglegi = {};
contract.jigglegi.bignum2pow40 = (new BigNumber(2)).pow(40);

contract.restartFilter = function(){
	function filterCallback2(err,res){console.log("ooo")};
	function filterCallback(err,res){
		
		var topicThird = new BigNumber(res.topics[2]);

		console.log("topicThird : "+res.topics[2]);

		var eventType = topicThird.modulo(contract.jigglegi.bignum2pow40).toNumber();
		var logId = topicThird.dividedToIntegerBy(contract.jigglegi.bignum2pow40).toNumber();
		


		var logOrigin = "game";
		if(0<= eventType && eventType <= 6){logOrigin = "creator";}


		if(contract.logIdsReceived[logOrigin][logId]){
			console.log("duplicate log from "+logOrigin+" contract received !!");
			return
		}

		contract.logIdsReceived[logOrigin][logId] = true;

		console.log(eventType,res);


		if(!err){
			console.log(`got eventType:${eventType}`);
/*`createMap12`saveMap34`createGame56`turnStart7`startGame78`joinGame910`action1314*/
	
			var eventTypeList = [
				"none"
				,"createMap"
				,"createMap"
				,"saveMap"
				,"saveMap"
				,"createGame"
				,"createGame"
				,"diceGen"
				,"startGame"
				,"joinGame"
				,"joinGame"
				,"action"
				,"action"
			];

			var listener = contract.currentEventListeners[eventTypeList[eventType]];
			if(listener){
				listener(eventType,res);
			}			
		}else{
			console.log(" !: what the... there's an error in filter callback ?");
		}
	}

	var options = {};

	options.public = function(elm){
		return {
	        "address" :  contract.addrs[elm],
	        "topics" : [
	        	null,
	        	null,
	        	null,
	        	null
	        ]
		};
	};
	options.private = function(elm){
		return {
	        "address" :  contract.addrs[elm],
	        "topics" : [
	        	null,
	        	null,
	        	null,
	        	null
	        ]
		};
	};

	// contract.currentWatchers.public.creator = web3.eth.filter(options.public("creator"));
	// contract.currentWatchers.public.creator.watch(options.public);
	// console.log("hellor");	

	["creator","game"].forEach((elm)=>{
		["public","private"].forEach((pubpriv)=>{

			if(contract.currentWatchers[pubpriv][elm] && contract.currentListeningAddr[elm] != contract.addrs[elm]){
				contract.currentWatchers[pubpriv][elm].stopWatching();
				contract.currentWatchers[pubpriv][elm] = null;
			}

			if(!contract.currentWatchers[pubpriv][elm] && contract.addrs[elm]){
				contract.currentWatchers[pubpriv][elm] = web3.eth.filter(options[pubpriv](elm));
				contract.currentWatchers[pubpriv][elm].watch(filterCallback);
				console.log("setting filter " +elm+"("+pubpriv+")");
			}
			contract.currentListeningAddr[elm] = contract.addrs[elm];

		});
	});
};
/*
	creator write funcs 
		
		createMap saveMap createGame
		
		all private (success fail) : 1 2 / 3 4 / 5 6	

	game write funcs
	
		start join action sum  	

		start_i join_i action_i sum_i  	

		(success fail) : pub 1 2 / priv 1 2  / priv 3 4	/ pub 3 4
*/

contract.createMap = function(infos,walls,prices,callback){
	contract.currentEventListeners.createMap = callback;
	contract.creator.createMap(infos,walls,prices,NULL_CALLBACK);
}

contract.saveMap = function(mapid,infos,walls,prices,callback){
	contract.currentEventListeners.saveMap = callback;
	contract.creator.saveMap(mapid,infos,walls,prices,NULL_CALLBACK);
}

contract.createGame = function(mapid,wait,callback){
	contract.currentEventListeners.createGame = callback;
	contract.creator.createGame(mapid,wait,NULL_CALLBACK);
}

contract.startGame = function(callback){
	contract.currentEventListeners.startGame = callback;
	contract.game.startGame(NULL_CALLBACK);
}

contract.setDiceGenCallback = function(callback){
	contract.currentEventListeners.diceGen = callback;
}

contract.sum = function(callback){
	contract.game.sum(NULL_CALLBACK);
}

contract.joinGame = function(addr,callback){
	contract.game = contract.abis.game.at(addr);
	restartFilter();
	contract.currentEventListeners.joinGame = callback;
	if(contract.fakeAddr){
		contract.game.join_i(contract.fakeAddr,NULL_CALLBACK);
	}else{
		contract.game.join(NULL_CALLBACK)
	}
}

contract.action = function(params,callback){
	contract.currentEventListeners.action = callback;
	if(contract.fakeAddr){
		contract.game.action_i(contract.fakeAddr,params,NULL_CALLBACK);
	}else{
		contract.game.action(params,NULL_CALLBACK);
	}
}	

