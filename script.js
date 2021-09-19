var child_nodes = document.querySelector('#grid').children;

var restartBtn = document.querySelector('#resetbtn');

// de terminat radio


function removeHover(index) {

    for(let i = 0; i < 9; i++) {

        if(i == index) {

            child_nodes[i].addEventListener('mouseenter', () => {

                child_nodes[i].style = "background-color: #F8F6F4;";
            });
        }
    }
}

function oppositeSymbol(symbol) {

    if(symbol == "x") {

        return "o";
    }

    else {

        return "x";
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

    const restart = () => {

        gameBoard.arr = makeEmptyArr(arr);

        gameFlow.updateStatus("");

        for(let i = 0; i < 9; i++) {

            child_nodes[i].addEventListener('mouseenter', () => {

                child_nodes[i].style = "";
            });
        }

        if(checkedRadioSymbol() == "o") {

            bot.symbol = "x";
            
            bot.makeMove();
        }

        render();
    };

    return {arr, makeEmptyArr, render, checkedRadioSymbol, restart};

})();

const gameFlow = (() => {

    const setUpRestartBtn = () => {

        restartBtn.addEventListener('click', () => {

            gameBoard.restart();
        })
    };

    const updateStatus = (string) => {

        var status_tag = document.querySelector("#status");

        status_tag.textContent = string;
    };

    const eventFunction = (index) => {

        removeHover(index);

        gameBoard.arr[index] = player.symbol;

        gameBoard.render();



        if(isOver(gameBoard.arr)) {

            if(isOver(gameBoard.arr) == "tie"){

                updateStatus("It's a tie!");
            }

            else {

                updateStatus("You won!");
            }

        }

        else {

            bot.makeMove();
        }

    };

    const addEventListeners = (child_nodes) => {

        for(let i = 0; i < 9; i++) {

            child_nodes[i].addEventListener("click", () => {

                if(gameBoard.arr[i] == null && !isOver(gameBoard.arr)) {

                    eventFunction(i);
                }
            });
        }
    }

    const addRadioListeners = () => {

        var radio_btn_x = document.querySelector("#x");

        var radio_btn_o = document.querySelector("#o");

        const onClickFunction = (radio_btn) => {

            //alert("sal")

            gameBoard.restart();

            player.symbol = radio_btn.value;

            bot.symbol = oppositeSymbol(player.symbol);

        };

        radio_btn_x.onclick = () => {

            onClickFunction(radio_btn_x);
        };

        radio_btn_o.onclick = () => {

            onClickFunction(radio_btn_o);
        };
    };

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

        gameBoard.render();

        addEventListeners(child_nodes);

        setUpRestartBtn();

        addRadioListeners();

    };

    return {start, isOver, updateStatus};
})();

const player = (() => {

    const symbol = gameBoard.checkedRadioSymbol();

    return {symbol};

})();

const bot = (() => {

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

                    setTimeout(() => {  gameBoard.render(); }, 300);

                    if(gameFlow.isOver(gameBoard.arr)) {

                        if(gameFlow.isOver(gameBoard.arr) == "tie"){
            
                            gameFlow.updateStatus("It's a tie!");
                        }
            
                        else {
            
                            gameFlow.updateStatus("You lost!");
                        }
            
                    }
                }

                k++;
            }
        }
    };

    return{symbol, makeMove};

})();

gameFlow.start();