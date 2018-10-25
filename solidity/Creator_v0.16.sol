pragma solidity ^0.4.24;

import "browser/Game.sol";

contract Creator{
    
    uint constant pagelen = 10;
    
    
    // index : game id 
    address[] games;
    
    
    // index : map id 
    uint8[][] infos;
    uint[][] walls;
    uint32[][] prices;
    
    constructor() public{
     
    }
    
    function viewNumGames() public view returns (uint){
        return games.length;
    }
    function viewNumMaps() public view returns (uint){
        return infos.length;
    }

    event CreatorEvent(address indexed requester, uint indexed _type, uint indexed value);
    
  /*
  
	createMap 1 2 	
	saveMap	3 4 
	createGame 5 6 
  
  */
    
    function fetchGame(uint i) public view returns (address gameAddr){
        return games[i];    
    }
    
    uint logid = 0;
    function emitCreatorEvent(address sender,uint eventtyp,uint val) internal {
        emit CreatorEvent(sender,eventtyp + (logid<<40), val);    
        logid++;
    }
    
    function createGame(uint mapid, uint wait) public {
        uint current_id = games.length;
        
        uint8[] memory info_ = infos[mapid];
        
        games.push(address(new Game(current_id,msg.sender,info_,walls[mapid],prices[mapid])));
        emitCreatorEvent(msg.sender,5,uint(games[games.length-1]));
    }
    
    function fetchMap(uint id) public view returns (uint8[] info_,uint[] walls_,uint32[] prices_){
        if(id>=0 && id < infos.length){
            info_ = infos[id];
            prices_ = prices[id];
            walls_ = walls[id];
        }else{
            info_ = new uint8[](1);
            prices_ = new uint32[](0);
            walls_ = new uint[](0);
        }
    }
    
    function createMap(uint8[] info,uint[] walls_, uint32[] prices_) public{
        uint current_id = infos.length;
        
        infos.push(info);
        walls.push(walls_);
        prices.push(prices_);
            
        emitCreatorEvent(msg.sender,1,current_id);        
    }  
    
    function saveMap(uint8 width, uint8 height, uint8 playermin, uint8 playermax, uint8 dicemin, uint8 dicemax, uint[] walls_, uint32[] prices_) public{
        
        uint current_id = infos.length;
        
        infos.push([width,height,playermin,playermax,dicemin,dicemax]);
        walls.push(walls_);
        prices.push(prices_);
            
        emitCreatorEvent(msg.sender,1,current_id);        
    }
    
    
    function creatBasicGame() public{
        uint current_id = games.length;
        
        uint8[] memory info_ = new uint8[](6);
        info_[0] = 10;
        info_[1] = 10;
        info_[2] = 1;
        info_[3] = 10;
        info_[4] = 1;
        info_[5] = 10;
        
        uint[] memory walls_ = new uint[](1);
        walls_[0] = 115739253086608799473272446246676835709932397168287476801964517168783086845952;
        
        uint numlands = 0;
        for(uint i = 0 ; i < walls_.length ; i ++){
            uint wall = walls_[i];
            for(uint j = 0; j<256 ; j++){
                if(wall%2 == 1){
                    numlands++;
                }
                wall = wall/2;   
            }
        }
        
        uint32[] memory prices_ = new uint32[](numlands);
        uint seed = 13;
        for(i = 0 ; i< numlands; i++){
            prices_[i] = uint32(100000+((seed**(7+i))%89)*1000);
        }
        
        
        games.push(address(new Game(current_id,msg.sender,info_,walls_,prices_)));
        emitCreatorEvent(msg.sender,5,uint(games[games.length-1]));
    }
}

