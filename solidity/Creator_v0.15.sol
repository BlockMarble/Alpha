pragma solidity ^0.4.24;

import "browser/Game.sol";

contract Creator{
    
    uint constant pagelen = 10;
    
    
    // index : game id 
    address[] games;
    
    
    // index : map id 
    uint8[6][] infos;
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
    
    function fetchGames(uint page) public view returns (address[10] list){
    
        for (uint i=0; i<10; i++) {
            uint index = page*10 + i;
            if(index < games.length){
                list[i] = games[index];
            }else{
                list[i] = address(0);    
            }
        }
        
    }
    
    function createGame(uint mapid, uint wait) public {
        uint current_id = games.length;
        
        uint8[6] memory info_ = infos[mapid];
        
        games.push(address(new Game(current_id,msg.sender,info_,walls[mapid],prices[mapid])));
        emit CreatorEvent(msg.sender,1,uint(games[games.length-1]));
    }
    
    function fetchMap(uint id) public view returns (uint8[6] info_,uint[] walls_,uint32[] prices_){
        if(id>=0 && id < infos.length){
            info_ = infos[id];
            prices_ = prices[id];
            walls_ = walls[id];
        }else{
            info_ = [0,0,0,0,0,0];
            prices_ = [uint32(0)];
            walls_ = [uint(0)];
        }
    }
    
    function createMap(uint8 width, uint8 height, uint8 playermin, uint8 playermax, uint8 dicemin, uint8 dicemax, uint[] walls_, uint32[] prices_) public{
        
        uint current_id = infos.length;
        
        infos.push([width,height,playermin,playermax,dicemin,dicemax]);
        walls.push(walls_);
        prices.push(prices_);
            
        emit CreatorEvent(msg.sender,3,uint(3));        
    }
    
    
    function creatBasicGame() public{
        uint current_id = games.length;
        
        uint8[6] memory info_ = [10,10,1,20,1,20];
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
        emit CreatorEvent(msg.sender,1,uint(games[games.length-1]));
    }
}

