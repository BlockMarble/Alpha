

contract.restartFilter();

var args = [];

(function(width,height,playerMin,playerMax,diceMin,diceMax,walls,prices,callback){
	
	var infos = [width,height,playerMin,playerMax,diceMin,diceMax];

	var walls_bin = [];
	var prices_nonNull = [];

	let bitIndex = -1;
	let bignum = new BigNumber(0);
	for(let i = 0 ; i < walls.length ; i ++){for(let j = 0 ; j < walls[i].length ; j ++){
		bitIndex++;
		if(bitIndex > 255){
			bitIndex = 0;
			walls_bin.push(bignum);
			bignum = new BigNumber(0);
		}
		
		let val = walls[i][j];

		bignum = bignum.multipliedBy(2);
		bignum = bignum.plus(val);

		if(val != 0){
			prices_nonNull.push(prices[i][j]);
		}
	}}
	while(bitIndex < 255){
		bignum = bignum.multipliedBy(2);
		bitIndex++;
	}

	walls_bin.push(bignum);


	args[0] = infos;
	args[1] = walls_bin;
	args[2] = prices_nonNull;
})
(10,10,1,10,1,10,
	[
		[1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1],
	],[
		[1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1],
	],
	()=>{});


var f = [];
var counter = 0;
function counterCallback(res){
	console.log(res);
	f[counter]();
	counter++;
}

f[0] = function(){
	args.push(counterCallback);
	contract.createMap.apply(null,args);
}
f[1] = function(){
	contract.createGame(0,10,counterCallback);
}

counterCallback();