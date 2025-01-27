
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
    or a fixed diagonal of the same symbols
*/

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
function choose_and_select (){
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
                if (bool == true) {
                    alert(symbol+ " wins ");
                }
            });
        });  
        
    }  
}

choose_and_select();













