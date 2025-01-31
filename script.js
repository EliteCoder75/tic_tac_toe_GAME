
const GameBoard = 
    () => [...Array(3)].map(_=>Array(3).fill("e"));  

var board = GameBoard();    

// print formated array
function format_array (m) {
    console.log(JSON.stringify(m).replace(/(\[\[)(.*)(\]\])/g,'[\n  [$2]\n]').replace(/],/g,'],\n  '));
}

//difine player constructur to initialize name and symbol
function Player (name, symbol){
    this.name = name;
    this.symbol = symbol;
}

/* the winner needs to satisfy one of the three conditions one complete column or row or diagonal of same symbols
    it will be either having a fixed row and incrementing number in columns -> eg : [0,1] [0,2] [0,3]
    or an incrementing row and a fixed number in columns
    or a fixed diagonal of the same symbols */
function check_board_game (playerSymbol) {

    let bool = false;
    let check1 = fixed_row_inc_column(playerSymbol);
    let check2 = inc_row_fixed_column(playerSymbol);
    let check3 = inc_row_inc_column(playerSymbol);

    if (check1==true || check2==true || check3==true ){
        console.log(playerSymbol + " winwins");
        bool = true;
    }
    return bool;
}   

function fixed_row_inc_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[0][1] == playerSymbol && board[0][2] == playerSymbol ){
        bool = true;
        return bool;
        }   
    if (board[1][0] == playerSymbol && board[1][1] == playerSymbol && board[1][2] == playerSymbol ){
        bool = true;
        return bool;}  
    if (board[2][0] == playerSymbol && board[2][1] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        return bool;}  
}

function inc_row_fixed_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[1][0] == playerSymbol && board[2][0] == playerSymbol ){
        bool = true;
        return bool;}   
    if (board[0][1] == playerSymbol && board[1][1] == playerSymbol && board[2][1] == playerSymbol ){
        bool = true;
        return bool;}  
    if (board[0][2] == playerSymbol && board[1][2] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        return bool;}  
}

function inc_row_inc_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[1][1] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        return bool;}    
}


const inp = document.querySelectorAll("select.inp");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const grid_container = document.querySelector(".grid_container");


////// selection of the players name and choice
const selectElement1 = document.getElementById("choice1");
const playerName1 = document.getElementById("playerName1");
const confirm_crident1 = document.querySelector(".confirm_crident1");
const selectElement2 = document.getElementById("choice2");
const playerName2 = document.getElementById("playerName2");
const confirm_crident2 = document.querySelector(".confirm_crident2");

const name1_result = document.querySelector(".name1_result");
const symbol1_result = document.querySelector(".symbol1_result");

const name2_result = document.querySelector(".name2_result");
const symbol2_result = document.querySelector(".symbol2_result");
const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");


let check1 = false;

confirm_crident1.addEventListener("click", () => {
    let check = true;
    console.log(selectElement2);
    if (playerName1.value == ""){
        name1_result.style.color = "red";
        name1_result.textContent = "name must be filled out" ;
        //alert ("name must be filled out");
    } else if (selectElement1.value == "") {
        symbol1_result.style.color = "red";
        symbol1_result.textContent = "symbol cannot be empty" ;
    }
    else if (selectElement1.value == selectElement2.value) {
        console.log("same symbol choosed");
    }
    else if (playerName1.value == playerName2.value){
        console.log("same name");
    }
    else {
        name1_result.textContent = "";
        symbol1_result.textContent = "";
        console.log("alles gut");
        check1 = true;
        message1.textContent = "";
    }
});


let check2 = false;
confirm_crident2.addEventListener("click", () => {
    
    //console.log(selectElement2);
    if (playerName2.value == ""){
        name2_result.style.color = "red";
        name2_result.textContent = "name must be filled out" ;
        //alert ("name must be filled out");
    } else if (selectElement2.value == "") {
        symbol2_result.style.color = "red";
        symbol2_result.textContent = "symbol cannot be empty" ;
    }
    else if (selectElement1.value == selectElement2.value) {
        alert("same symbol choosed");
    }
    else if (playerName1.value == playerName2.value){
        alert("same name");
    }
    else {
        name1_result.textContent = "";
        symbol1_result.textContent = "";
        console.log("alles gut");
        check2 = true;
        message2.textContent = "";
    }
});






function enable_all_cells (){
    if (inp) {
        inp.forEach((bt) => {
            bt.removeAttribute("disabled");
        });
}}

function disable_all_cells (){
    if (inp) {
        inp.forEach((bt) => {
            bt.setAttribute("disabled", "disabled");
        });
}}

function clear_all_cells (){
    if (inp) {
        inp.forEach((bt) => {
            bt.selectedIndex = -1;
        });
}}

function variable_generator(){
    return "random_var"+Math.random() ;
}

const empty_board = function check_board_empty (){
    let bool = true;
    for (let i=0; i<3; i++){
        for (let j=0; i<3; i++){
            if (board[0][1]!="e") {
                bool = false;
                console.log (bool);
                return bool; 
            }
        }
    }
}

const replay = function restart_game(){
    
    clear_all_cells();
    disable_all_cells();
    start.removeAttribute("disabled"); 
    document.getElementById("result").textContent = ""; 
    
}


//make start_game button
start.addEventListener("click", choose_and_select);

restart.addEventListener("click", replay);

//var last_sym = "e";
// by default all the cells are disabled
disable_all_cells ();




function choose_and_select()
{   
    clear_all_cells();
    //empty_board();
    var player1 = new Player(playerName1.value, selectElement1.value);
    var player2 = new Player(playerName2.value, selectElement2.value);
    if (check1 == true && check2 == true){
        start.setAttribute("disabled", "disabled");
        let switch_user = ["e"];
        console.log(switch_user);

        enable_all_cells();        
        if (inp) {
            inp.forEach((bt) => {
                bt.addEventListener("change", (event) => {
                    console.log("start");
                    console.log(switch_user);
                    let y = empty_board();
                    if (y) {
                        switch_user = ["e"];
                        board = GameBoard();
                    }
                    //check if selected and it is empty
                    document.getElementById("turn").textContent ="";
                    grid_container.style.backgroundColor = '#fbd5ef';
                    let symbol = event.target.value;
                    let coor = event.target.name;
                    let lastSymbol = switch_user[switch_user.length - 1];
                    
                    if (symbol === lastSymbol) {  
                        console.log(lastSymbol);
                        console.log("symbol "+symbol);
                        console.log("It's not your turn" + symbol);
                        bt.removeAttribute("disabled");
                        bt.selectedIndex = -1;
                        document.getElementById("turn").textContent = "It's not your turn yet !! " + symbol; 
                        grid_container.style.backgroundColor = 'red';
                        var skipRest = true;
                        return;
                    }

                    if (!skipRest) {

                        let bool = false;
                        board[coor[0]][coor[1]] = symbol;
                        bool = check_board_game(symbol);
                        if (bool == true ) {
                            if ( player1.symbol == symbol){
                                alert(player1.name + " with "+ symbol+ " wins ");
                                document.getElementById("result").textContent = "the player "+player1.name + " with "+ symbol+ " wins "; 
                                clear_all_cells();
                                disable_all_cells();
                                start.removeAttribute("disabled");
                                board = GameBoard();
                                //last_sym = 'e';
                                switch_user = ["e"];
                                replay();
                            }
                            else {
                                alert(player2.name + " with "+ symbol+ " wins ");
                                document.getElementById("result").textContent = "the player "+player2.name + " with "+ symbol+ " wins "; 
                                clear_all_cells();
                                disable_all_cells();
                                start.removeAttribute("disabled");
                                board = GameBoard();
                                switch_user = ["e"];
                                replay();
                            }
                        } else {
                            if (symbol != ""){switch_user.push(symbol);}
                            
                            console.log("end");
                            console.log(switch_user);
                            console.log("inside");
                        }
                        
                        }
                });
            });  
            
        }  }
    else { alert ("put valid names and different symbols");}    
}















