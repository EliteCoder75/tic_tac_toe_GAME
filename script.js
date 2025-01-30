
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


const inp = document.querySelectorAll("select.inp");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const grid_container = document.querySelector(".grid_container");


function check_same_name_or_symbol (s1, s2, n1, n2){
    if (s1 == s2 || n1 == n2) {
        return true;
    }
}

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


const switch_user = ["e"];
// by default all the cells are disabled
disable_all_cells ();

function choose_and_select()
{   
    const player1 = new Player(playerName1.value, selectElement1.value);
    const player2 = new Player(playerName2.value, selectElement2.value);

    console.log(player1.name);
    console.log(player1.symbol);

    if (check1 == true && check2 == true){
        
        enable_all_cells();        
        if (inp) {
            inp.forEach((bt) => {
                bt.addEventListener("change", (event) => {
                    document.getElementById("turn").textContent ="";
                    grid_container.style.backgroundColor = '#fbd5ef';
                    bt.setAttribute("disabled", "disabled");
                    const symbol = event.target.value;
                    const coor = event.target.name;
                    let lastSymbol = switch_user[switch_user.length - 1];

                    if (symbol === lastSymbol) {
                        console.log("It's not your turn");
                        bt.removeAttribute("disabled");
                        bt.selectedIndex = -1;
                        document.getElementById("turn").textContent = "It's not your turn yet !! " + symbol; 
                        grid_container.style.backgroundColor = 'red';
                        return;
                    }
                    
                    bool = false;
                    board[coor[0]][coor[1]] = symbol;
                    bool = check_board_game(symbol);
                    if (bool == true ) {
                        if ( player1.symbol == symbol){
                            alert(player1.name + " with "+ symbol+ " wins ");
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
            
        }  }
    else { alert ("put valid names and different symbols");}    
}


function restart_game(){
    if (check1 == true && check2 == true){
    switch_user = ["e"];
    clear_all_cells();
    enable_all_cells();    
    if (inp) {
        inp.forEach((bt) => {
            bt.addEventListener("change", (event) => {
                document.getElementById("turn").textContent ="";
                grid_container.style.backgroundColor = '#fbd5ef';
                bt.setAttribute("disabled", "disabled");
                const symbol = event.target.value;
                const coor = event.target.name;
                let lastSymbol = switch_user[switch_user.length - 1];

                if (symbol === lastSymbol) {
                    console.log("It's not your turn");
                    bt.removeAttribute("disabled");
                    bt.selectedIndex = -1;
                    document.getElementById("turn").textContent = "It's not your turn yet !! " + symbol; 
                    grid_container.style.backgroundColor = 'red';
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
        
    }  }
}









/*code that I may need 
const selectElement1 = document.getElementById("choice1");
const playerName1 = document.getElementById("playerName1");
const confirm_crident1 = document.querySelector(".confirm_crident1");

const result1 = document.querySelector(".result1");

confirm_crident1.addEventListener("click", () => {
    if ( Name1.value == Name2.value || symbolchoice1.value == symbolchoice2.value ){
        console.log("change Name or Symbol of one of the two players");    
    }
    console.log(Name2.value );
    console.log(symbolchoice2.value);
    var player1 = new Player(Name1, symbolchoice1);
    
    result1.textContent = `${player1.Name1} you're choice is ${player1.symbolchoice1}`;
});

/*const selectElement2 = document.getElementById("choice2");
const playerName2 = document.getElementById("playerName2");
const confirm_crident2 = document.querySelector(".confirm_crident2");

const result2 = document.querySelector(".result2");

confirm_crident2.addEventListener("click", (event) => {

    if ( Name1.value == Name2.value || symbolchoice1.value == symbolchoice2.value ){
        console.log("change Name or Symbol of one of the two players");    
    }
    console.log(Name2.value );
    console.log(symbolchoice2.value);
    var player2 = new Player(Name2, symbolchoice2);
    
    result1.textContent = `${player2.Name2} you're choice is ${player2.symbolchoice2}`;
});*/














