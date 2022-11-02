const X_CLASS = 'x' //Get CSS:x
const O_CLASS = 'o' //Get CSS:o
const WINNING_COMBINATIONS = [
    [0,1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton=document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage') //for div ID
const winningMessageText = document.querySelector('[data-winning-text]') //for div DATA
let oTurn

let setBoardHover = () => {  //set function first before being called
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

let startGame = () => {
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS) //clear cell after restart
        cell.classList.remove(O_CLASS) //same here
        cell.removeEventListener('click', handleClick) //clear event in console
        cell.addEventListener('click', handleClick, {once:true}) //click event once per cell
    })
    setBoardHover()  //function being called, need to set function first. initialization error will shot on log
    winningMessageElement.classList.remove('show')
}

let endGame = (draw) => {
    if (draw) {
        winningMessageText.innerText='Draw!'
    } else {
        winningMessageText.innerText=`${oTurn?"O's": "X's"} Wins!`  //Output end of game
    }
    winningMessageElement.classList.add('show')
}

let isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS) //cells filled but no winner
    })
}

startGame()

restartButton.addEventListener('click', startGame)

function handleClick(e) { //handleClick(eventlistener), e=eventlistener
    const cell= e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS //if oTurn{return O_CLASS}else{X_CLASS}
    //placeMark
    placeMark(cell, currentClass)
    //check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()){  //check for draw
        endGame(true)
    } else { //switch turns
        swapTurns()
        setBoardHover()
    }
}

let placeMark = (cell, currentClass) => { //placing on cell
    cell.classList.add(currentClass)
}

let swapTurns = () => {
    console.log('test')
    oTurn=!oTurn
}

let checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {  //return true if combination is met
        return combination.every(index => {  //every element(cell) has the same class(x/o)
            return cellElements[index].classList.contains(currentClass)  //currentClass(x/o) are inside elements(cell)
        })
    })
}