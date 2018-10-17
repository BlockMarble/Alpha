
if( typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);

}else{
    web3 = new Web3(Web3.providers.HttpProvider());
}
var account0 = web3.eth.accounts[0]


var contract = {};

contract.addrs = {};

contract.addrs.creator = '';
contract.addrs.game = '';


contract.abis = {};
contract.abis.creator = '';
contract.abis.game = '';


contract.game = {};
contract.creator = {};




contract.filters = {};



contract.currentEventListeners = {};
contract.currentListeningCreatorAddr = {};
contract.currentListeningGameAddr = {};
contract.currentCreatorPublicWatcher = {};
contract.currentGamePublicWatcher = {};
contract.currentCreatorPrivateWatcher = {};
contract.currentGamePrivateWatcher = {};
contract.restartFilter = function(){
	// if(contract.addrs.creator && contract.currentListeningCreatorAddr != contract.addrs.creator){
	// }

	// if(contract.addrs.game && contract.currentListeningGameAddr != contract.addrs.game){
	// 	var optionsPublic = {
 //                    "address" :  contract.addrs.game,
 //                    "topics" : [
 //                    null
 //                    ,"0x0000000000000000000000000000000000000000000000000000000000000002"
 //                    ,null
 //                    ,null]
 //                }

 //        var optionsPrivate = {
 //                    "address" :  contract.addrs.game,
 //                    "topics" : [
 //                    null
 //                    ,"0x0000000000000000000000000000000000000000000000000000000000000002"
 //                    ,null
 //                    ,null]
 //                }        
 //        contract.currentGamePublicWatcher = web3.eth.filter(optionsPublic);
 //        contract.currentGamePublicWatcher.watch(function(err,res){
 //        	if(!error){
 //        		switch(){
 //        		}
 //        	}
 //        });        
 //        contract.currentGamePrivateWatcher = web3.eth.filter(optionsPrivate);        
	// }	
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

contract.createMap = function(){
	contract.currentEventListeners.createMap = callback(); 
}

contract.saveMap = function(){


}

contract.startGame = function(){

}

contract.joinGame = function(){


}

contract.action = function(){

}