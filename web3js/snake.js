




function rand(start,end){
	return Math.floor(Math.random()*(end-0.0000001));
}


var boardSize = 50;




$(document).ready(()=>{

	var tstart = '<table><tbody>';
	var tend = '</tbody></table>';

	for(let i = 0; i < boardSize ; i++){
		
		tstart += '<tr>';	
		for(let j = 0; j < boardSize ; j++){
			tstart += `<td id="td_${j}_${i}"></td>`
		}
		tstart += '</tr>';	
	}
	tstart+=tend;

	$(document.body).append(tstart);
	$("td").css({"border": "1px solid black", "width": "10px" , "height": "10px"});



	$(document.body).append('<input type="button" id="btn0"></input>');
	$('#btn0').click(()=>{

		var startpos = [rand(0,boardSize),rand(0,boardSize)];

		var ary = [];

		var board = new Array(boardSize);

		for(var i = 0 ; i< boardSize ; i++){
			var row = new Array(boardSize);
			row.fill(0);
			board[i] = row;
		}

		board[startpos[1],startpos[0]] = 1;

		for(let i = 0; i < 20 ; i++){

			ary.push(startpos);
		}

		var headPos = 19;

		var movements = [[0,1],[0,-1],[1,0],[-1,0]];
		var movementId = Math.floor(Math.random()*3.9999);
		var c = Math.floor(Math.random()*33.9999);

		function myTimer(){


			var nextPos =  [ary[headPos][0]+movements[movementId][0],ary[headPos][1]+movements[movementId][1]];
			
			while(c==0 || (boardSize<=nextPos[0]||	0>nextPos[0] || boardSize<= nextPos[1] || 0> nextPos[1] ))
			{
				c = Math.floor(Math.random()*33.9999);
				movementId = Math.floor(Math.random()*3.9999);
				nextPos = [ary[headPos][0]+movements[movementId][0],ary[headPos][1]+movements[movementId][1]];
			}	

			c-- ;


			$(`#td_${ary[headPos][0]}_${ary[headPos][1]}`).css("background-color","black");
			
			headPos = (headPos+1)%20;	
			
			ary[headPos] = nextPos;

			board[nextPos[1]][nextPos[0]] = 1;
			$(`#td_${ary[headPos][0]}_${ary[headPos][1]}`).css("background-color","red");

		}

		var myVar = setInterval(myTimer, 100);
	});




});

