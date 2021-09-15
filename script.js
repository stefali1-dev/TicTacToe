var child_nodes = document.querySelector('#table').children;

const gameBoard = (() => {

    var arr = [];

    const makeEmptyArr = (arr) => {

        for(let i = 0; i < 9; i++) {

            arr[i] = null;
        }

        return arr;
    };

    const render = () => {

        for(let i = 0; i < 9; i++) {

            child_nodes[i].textContent = gameBoard.arr[i];
        }
    };

    return {arr, makeEmptyArr, render};

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

    const eventFunction = (square) => {

        for(let i = 0; i < 9; i++) {

            // daca nu a mai fost apasat
            if(square === child_nodes[i] && gameBoard.arr[i] == null) {

                // removing :hover effect
                square.addEventListener('mouseenter', () => {

                    square.style = "background-color: #F9F9F9;";
                });
        
                // updating arr
                gameBoard.arr[i] = turn;
        
                gameBoard.render();
        
                switchTurns();

                console.log(isOver(gameBoard.arr));
            }
        }
    };

    const addEventListeners = (child_nodes) => {

        for(let i = 0; i < 9; i++) {

            child_nodes[i].addEventListener("click", () => eventFunction(child_nodes[i]));
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

        // dab
        addEventListeners(child_nodes);

    };

    return {start, isOver};
})();

const player = () => {

    const makeMove = () => {

        //dab
    };

};

gameBoard.arr = [null, null, null, null, null, null, null, null, null];



gameBoard.render();

gameFlow.start();


