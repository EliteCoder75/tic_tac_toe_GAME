const game = {
    status: "base"
}

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
    this.now = function (){
        console.log("hello")
    } 
}

// function that allows to select a cell
function choose_cell (){
    const cell_input = window.prompt("enter a valid cell in the gameboeard matrix");
    console.log(cell_input);
    const row = (''+cell_input)[0];
    const column = (''+cell_input)[1];
    return [row, column];
}

const selected_cases = [];


//function that allow the user to play one shot
function play (Symbol) { 
    let n = 0; 
    let row_column = choose_cell();
    let el = (row_column[0]+""+row_column[1])
    console.log(el);
    while ( selected_cases.includes(el)){
        console.log ("choose another cell");
        row_column = choose_cell();
        el = (row_column[0]+""+row_column[1]);
    }

    if (!selected_cases.includes(el)) {
        board[row_column[0]][row_column[1]] = Symbol;
        format_array(board);
        selected_cases.push(el);
        console.log(selected_cases);
    }  
}



/* the winner needs to satisfy one of the three conditions one complete column or row or diagonal of same symbols
    it will be either having a fixed row and incrementing number in columns -> eg : [0,1] [0,2] [0,3]
    or an incrementing row and a fixed number in columns
    or a fixed diagonal of the same symbols
*/
function check_board_game (playerSymbol) {
    fixed_row_inc_column(playerSymbol);
    inc_row_fixed_column(playerSymbol);
    inc_row_inc_column(playerSymbol);
}


function fixed_row_inc_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[0][1] == playerSymbol && board[0][2] == playerSymbol ){
        bool = true;
        console.log(playerSymbol +" wins");
        return bool;
        }   
    if (board[1][0] == playerSymbol && board[1][1] == playerSymbol && board[1][2] == playerSymbol ){
        bool = true;
        console.log(playerSymbol +" wins");
        return bool;}  
    if (board[2][0] == playerSymbol && board[2][1] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        console.log(playerSymbol +" wins");
        return bool;}  
}

function inc_row_fixed_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[1][0] == playerSymbol && board[2][0] == playerSymbol ){
        bool = true;
        console.log(playerSymbol +" wins");
        return bool;}   
    if (board[0][1] == playerSymbol && board[1][1] == playerSymbol && board[2][1] == playerSymbol ){
        bool = true;
        console.log(playerSymbol +" wins");
        return bool;}  
    if (board[0][2] == playerSymbol && board[1][2] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        console.log(playerSymbol +" wins");
        return bool;}  
}

function inc_row_inc_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[1][1] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        console.log(playerSymbol +" wins");
        return bool;}    
}

const player1 = new Player("player1", "X");
const player2 = new Player("player2", "O");


//player1.play();
bool = false;
while(!bool){
    play(player1.symbol);
    check_board_game(player1.symbol);
    play(player2.symbol);
    check_board_game(player2.symbol);
}





