let gameElements = document.querySelectorAll('.game__element');
let gameContainer = document.querySelector('.game.container');
let gameScore = document.querySelector('.game__score .score__counter');
let timeCounter = document.querySelector('.game__score .time__counter');
let totalScore = document.querySelector('.total__score');
// console.log(timeCounter);
let counter = 0;

let width = gameContainer.offsetWidth;
let height = gameContainer.offsetHeight;
// console.log(height);
// console.log(width);

let timeInterval = setInterval(function(){
    // let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    gameElements.forEach(function(element){
        let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        element.style.top = Math.random() * (height - 100) +'px';
        element.style.left = Math.random() * (width -100) +'px';
        element.style.backgroundColor = randomColor;
       })
},1000);

let timeCounterInterval = setInterval(function(){
    timeCounter.innerText--;

    if(timeCounter.innerText == '0' || counter == 5){
        clearInterval(timeCounterInterval);
        clearInterval(timeInterval);
        gameElements.forEach(function(element) {
            element.removeEventListener('click', gameElementClick)
        });
        gameContainer.removeEventListener('click', gameContainerClick);
        totalScore.innerText = Number(gameScore.innerText) + Number(timeCounter.innerText);
    }
},1000)



// clearInterval(timeInterval);

gameElements.forEach(function(element){
    element.addEventListener('click', gameElementClick)
})

gameContainer.addEventListener('click', gameContainerClick)

function gameElementClick(e) {
    e.stopPropagation();
    gameScore.innerText++;
    this.style.display = 'none';
    counter++;
    return counter;
}

function gameContainerClick(e) {
    gameScore.innerText--;
}

