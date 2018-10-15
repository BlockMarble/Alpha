
var consoleDivId;

function isStringOrNumber(o){
    var typ = typeof o;
    if (typ === "string" || typ === "number"){
        return true;
    }
}

function appendConsoleDiv(s,shower){
    $('#div_'+consoleDivId).append('<h4> result of '+shower+' : '+s+'</h4>');
}    

function renderInTextArea(res,shower){
    $('#textarea_0').val("result of "+shower+" : \n"+JSON.stringify(res));         
}

function show(o,shower){
    if(!shower){shower = "last call"}
    if(isStringOrNumber(o)){
        appendConsoleDiv(o, shower);
    }else{
        renderInTextArea(o, shower);
    }
}



$(document).ready(function(){

	var divIdCount = 0;
	function div(){

		let numbers = [];

		let css = [];
		let cssString = "";



		for(let i = 0 ; i < arguments.length ; i++){

			let elm = arguments[i];
			let typ = typeof elm;
			switch(typ){
				case('number'):
					numbers.push(elm);
					break;
				case('string'):
					var a = elm.match(/\w[\w]*\s*:\s*[\w]+\s*;/);
					if(a){
						cssString+=a[0];
					}
					break;
			}
		}

		css.forEach((elm)=>{
			cssString += elm;
		});

		if(numbers[0]){
			cssString += ` width:${numbers[0]}px; `
		}
		
		cssString += ` height:${numbers[1]?numbers[1]:200}px; `
		

		$(document.body).append(`

			<div 
				
				id  = "div_${divIdCount}"
				style = " 
					${cssString}
					border : 1px solid blue;	
				"

			></div>

			`);	

		return divIdCount++;
	}

	consoleDivId = div(800,"overflow:auto;");


	$(document.body).append(`

		<textarea 
			
			
			id  = "textarea_0"
			rows="12" cols="200"
			style="display:block;position :static;"

		></textarea>

		`);


	var uiPanelDivIds = [
		div(400,400,"float:left;"),
		div(400,400,"float:left;")
	];


	var fakeArgs = {};
	fakeArgs.createMap = [ /*size*/ 10 ,10  ,1 ,100 ,1 ,100  ,[ [1,1,1,1,1,1,1,1,1,1], [1,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,1], [1,1,1,1,1,1,1,1,1,1] ] /*prices*/ ,[ [100000,100000,100000,100000,100000,100000,100000,100000,100000,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,0,0,0,0,0,0,0,0,100000], [100000,100000,100000,100000,100000,100000,100000,100000,100000,100000] ] ]; 

	var plotInPanel = (elm)=>{

		var props = {};

		var funcName = elm.match(/^[a-zA-Z0-9]+/)[0];
		 
		var res = elm.match(/_[a-zA-Z0-9\-]+/g);
		
		if(res){
			res.forEach(elm=>{

				var key = elm.match(/^_([a-zA-Z0-9]+)/)[1];

				var val = elm.match(/-([a-zA-Z0-9]+)$/);
				if(!val){val = true}else{val = val[1]}

				props[key] = val;
			});	
		}	

		if(props.input) $('#div_'+uiPanelDivIds[props.panelId]).append('<input type="text" id="input_'+funcName+'"></input>');
		$('#div_'+uiPanelDivIds[props.panelId]).append('<input type="button" id="btn_'+funcName+'" value="'+funcName+'"></input><br>');
		$('#btn_'+funcName).click(()=>{
			var args = [];


			if(props.fakeArgs){
				args = fakeArgs[funcName];
			}else if(props.input){
				var got = $('#input_'+funcName).val().match(/[a-zA-Z0-9]+/g);
				if (got) {
					for(let i = 0 ; i < got.length ; i++){
						args.push(got[i]);
					}	
				}else{
					args.push("");
				}
			}


			args.push(function(res){
				show(res,funcName);
				if(props.to){
					$('#input_'+props.to).val(res);	
				}
			});
			chain_interface[funcName].apply(null,args);
		});

	}


	["createMap_panelId-0_fakeArgs_to-createGame",
	"loadMap_input_panelId-0",
	"createGame_input_panelId-0_to-joinGame",
	"joinGame_input_panelId-0",
	"startGame_panelId-0",
	"useFakePlayerAddress_input_panelId-0",
	"useRealPlayerAddress_panelId-0",
	"rollDice_panelId-1",
	"viewMap_panelId-1",
	"viewBoard_panelId-1",
	"left_input_panelId-1",
	"right_input_panelId-1",
	"up_input_panelId-1",
	"down_input_panelId-1",
	"bid_input_panelId-1",
	"sell_input_panelId-1",
	"build_input_panelId-1",
	"endTurn_panelId-1",
	"sum_panelId-1"].forEach(plotInPanel)






});