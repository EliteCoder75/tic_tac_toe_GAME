
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

//m[2][4] = 8;  // last row, last column


function Player (name, symbol){
    this.name = name;
    this.symbol = symbol;
    this.now = function (){
        console.log("hello")
    }
    this.play = function () {
        var cell_input  = window.prompt("enter a valid cell in the gameboeard matrix");
        console.log(cell_input);
        var row = (''+cell_input)[0];
        var column = (''+cell_input)[1];
        if (board[row][column] != "X" || board[row][column] != "O" ) {
            board[row][column] = this.symbol;
        } else {
            console.log ("choose another cell");
        }
        format_array(board);
    };
}

/*function choose_cell (){
    var cell_input  = window.prompt("enter a valid cell in the gameboeard matrix");
    console.log(cell_input);
    var row = (''+cell_input)[0];
    var column = (''+cell_input)[1];
    return row, column;
}*/

function check_board_game (playerSymbol) {
    fixed_row_inc_column(playerSymbol);
    inc_row_fixed_column(playerSymbol);
    inc_row_inc_column(playerSymbol);
}

function fixed_row_inc_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[0][1] == playerSymbol && board[0][2] == playerSymbol ){
        bool = true;
        return bool;
        console.log("win");}   
    if (board[1][0] == playerSymbol && board[1][1] == playerSymbol && board[1][2] == playerSymbol ){
        bool = true;
        console.log("win");
        return bool;}  
    if (board[2][0] == playerSymbol && board[2][1] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        console.log("win");
        return bool;}  
}

function inc_row_fixed_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[1][0] == playerSymbol && board[2][0] == playerSymbol ){
        bool = true;
        console.log("win");
        return bool;}   
    if (board[0][1] == playerSymbol && board[1][1] == playerSymbol && board[2][1] == playerSymbol ){
        bool = true;
        console.log("win");
        return bool;}  
    if (board[0][2] == playerSymbol && board[1][2] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        console.log("win");
        return bool;}  
}

function inc_row_inc_column (playerSymbol){
    let bool = false;
    if (board[0][0] == playerSymbol && board[1][1] == playerSymbol && board[2][2] == playerSymbol ){
        bool = true;
        console.log("win");
        return bool;}    
}

const player1 = new Player("player1", "X");
const player2 = new Player("player2", "O");


//player1.play();
bool = false;
while(!bool){
    player1.play();
    check_board_game(player1.symbol);
    player2.play();
    check_board_game(player2.symbol);
}





