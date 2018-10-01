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
    
    
    // length : numplayers
    // key : address
    uint8 public numDone;
    address[] players;
    mapping(address => uint8) addrids;
    mapping(address => uint32) bids;
    mapping(address => uint8[2]) poses;
    mapping(address => uint32) cashes;
    mapping(address => uint8) camefroms;
    mapping(address => uint8) dices;
    
    // length : numlands
    // key : landid(uint16)
    uint32[] public prices;
    address[] owners;
    uint16[] built;
    uint32[] highest_bid;
    address[] highest_bidder;    
    
    uint16 constant wall = 65535;
    uint16[][] public board;   
    
    
    
    event GameEvent(uint indexed type_,address indexed addr);
    /*
        Dicegen = 0 , address(this)
        
        StartFail = 1 , address(this)
        
        JoinSuccess = 2 , playeraddr
        
        JoinFail = 3 , playeraddr 
        
        MoveSuccess = 5, playeraddr
        
        MoveFail = 6 , playeraddr
    
    */
    
    
    
    // constructor(uint id_, address bj_ ,uint8[] info, uint[] walls, uint32[] prices_) public{
    constructor() public{
        uint id_ = 3;
        address bj_ = 0x229dAe485C553355e1d6dA1180337B4809882092;
        uint32[10] memory prices_ = [uint32(100000),120000,150000,110000,220000,150000,200000,130000,100000,120000];
        uint8[6] memory info = [10,10,1,10,1,10];
        uint[1] memory walls = [115735715935073412955811846413561534266942729113775074927116030918558482432000];
        
    
        
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
        cashes[bj] = 1000000;
        
        uint16[][] memory board_;
        board_ = new uint16[][](M);
        
        uint8 cursor = 0;
        uint8 wallsindex = 0;
        
        uint16 landindex = 0;


        for (uint i = 0; i < 10 ; i++) {
            board_[i] = new uint16[](N);
            
            for(uint j = 0; j < 10 ; j++){
                
                uint curbit = uint(1) << uint8(255-cursor);
            
                
                if( (walls[wallsindex]&curbit) > 0 ){
                    board_[i][j] = landindex;
                    landindex++;
                }else{
                    board_[i][j] = wall;
                }
                
                
                if(cursor >= uint8(255) ){
                    cursor = uint8(0);
                    wallsindex = uint8(wallsindex+1);
                }else{
                    cursor = uint8(cursor+1);
                }
            }
            
            
        }
        
        board = board_;
    }
    
    function v1(uint i) public view returns (uint16[]){
        return (board[i]); 
    }
    function v2(address addr) public view returns (uint){
        return camefroms[addr]; 
    }
    function v3(uint i) public view returns (uint16[]){
        return (board[i]); 
    }
    function v4() public view returns (uint8[] dices_){
        dices_ = new uint8[](players.length);
        for(uint i = 0; i < players.length; i++){
            dices_[i] = dices[players[i]];
        }
    }
    
  
    
    function join() public{
        if(players.length<playermax && cashes[msg.sender] == 0){
            cashes[msg.sender] = 1000000;
            players.push(msg.sender);
            emit GameEvent(2,msg.sender);
        }else{
            emit GameEvent(3,msg.sender);
        }
    }
   
    
    function start() public{
        if(true){
            gen_dices();
        }else{
            emit GameEvent(1,address(this));
        }
    }
    
    
    function gen_dices() internal{
        
        uint a = 37;
        
        for(uint i = 0; i<players.length ; i++){
            dices[players[i]] = uint8(a%(dicemax+1-dicemin)+dicemin);
            a *= 37;
        }
        
        emit GameEvent(0,address(this));
    }
   
    
    
    // function sum_moves() internal{
    //     // default moves
    //     for(uint i = 0; i<players.length ; i++){
    //         if(dices[players[i]] > 0){
    //             default_action(players[i]);
    //         }
    //     }
        
    //     // payments ?
        
        
    //     // decide bidding winners;
    //     for(i = 0; i< prices.length ; i++){
    //         if(owners[i] != address(this) && highest_bidder[i] != address(this)){
    //             if(cashes[highest_bidder[i]]>highest_bid[i]){
    //                 cashes[highest_bidder[i]] -= highest_bid[i];
    //                 owners[i] = highest_bidder[i];
    //                     bids[highest_bidder] = 0;
    //                 highest_bidder[i] = address(this);
    //                 highest_bid[i] = prices[i];
    //             }
    //         }
    //     }
        
    //         numDone = 0;
    //     gen_dices();
    // }
    
    
    
    function calc_fee() internal view returns (uint32){
        return 1230;
    }
    function sellvalue(uint16 landid) internal view returns (uint32){
        return 10000;
    }
    
    function inboard(uint8 x, uint8 y) internal view returns(bool){
        return(x<N && y<M && x>=0 && y>=0);
    }
    function ismovablelen(uint val) internal view returns (bool){
        return (val>0 && val<dicemax);
    }
    function island(uint16 val)  internal view returns (bool){
        return (val>=0 && val<uint16(prices.length));
    }
    
    
    
    function move(address addr, uint8 moveid, uint8 val) internal returns (bool){
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
            if(board[pos[0]][pos[1]]==wall) return false;
        }
        
        dice -= val;
        
        dices[addr] = dice;
        poses[addr] = pos;
        camefroms[addr] = ((moveid-1)+2)%4 + 1;
        return true;
    }
    
    // function default_action(address addr) internal{
        
    //     while(dices[addr]>0){
    //         for(uint moveid = 1; moveid<= 4 && moveid!=camefroms[addr]; moveid++){
    //             uint8 xVel = 0;
    //             uint8 yVel = 0;
                
    //             uint8[2] memory pos = poses[addr];
                
    //             if(moveid == 1 || moveid ==3){
    //                 xVel = uint8(moveid-2);
    //             }else{
    //                 yVel = uint8(moveid-3);
    //             }
                
    //             uint8 val = 0;
    //             bool isgood = true;
                
    //             while(isgood){
    //                 pos[0] += yVel;
    //                 pos[1] += xVel;
    //                 if(!inboard(pos[1],pos[0])) isgood = false;
    //                 if(board[pos[0]][pos[1]]==-1) isgood = false;
    //                 val++;
    //             }
                
    //             if(val>dices[addr])val = dices[addr];
    //             if(val != 0){
    //                 if(move(addr,moveid,val)) break;    
    //             } 
    //         }
    //     }
    // }
    
    function action(uint8[] actionids, uint[] params) public{
        if(dices[msg.sender] == 0){
            emit GameEvent(13,msg.sender);
            revert();
        }
        
        for(uint i = 0; i < actionids.length; i++){
            uint8 actionid = actionids[i];
            
            if(actionid>=1&&actionid<=4){
                if(!ismovablelen(params[i])){
                    emit GameEvent(14,msg.sender);
                    revert();
                }
                
                uint8 val = uint8(params[i]);
                
                if(!move(msg.sender,actionid,val)){
                    emit GameEvent(17,msg.sender);
                    revert();
                }
                
                
            }else if(actionid <= 7 && actionid >= 5){
                
                if(dices[msg.sender] != 0){
                    emit GameEvent(18,msg.sender);
                    revert();
                }
                
                uint8[2] memory pos = poses[msg.sender];
                
                if(actionid == 5){ // bid
                    bids[msg.sender] = uint32(params[i]);
                    
                }else if(actionid == 6){ // sell
                    uint16 land = uint16(params[i]);
                    if(owners[land] == msg.sender){
                        cashes[msg.sender] += sellvalue(land);
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
        
        if(dices[msg.sender] != 0){
            emit GameEvent(19,msg.sender);
            revert();
        }
        
        numDone++;
    }
    
    function viewBoard() public view returns(address[] players_,uint[] cashes_, uint8[2][] poses_, address[] owners_ ,uint16[] buidings_){
        players_ = players;
        
        cashes_ = new uint[](players.length);
        poses_ = new uint8[2][](players.length);
        
        for(uint i = 0; i < players.length; i++){
            cashes_[i] = cashes[players[i]];
            poses_[i] = poses[players[i]];
        }
        
        owners_ = owners;
        buidings_ = built;
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