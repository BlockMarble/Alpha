pragma solidity ^0.4.24;

//import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract Game /*is usingOraclize*/ {

    /*
        dice values : uint8;
        number of players, addresses : uint8
        number of lands, landid : uint16
        amount of cash : uint32
    */

    uint id;
    address bj;
    uint8 N;
    uint8 M;
    uint8 playermin;
    uint8 playermax;
    uint8 dicemin;
    uint8 dicemax;
    
    uint8 numplayers;
    
    // length : numplayers
    // key : address
    address[] players;
    mapping(address => uint32) bids;
    mapping(address => uint8[2]) poses;
    mapping(address => uint32) cash;
    mapping(address => uint8) camefroms;
    mapping(address => uint8) dices;
    
    // length : numlands
    // key : landid(uint16)
    uint32[] prices;
    address[] owners;
    uint16[] built;
    uint32[] highest_bid;
    address[] highest_bidder;    
    
    int32[][] board;   
    
    
        
    event Dicegen();
    event Joinresult(bool indexed tf);
    
    
    constructor(uint id_, address bj_ ,uint8[] info, uint[] walls, uint32[] prices_) public{
        id = id_;
        bj = bj_;
        prices = prices_;
        
        N = info[0];
        M = info[1];
        playermin = info[2];
        playermax = info[3];
        dicemin = info[4];
        dicemax = info[5];
        
        players.push(bj);
        
        int32[][] memory board_;
        board_ = new int32[][](M);
        
        uint8 cursor = 0;
        uint8 wallsindex = 0;
        
        uint16 landindex = 0;
        
        
        
        for (uint8 i = 0; i < M ; i++) {
            board[i] = new int32[](N);
            
            for(uint8 j = 0; j < N ; j++){
                
                uint curbit = uint(1) << uint(255-cursor);
                
                if( (walls[wallsindex]&curbit) > 0 ){
                    board[i][j] = landindex;
                    landindex++;
                }else{
                    board[i][j] = -1;
                }
                
                
                cursor = cursor+1;
                if(cursor >=256){
                    cursor = 0;
                    wallsindex = wallsindex+1;
                }
            }
            
            
        }
        
        board = board_;
    }
    
    
    function join(){
        if(players.length<playermax){
            players.push(msg.sender);
            
        }else{
            
        }
    }
   
    
    function start(){
        
    }
    
    
    function gen_dices(){
        
    }
   
    
    
    function sum_moves(){
        // default moves
        for(uint i = 0; i<players.length ; i++){
            if(dices[players[i]] > 0){
                default_action(players[i]);
            }
        }
        
        // payments ?
        
        
        // decide bidding winners;
        for(i = 0; i< prices.length ; i++){
            if(owners[i] != address(this) && highest_bidder[i] != address(this)){
                if(cash[highest_bidder[i]]>highest_bid[i]){
                    cash[highest_bidder[i]] -= highest_bid[i];
                    owners[i] = highest_bidder[i];
                    highest_bidder[i] = address(this);
                    highest_bid[i] = prices[i];
                }
            }
        }
        
        gen_dices();
    }
    
    
    
    function calc_fee() returns (uint32){
        return 10000;
    }
    function sellvalue(uint16 landid) internal returns (uint32){
        return 10000;
    }
    
    function inboard(uint8 x, uint8 y) internal view returns(bool){
        return(x<N && y<M && x>=0 && y>=0);
    }
    function ismovablelen(uint val) internal view returns (bool){
        return (val>0 && val<dicemax);
    }
    function island(int32 val)  internal view returns (bool){
        return (val>-1 && val<int32(prices.length));
    }
    
    
    
    function move(address addr, uint moveid, uint8 val) internal returns (bool){
        if(moveid == camefroms[addr]) return false;
        
        
        uint8 dice = dices[msg.sender];
        uint8[2] memory pos = poses[addr];
        
        if(dice < val) val = dice;
        
        uint8 xVel = 0;
        uint8 yVel = 0;
        
        if(moveid == 1 || moveid ==3){
            xVel = uint8(moveid-2);
        }else{
            yVel = uint8(moveid-3);
        }
        
        uint8 count = 0;
        
        while(count<val){
            count = count+1;
            pos[0] += yVel;
            pos[1] += xVel;
            
            if(!inboard(pos[1],pos[0])) return false;
            if(board[pos[0]][pos[1]]==-1) return false;
        }
        
        dice -= val;
        
        dices[addr] = dice;
        poses[addr] = pos;
        camefroms[addr] = ((camefroms[addr]-1)+2)%4 + 1;
    }
    
    function default_action(address addr) internal{
        
        while(dices[addr]>0){
            for(uint moveid = 1; moveid<= 4 && moveid!=camefroms[addr]; moveid++){
                uint8 xVel = 0;
                uint8 yVel = 0;
                
                uint8[2] memory pos = poses[addr];
                
                if(moveid == 1 || moveid ==3){
                    xVel = uint8(moveid-2);
                }else{
                    yVel = uint8(moveid-3);
                }
                
                uint8 val = 0;
                bool isgood = true;
                
                while(isgood){
                    pos[0] += yVel;
                    pos[1] += xVel;
                    if(!inboard(pos[1],pos[0])) isgood = false;
                    if(board[pos[0]][pos[1]]==-1) isgood = false;
                    val++;
                }
                
                if(val>dices[addr])val = dices[addr];
                if(val != 0){
                    if(move(addr,moveid,val)) break;    
                } 
            }
        }
    }
    
    function action(uint8[] actionids, uint[] params) public{
        
        for(uint i = 0; i < actionids.length; i++){
            
            uint actionid = actionids[i];
            
            if(actionid>=1&&actionid<=4){
                require(ismovablelen(params[i]));
                uint8 val = uint8(params[i]);
                
                bool result = move(msg.sender,actionid,val);
                require(result);
                
            }else if(actionid <= 7 && actionid >= 5){
                
                
                require(dices[msg.sender] == 0);
                
                uint8[2] memory pos = poses[msg.sender];
                
                if(actionid == 5){ // bid
                    bids[msg.sender] = uint32(params[i]);
                    
                }else if(actionid == 6){ // sell
                    uint16 land = uint16(params[i]);
                    if(owners[land] == msg.sender){
                        cash[msg.sender] += sellvalue(land);
                        owners[land] = address(this);
                    }
                }else if(actionid == 7){ // build
                    if(island(board[pos[0]][pos[1]])){
                        uint16 landid = uint16(board[pos[0]][pos[1]]);
                        built[landid] +=1;    
                    }
                    
                }
            }
        }
        
    }
    
    
//   string public ETHUSD;
//   event LogConstructorInitiated(string nextStep);
//   event LogPriceUpdated(string price);
//   event LogNewOraclizeQuery(string description);

//   function __callback(bytes32 myid, string result) {
//       if (msg.sender != oraclize_cbAddress()) revert();
//       ETHUSD = result;
//       LogPriceUpdated(result);
//   }

//   function updatePrice() payable {
//       if (oraclize_getPrice("URL") > this.balance) {
//           LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
//       } else {
//           LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
//           oraclize_query("URL", "json(https://api.gdax.com/products/ETH-USD/ticker).price");
//       }
//   }
    
}