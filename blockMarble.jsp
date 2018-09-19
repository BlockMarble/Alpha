<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<style>
	div{
		display: inline-block;
		width : 90%;
		height : 90%;
	}
	table{
		width : 90%;
		height : 90%;
	}
	td{
		width : 10px;
		height : 10px;
		border: 1px solid black;
	}
	#ground{
		background-color : black;
	}
</style>
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src=https://github.com/ethereum/web3.js/blob/develop/dist/web3.min.js></script>
<script>
	var contractABI = [ { "constant": false, "inputs": [ { "name": "mapid", "type": "uint256" }, { "name": "wait", "type": "uint256" } ], "name": "createGame", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "page", "type": "uint256" } ], "name": "fetchGames", "outputs": [ { "name": "list", "type": "address[10]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "width", "type": "uint256" }, { "name": "height", "type": "uint256" }, { "name": "playermin", "type": "uint256" }, { "name": "playermax", "type": "uint256" }, { "name": "dicemin", "type": "uint256" }, { "name": "dicemax", "type": "uint256" }, { "name": "walls", "type": "uint256[]" }, { "name": "prices", "type": "uint256[]" } ], "name": "createMap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "fetchMap", "outputs": [ { "name": "info", "type": "uint256[6]" }, { "name": "walls", "type": "uint256[]" }, { "name": "prices", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];
	var address = "0x7b4e1c497dd68b6fa8bb034f46fc1280e4ce9326";
	
	$(function(){
		if(typeof web3 !== 'undefined'){
			web3 = new Web3(web3.currentProvider);
		} else {
			alert('메타마스크 준비하세요.');
		}
		var contract = web3.eth.contract(contractABI).at(address);

		$('#createMapBtn').on('click', function(){
			contract.fetchMap(1, function(err,res){
				var width = res[0][0];	//가로 블록 수
				var height = res[0][1];	//세로 블록 수
				var diceMin = res[0][2];
				var diceMax = res[0][3];
				var blockArr = new Array;
				
				for (var i=0; i<res[1].length; i++){
					blockArr.push(res[1][i].toString(2));
				}
				drawGreed(width, height, blockArr);
			})
		})
	});
	
	function drawGreed(x, y, blockArr){
		var greed = '<table>';
		
		for(var i=0; i<y; i++){
			greed += '<tr>';
			for(var j=0; j<x; j++){
				if(blockArr[i][j] == '1'){
					greed += '<td><img src="1.png" /></td>';
				} else{
					greed += '<td><img src="2.png" /></td>';
				}
			}
			greed += '</tr>';
		}
		greed += '</table>';
		$('#drawGreed').html(greed);
	}
	
</script>
<body style = "height:100%;">
	<input type='button' id='createMapBtn' value='맵그리기'>
	<div id='drawGreed'></div>
</body>
</html>

