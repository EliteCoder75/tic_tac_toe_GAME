
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

        board[row][column] = this.symbol;  
        format_array(board);
    };
}

const player1 = new Player("player1", "X");
const player2 = new Player("player2", "O");


player1.play();
//player1.play();

