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

    var turn;

    return {turn};
})();

const player = () => {

    const makeMove = () => {

        //dab
    };

    return (makeMove);
};

gameBoard.arr = ["0", "X", null, null, null, null, null, null, "0"];

gameBoard.render();


