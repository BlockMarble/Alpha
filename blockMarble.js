/**
 * 
 */
src="https://github.com/ethereum/web3.js/blob/develop/dist/web3.min.js";
	var contractABI = [ { "constant": false, "inputs": [ { "name": "mapid", "type": "uint256" }, { "name": "wait", "type": "uint256" } ], "name": "createGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "width", "type": "uint256" }, { "name": "height", "type": "uint256" }, { "name": "playermin", "type": "uint256" }, { "name": "playermax", "type": "uint256" }, { "name": "dicemin", "type": "uint256" }, { "name": "dicemax", "type": "uint256" }, { "name": "walls", "type": "uint256[]" }, { "name": "prices", "type": "uint256[]" } ], "name": "createMap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "uint256" }, { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "addr", "type": "address" } ], "name": "creation", "type": "event" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "aaa", "outputs": [ { "name": "a", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "page", "type": "uint256" } ], "name": "fetchGames", "outputs": [ { "name": "list", "type": "address[10]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "fetchMap", "outputs": [ { "name": "info", "type": "uint256[6]" }, { "name": "walls", "type": "uint256[]" }, { "name": "prices", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
	var address = "0xa0bb1671d29fee1baeeb2383fd592d1b7ca37cf4";
	var contract = '';
	
	// ---fetchMap Attribute---
	var width = 0;	//가로 블록 수
	var height = 0;	//세로 블록 수
	var diceMin = 0;
	var diceMax = 0;
	var blockArr = new Array;
	//------------------------
	
	//---fetchGame Attribute---
	var gameList = 0;	//생성된 10개 게임의 묶음번호.
	//------------------------
	
	
	
	function ready(){
		if(typeof web3 !== 'undefined'){
			web3 = new Web3(web3.currentProvider);
		} else {
			alert('메타마스크 준비하세요.');
		}
		contract = web3.eth.contract(contractABI).at(address);
	}
	
	function fetchGames(page){
		contract.fetchGames(page, function(err,res){
			gameList = res[0];
		})
	}
	
	function createGame(mapId, wait){
		contract.createGame(mapId, function(err,res){
		})
	}
	
	function fetchMap(mapId, drawMap){
		contract.fetchMap(mapId, function(err,res){
			width = res[0][0];	//가로 블록 수
			height = res[0][1];	//세로 블록 수
			diceMin = res[0][2];
			diceMax = res[0][3];
			blockArr = res[1].toString(2);
			drawMap();
		})
	}
	
	
	