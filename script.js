
const GameBoard = 
    () => [...Array(3)].map(_=>Array(3).fill("e"));  

var board = GameBoard();    


// print formated array
function format_array (m) {
    console.log(JSON.stringify(m).replace(/(\[\[)(.*)(\]\])/g,'[\n  [$2]\n]').replace(/],/g,'],\n  '));
}

format_array(board);    

function Player (name, symbol){
    this.name = name;
    this.symbol = symbol;
}

function play (Symbol, coord) { 
    console.log(coord);
    board[row_column[0]][row_column[1]] = Symbol;
    format_array(board);         
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


const player1 = new Player("player1", "X");
const player2 = new Player("player2", "O");

const inp = document.querySelectorAll("select.inp");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const grid_container = document.querySelector(".grid_container");


//make start_game button
start.addEventListener("click", choose_and_select);
console.log(start); 


restart.addEventListener("click", restart_game);



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

//restart.addEventListener("click", replay_game());
//by default all the select cells are deactivated until we start the game

const switch_user = ["e"];

disable_all_cells ();

function choose_and_select(){

    console.log("i'm here");
    enable_all_cells();
    console.log("also here");
    
    if (inp) {
        inp.forEach((bt) => {
            bt.addEventListener("change", (event) => {
                bt.setAttribute("disabled", "disabled");
                const symbol = event.target.value;
                const coor = event.target.name;
                let lastSymbol = switch_user[switch_user.length - 1];

                if (symbol === lastSymbol) {
                    console.log("It's not your turn");
                    bt.removeAttribute("disabled");
                    bt.selectedIndex = -1;
                    document.getElementById("turn").textContent = "It's not your turn" + symbol; 
                    return;
                }
                
                bool = false;
                board[coor[0]][coor[1]] = symbol;
                bool = check_board_game(symbol);
                //format_array(board);
                if (bool == true ) {
                    if ( player1.symbol == symbol){
                        alert(player1.name + "with "+ symbol+ " wins ");
                        document.getElementById("result").textContent = player1.name + "with "+ symbol+ " wins "; 
                        clear_all_cells();
                        disable_all_cells();   
                    }
                    else {
                        alert(player2.name + " with "+ symbol+ " wins ");
                        document.getElementById("result").textContent = player2.name + "with "+ symbol+ " wins "; 
                        clear_all_cells();
                        disable_all_cells(); 
                    }
                }
            
                switch_user.push(symbol);

                console.log(switch_user);
            });
        });  
        
    }  
}


function restart_game(){

    clear_all_cells();
    enable_all_cells();
    console.log();
    
    if (inp) {
        inp.forEach((bt) => {
            bt.addEventListener("change", (event) => {
                bt.setAttribute("disabled", "disabled");
                
                const symbol = event.target.value;
                const coor = event.target.name;
                bool = false;
                board[coor[0]][coor[1]] = symbol;
                bool = check_board_game(symbol);
                format_array(board);
                if (bool == true ) {
                    if ( player1.symbol == symbol){
                        alert("player 1 with "+ symbol+ " wins ");
                        clear_all_cells();
                        disable_all_cells();
                        
                    }
                    else {
                        alert("player 2 with "+ symbol+ " wins ");
                        clear_all_cells();
                        disable_all_cells();                        
                    }
                }
            });
        });  
        
    }  
}


const selectElement1 = document.getElementById("choice1");
const playerName1 = document.getElementById("playerName1");
const confirm_crident1 = document.querySelector(".confirm_crident1");

const result1 = document.querySelector(".result1");

confirm_crident1.addEventListener("click", (event) => {
  console.log(selectElement1.value);
  console.log(playerName1.value);
  result1.textContent = `${playerName1.value} you're choice is ${selectElement1.value}`;
});

const selectElement2 = document.getElementById("choice2");
const playerName2 = document.getElementById("playerName2");
const confirm_crident2 = document.querySelector(".confirm_crident2");

const result2 = document.querySelector(".result2");

confirm_crident2.addEventListener("click", (event) => {
  console.log(selectElement2.value);
  console.log(playerName2.value);
  result2.textContent = `${playerName2.value} you're choice is ${selectElement2.value}`;
});

















