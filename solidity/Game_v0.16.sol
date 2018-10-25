pragma solidity ^0.4.24;

// import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract Game /* is usingOraclize */ {

    /*
        dice values : uint8;
        number of players, addresses : uint8
        number of lands, landid : uint16
        amount of cash : uint32
    */

    uint id;
    address bj;
    uint8 public N;
    uint8 public M;
    uint8 public playermin;
    uint8 public playermax;
    uint8 public dicemin;
    uint8 public dicemax;
    
    uint32 public building_price;
    
    
    // length : numplayers
    // key : address
    uint8 public numDone;
    address[] players;
    mapping(address => uint8) public addrids;
    mapping(address => uint8[2]) public poses;
    mapping(address => uint32) public cashes;
    mapping(address => uint8) public camefroms;
    mapping(address => uint8) public dices;
    
    // length : numlands
    // key : landid(uint16)
    uint32[] public prices;
    address[] public owners;
    uint16[] public built;
    uint32[] public highest_bid;
    address[] public highest_bidder;    
    
    uint16 constant wall = 65535;
    uint[] public boardRaw;
    uint16[][] public board;
    
    
    
    
    
    event GameEvent_(address indexed addr,uint indexed eventType);
    /*
       	startGame 7 8 
    	joinGame 11 12
    	action 13 14
    
    */
    
    uint logid = 0;
    function emitGameEvent(address addr, uint eventType) internal{
        emit GameEvent_(addr,eventType + (logid<<40));
        logid++;
    }
    
    uint[] public consolog;
    
    constructor(uint mapid_,address sender, uint8[] infos_,uint[] wallsRaw, uint32[] prices_) public{
        
        // uint id_ = 0; 
        // address bj_ = msg.sender;
        // uint8[] memory infos_ = new uint8[](6);
        // infos_[0] = 20;    
        // infos_[1] = 20;    
        // infos_[2] = 1;    
        // infos_[3] = 20;    
        // infos_[4] = 1;    
        // infos_[5] = 20;    
        
        // uint[] memory wallsRaw = new uint[](2);
        // wallsRaw[0] = 115792034023503389687214106631562197096899613618730331263382846999089914150912;
        // wallsRaw[1] = 10855518718627786543565049815505858995744063728807791394286244534592429096960;
        
        // uint32[] memory prices_ = new uint32[](76);
        
        
        
        
        // // [width,height,playermin,playermax,dicemin,dicemax]
        id = mapid_;
        bj = sender;
        prices = prices_;
        
        N = infos_[0];
        M = infos_[1];
        playermin = infos_[2];
        playermax = infos_[3];
        dicemin = infos_[4];
        dicemax = infos_[5];
        
        building_price = 1000;
        
        players.push(bj);
        cashes[bj] = 1000000;
        
        
        uint16[][] memory board_ = new uint16[][](M);
        boardRaw = wallsRaw;
        
        owners = new address[](prices.length);
        built = new uint16[](prices.length);
        highest_bid = new uint32[](prices.length);
        highest_bidder = new address[](prices.length);    
        
        
        uint8 cursor = 0;
        uint8 wallsindex = 0;
        
        uint16 landindex = 0;


        for (uint i = 0; i < M ; i++) {
            board_[i] = new uint16[](N);
            
            for(uint j = 0; j < N ; j++){
                
                uint curbit = uint(1) << uint8(255-cursor);
            
                
                if( (wallsRaw[wallsindex]&curbit) > 0 ){
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
    
    function v_prices() public view returns (uint32[]){
        uint32[] memory result = prices;
        return result;
    }
    function v_viewrow(uint i) public view returns (uint16[]){
        return (board[i]); 
    }
    function v_dices() public view returns (uint8[] dices_){
        dices_ = new uint8[](players.length);
        for(uint i = 0; i < players.length; i++){
            dices_[i] = dices[players[i]];
        }
    }

    function bjdice_i() internal{
        dices[bj] = uint8(4);
    }
    
   
    function start() public{
        if(true){
            gen_dices();
        }else{
            emitGameEvent(address(0),8);
        }
    }    
    function join() public{
        join_i(msg.sender);
    }
    function viewDice() public view returns (uint){
        return dices[msg.sender];
    }
    
    
    function sum_moves_i() public{
        sum_moves();
    }
    
    
    function join_i(address sender) public{
        if(players.length<playermax && cashes[sender] == 0){
            cashes[sender] = 1000000;
            players.push(sender);
            emitGameEvent(sender,11);
        }else if(cashes[sender] > 0){
            emitGameEvent(sender,11);
        }else{
            emitGameEvent(sender,12);
        }
    }
      
    function action(uint[] params) public{
        action_i(params,msg.sender);
    }
    function action_i(uint[] params, address sender) public{
        if(dices[sender] == 0){
            emitGameEvent(sender,14);
        }
        
        
        uint i = 0;
        while(i<params.length){
            uint8 actionid = uint8(params[i]);
            i++;
            
            if(actionid>=1&&actionid<=4){
                if(!ismovablelen(params[i])){
                    emitGameEvent(sender,178);
                    
                }
                
                uint8 val = uint8(params[i]);
                
                if(!move(sender,actionid,val)){
                    emitGameEvent(sender,1123);
                }
            }else if(actionid <= 7 && actionid >= 5){
                
                if(dices[sender] != 0){
                    emitGameEvent(sender,1049);
                    return;
                }
                
                uint8[2] memory pos = poses[sender];
                uint16 landid = posToLandId(pos);
                    
                if(actionid == 5){ // bid
                    if(landid != wall){
                        uint32 bid = uint32(params[i]);
                        if(bid > highest_bid[landid]){
                            highest_bidder[landid] = sender;
                            highest_bid[landid] = bid;
                        }      
                    }
                }else if(actionid == 6){ // sell
                    landid = uint16(params[i]);
                    if(owners[landid] == sender){
                        cashes[sender] += sellvalue(landid);
                        owners[landid] = address(0);
                    }else{
                        
                        return;
                    }
                }else if(actionid == 7){ // build
                    landid = uint16(params[i]);
                    if(landid != wall && cashes[sender] > building_price ){
                        built[landid] += 1;
                        cashes[sender] -= building_price;
                    }
                }
            }else{
                emitGameEvent(sender,125);
            }
            i++;
        }
        
            
        
        
        if(dices[sender] != 0){
            emitGameEvent(sender,7462);
        }
        
        emitGameEvent(sender,1245);
        
        numDone++;
        if(numDone == players.length){
            //sum_moves();
        }
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
    
    function viewGame() public view returns(uint8,uint8,uint[],uint32[]){
        
        uint8 _n = N; 
        uint8 _m = M; 
        uint[] memory _boardRaw = boardRaw;
        uint32[] memory _prices = prices;  
        
        return (_n, _m, _boardRaw, _prices);
    }
    
    
    
    
    
    
    function gen_dices() internal{
        uint a = 37;
        for(uint i = 0; i<players.length ; i++){
            dices[players[i]] = uint8(a%(dicemax+1-dicemin)+dicemin);
            a *= 37;
        }
        emitGameEvent(address(0),7);
    }
    
    
    function sum_moves() internal{
        uint i = 0;
        // default moves
        for(i = 0; i<players.length ; i++){
            if(dices[players[i]] > 0){
                default_action(players[i]);
            }
        }
        
        // payments
        for(i = 0; i< players.length ; i++){
            address player = players[i];
            uint16 landid = posToLandId(poses[player]);
            if(owners[landid] != address(0) && owners[landid] != player){
                uint32 fee = calcFee(landid);
                if(cashes[player] >= fee||liquidate(player,fee-cashes[player])){
                    cashes[player] -= fee;
                    cashes[owners[landid]] += fee;
                }else{
                    // broke
                    cashes[owners[landid]] += cashes[player];
                    cashes[player] = 0;
                }
            }
        }
        
        
        // decide bidding winners;
        for(i = 0; i< prices.length ; i++){
            if(owners[i] == address(0) && highest_bidder[i] != address(0)){
                if(cashes[highest_bidder[i]]>highest_bid[i]){
                    cashes[highest_bidder[i]] -= highest_bid[i];
                    owners[i] = highest_bidder[i];
                    highest_bidder[i] = address(0);
                    highest_bid[i] = prices[i];
                }
            }
        }
        
        numDone = 0;
        gen_dices();
    }
    
    

    
    function liquidate(address addr,uint32 val) internal returns(bool){
        uint32 cum = 0;
        for(uint16 i = 0 ; i < prices.length ; i++){
            if(owners[i] == addr){
                uint32 sellval = sellvalue(i);
                cum += sellval;
                cashes[addr] += sellval;
                owners[i] = address(0);
                if(cum > val){
                    return true;    
                }
            }
        }
        return false;
    }
  
    
    function move(address addr, uint8 moveid, uint8 val) internal returns (bool){
        if(moveid == camefroms[addr]) return false;
        
        uint8 dice = dices[addr];
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
            
            if(!inboard(pos)) return false;
            if(posToLandId(pos)==wall) return false;
        }
        
        dice -= val;
        
        dices[addr] = dice;
        poses[addr] = pos;
        camefroms[addr] = ((moveid-1)+2)%4 + 1;
        return true;
    }
    
    function default_action(address addr) internal{
        
        while(dices[addr]>0){
            for(uint8 moveid = 1; moveid<= 4; moveid++){
                if( moveid==camefroms[addr] ) continue;
                
                uint8 xVel = 0;
                uint8 yVel = 0;
                
                uint8[2] memory pos = poses[addr];
                
                if(moveid == 1 || moveid ==3){
                    xVel = uint8(moveid-2);
                }else{
                    yVel = uint8(moveid-3);
                }
                
                uint8 val = 0;
                
                while(true){
                    pos[0] += yVel;
                    pos[1] += xVel;
                    if(!inboard(pos))break;
                    if(posToLandId(pos)==wall)break;
                    val++;
                }
                
                if(val>dices[addr])val = dices[addr];
                
                if(val != 0){
                    if(move(addr,moveid,val)) break;    
                } 
            }
        }
    }
  
    function calcFee(uint16 landid) internal view returns (uint32){
        return prices[landid]/uint8(10);
    }
    function sellvalue(uint16 landid) internal view returns (uint32){
        return prices[landid];
    }
    function inboard(uint8[2] pos) internal view returns(bool){
        return(pos[1]<N && pos[0]<M && pos[1]>=0 && pos[0]>=0);
    }
    function ismovablelen(uint val) internal view returns (bool){
        return (val>0 && val<dicemax);
    }
    function posToLandId(uint8[2] pos) internal view returns (uint16){
        return board[pos[0]][pos[1]];
    }
}