     
if( typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
}else{
    web3 = new Web3(Web3.providers.HttpProvider());
}
var account0 = web3.eth.accounts[0];

$(document).ready(function(){

    $(document.body).append('<div id="consoleDiv" ></div>');
    $(document.body).append('<div id="uiDiv"></div>');
    
    function appendConsoleDiv(s){
        $('#consoleDiv').append('<h4>'+s+'</h4>');
    }    


    $('#uiDiv').append('<br><input type="button" id="btn_createMap" value="CreateMap"></input>')
    $('#btn_createMap').click(function(){

        w3.createMap(

            //size
            10
            
            //walls
            ,[
                [1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1]
            ]

            //prices
            ,[
                [100000,100000,100000,100000,100000,100000,100000,100000,100000,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,0,0,0,0,0,0,0,0,100000],
                [100000,100000,100000,100000,100000,100000,100000,100000,100000,100000]   
            ]

            ,1
            ,100
            ,1
            ,100

            //callback
            ,function(res){
                appendConsoleDiv('mapCreated : ' + res);
            }
        );                 
    });

    $('#uiDiv').append('<br><input type="text" id="input_gameaddr"></input>');
    $('#uiDiv').append('<br><input type="button" id="btn_joinGame" value="Join"></input>');
    $('#btn_joinGame').click(function(){

        w3.joinGame(

            //address
            $("#input_gameaddr").val()   

            //callback
            ,function(res){
                appendConsoleDiv('joined Game : ' + res);
            });

    });


    $('#uiDiv').append('<br><input type="text" id="text_mapid"></input>');
    $('#uiDiv').append('<br><input type="button" id="btn_createGame" value="CreateGame"></input>');
    $('#btn_createGame').click(function(){

        console.log("btn_createGame clicked ..")

        w3.createGame(
            $('#text_mapid').val()
            ,function(res){
                appendConsoleDiv('gameCreated : ' + res);
            }
        );

    });


    $('#uiDiv').append('<br><input type="text" id="input_action"></input>');
    $('#uiDiv').append('<br><input type="button" id="btn_action" value="Action"></input>');
    $('#btn_action').click(function(){

        w3.action(
            0
            ,function(res){
                appendConsoleDiv('action confirmed : ' + res);
            }
        );

    });


    $('#uiDiv').append('<br><input type="button" id="btn_roll"></input>');
    $('#btn_roll').click(function(){

        w3.roll(
            function(res){
                appendConsoleDiv('rolled dice got : ' + res);
            }
        );

    });

});