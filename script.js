var child_nodes = document.querySelector('#table').children;

// de terminat radio, isOver(), reset btn ...

function removeHover(index) {

    for(let i = 0; i < 9; i++) {

        if(i == index) {

            child_nodes[i].addEventListener('mouseenter', () => {

                child_nodes[i].style = "background-color: #F8F6F4;";
            });
        }
    }
}

const gameBoard = (() => {

    const makeEmptyArr = (arr) => {
        arr = [];
        for(let i = 0; i < 9; i++) {

            arr.push(null);
        }

        return arr;
    };

    var arr = makeEmptyArr(arr);

    const render = () => {

        for(let i = 0; i < 9; i++) {

            child_nodes[i].textContent = gameBoard.arr[i];
        }
    };

    const checkedRadioSymbol = () => {

        const xRadioBtn = document.querySelector('#x');

        if(xRadioBtn.checked){

            return "x";
        }

        else {

            return "o";
        }
    }

    return {arr, makeEmptyArr, render, checkedRadioSymbol};

})();

const gameFlow = (() => {

    var turn = "X";

    const switchTurns = () => {

        if(turn == "X") {

            turn = "O";
        }

        else {

            turn = "X";
        }
    };

    const updateStatus = (string) => {

        var status_tag = document.querySelector("#status");

        status_tag.textContent = string;
    };

    const eventFunction = (index) => {

        removeHover(index);

        gameBoard.arr[index] = player.symbol;

        gameBoard.render();

        console.log(isOver(gameBoard.arr));

        bot.makeMove();

    };

    const addEventListeners = (child_nodes) => {

        for(let i = 0; i < 9; i++) {

            child_nodes[i].addEventListener("click", () => {

                if(gameBoard.arr[i] == null) {

                    eventFunction(i);
                }
            });
        }
    }

    const isOver = (arr) => {

        // linii si coloane
        for(let i = 0; i < 3; i++){

            if(arr[i*3] == arr[i*3 + 1] && arr[i*3] == arr[i*3 + 2] && arr[i*3]) {

                return true;
            }
            
            if(arr[i] == arr[i + 3] && arr[i] == arr[i + 6] && arr[i]) {

                return true;
            }
        }

        // diagonale
        if((arr[0] && arr[0] == arr[4] && arr[0] == arr[8]) ||
         (arr[2] && arr[2] == arr[4] && arr[2] == arr[6])) {

            return true;
        }

        if(!arr.includes(null)) {

            return "tie";
        }

        return false;
    };

    const start = () => {

        gameBoard.makeEmptyArr();

        gameBoard.render();

        addEventListeners(child_nodes);

    };

    return {start, isOver};
})();

const player = (() => {

    const symbol = gameBoard.checkedRadioSymbol();

    return {symbol};

})();

const bot = (() => {

    function oppositeSymbol(symbol) {
        if(symbol == "x") {
    
            return "o";
        }
    
        else {
    
            return "x";
        }
    }

    var symbol = oppositeSymbol(player.symbol);

    const makeMove = () => {

        let null_elements = gameBoard.arr.filter(x => x == null).length;

        let random_int = Math.floor(Math.random() * null_elements);

        let k = 0;

        for(let i = 0; i < 9; i++){

            if(gameBoard.arr[i] == null){

                if(random_int == k){

                    removeHover(i);

                    gameBoard.arr[i] = bot.symbol;

                    setTimeout(() => {  gameBoard.render(); }, 600);

                    console.log(gameFlow.isOver(gameBoard.arr));
                }

                k++;
            }
        }
    };

    return{symbol, makeMove};

})();

gameFlow.start();


