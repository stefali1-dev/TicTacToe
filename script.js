var child_nodes = document.querySelector('#container').children;

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
            }
        }
    };

    const addEventListeners = (child_nodes) => {

        for(let i = 0; i < 9; i++) {

            child_nodes[i].addEventListener("click", () => eventFunction(child_nodes[i]));
        }
    }

    const start = () => {

        // dab
        addEventListeners(child_nodes);

    };

    return {start};
})();

const player = () => {

    const makeMove = () => {

        //dab
    };

};

gameBoard.arr = [null, null, null, null, null, null, null, null, null];

gameBoard.render();

gameFlow.start();


