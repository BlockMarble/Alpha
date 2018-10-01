pragma solidity ^0.4.24;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract Game is usingOraclize {

    uint id;
    
    constructor(uint id_) public{
        id = id_;
    }
  

}


contract Creator{
    
    uint constant pagelen = 10;
    uint current_id;
    
    mapping(uint => address) games;
    mapping(uint => uint[4]) infos;
    mapping(uint => uint[]) walls;
    mapping(uint => uint[]) prices;
    
    
    
    constructor() public{
        
        current_id = 0;
        
    }

    event creation(uint indexed id, address indexed owner, address indexed addr);
    
    function fetchGames(uint page) public view returns (address[10] list){
    
        for (uint i=0; i<10; i++) {
          list[i] = 0xE0f5206BBD039e7b0592d8918820024e2a7437b9;
        }
        
    }
    
    function createGame(uint mapid, uint wait) public {
        current_id = current_id + 1;
        games[current_id] = address(new Game(current_id));
        emit creation(current_id,msg.sender,games[current_id]);
    }
    
    function fetchMap(uint id) public view returns (uint[6] info,uint[] walls,uint[] prices){
        info = [uint(10),10,5,20,1,20];
        uint[34] memory _prices = [
            uint(160000),160000,160000,160000,
            160000,160000,160000,160000,
            170000,160000,160000,160000,
            160000,160000,170000,160000,
            160000,160000,160000,160000,
            170000,170000,160000,160000,
            160000,160000,160000,260000,
            260000,260000,160000,160000,
            160000,160000];
        
        prices = new uint[](34);
        walls = aaa();
        for(uint j = 0; j < 34; j ++ ){
            prices[j] = _prices[j];
        }
            
    }
    
    
    function createMap(uint width, uint height, uint playermin, uint playermax, uint dicemin, uint dicemax, uint[] walls, uint[] prices) public{
        
    }
    
    function aaa() view returns (uint[] a){
        uint num = 1+uint(10*10)/uint(256);
        
        uint row = 0;
        uint col = 0;
        
        a = new uint[](num);
        uint j = 0;
        uint b = 0;
        for(uint i = 0; i < 100 ; i++){
            if(i>255){
                a[j] = b;
            }else{
                uint cur = 0;
                
                if (row == 0 || row == 9){
                    cur = 1;
                }else{
                    if (col == 0 || col == 9){
                        cur = 1;
                    }
                }
                
                
                b = b + (uint(cur)<<(255-i));
                
                col = col+1;
                if(col>9){
                    col = 0;
                    row = row+1;
                    if(row > 9){
                        break;
                    }
                }
                        
            }
        }
        a[j] = b;
    }
    
}

