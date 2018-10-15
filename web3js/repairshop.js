
var arrivals = [0];

for(let i = 0; i < 100 ; i++){
	arrivals.push(arrivals[arrivals.length-1]+Math.floor(Math.random()*2.9999));
}

console.log(arrivals);

var queue_repslot = [];
var queue_regslot = [];


var num_regslot = 5;
var num_repslot = 5;

var regslots = new Array(num_regslot);
regslots.fill(null);
var num_occupied_regslot = 0;
var time_consumption_regslot = [];
for(let i = 0 ; i < num_regslot ; i ++){
	time_consumption_regslot[i] = Math.floor(1 + Math.random()*5.9999);
}

var repslots = new Array(num_repslot);
repslots.fill(null);
var num_occupied_repslot = 0;
var time_consumption_repslot = [];
for(let i = 0 ; i < num_repslot ; i ++){
	time_consumption_repslot[i] = Math.floor(1 + Math.random()*5.9999);
}


// ary time_consumption_repslot and time_consumption_regslot should be the len of num_regslot , num_repslot resplectively and filled with intgers ranging from 1 to 6


var numArrived = 0;
var timestamp = 0;
function go(){

	if(arrivals[numArrived] == timestamp){
		queue_regslot.push({
			arrive_time : timestamp
		});
	}


	for(let  i = 0; i < regslots.length ; i++){
		if( regslots[i].regstart+time_consumption_regslot[i] >= timestamp ){
			queue_repslot.push(regslots[i])
			regslots[i] = null;
			num_occupied_regslot--;
			break;	
		}
	}

	while(num_occupied_regslot < regslots.length && queue_regslot.length > 0){
		var client = queue_regslot.shift();
		
		for(let  i = 0; i < regslots.length ; i++){
			if(regslots[i] = null){
				regslots[i] = client;
				regslots[i].regstart = timestamp;
				num_occupied_regslot++;
				break;	
			}
		}		
	}


	for(let  i = 0; i < repslots.length ; i++){
		if( repslots[i].repstart+time_consumption_repslot[i] >= timestamp ){
			repslots[i] = null;
			num_occupied_repslot--;
			break;	
		}
	}

	while(num_occupied_repslot < repslots.length && queue_repslot.length > 0){
		var client = queue_repslot.shift();
		
		for(let  i = 0; i < repslots.length ; i++){
			if(repslots[i] = null){
				repslots[i] = client;
				repslots[i].repstart = timestamp;
				num_occupied_repslot++;
				break;	
			}
		}		
	}



	timestamp++;
}




$(document).ready(function(){
	$(document.body).append('<input type="button" id="btn_0" value="go"></input><br>');

	$('#btn_0').click(()=>{
		go();
	});
});