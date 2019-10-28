// html elements
let gameElements = document.querySelectorAll('.game__bubble');
let gameContainer = document.querySelector('.container');
let gameScore = document.querySelector('.game__menu__score .score__counter');
let timeCounter = document.querySelector('.game__menu__score .time__counter');
let totalScore = document.querySelector('.total__score');
let counter = 0;
//bubblesArray = [];

// defining border of container which bubbles can't cross
let width = gameContainer.offsetWidth;
let height = gameContainer.offsetHeight;
// console.log(height);
// console.log(width);

// funcja tworząca bombelki

function Bubble(x,y){
    this.x = x;
    this.y = y;
}
/*
Bubble.prototype.typeOfBubble = function () {
    let typeOfBubble = Math.floor(Math.random()*3);
    console.log(typeOfBubble);
    if(typeOfBubble === 0) {
        this.classList.add('game__bubble--small');
    }else if(typeOfBubble === 1) {
        this.classList.add('game__bubble--medium');
    }else {
        this.classList.add('game__bubble--big');
    }*/
// initial bubble
// let x = Math.random() * (width - 150);
// let y = Math.random() * (height - 150);
// bubblesArray.push(new Bublle(x, y));

function TrueFalseCheck(a,b){
    this.a = a;
    this.b = b;
}

//losowanie współrzędnych bąbla
function bubblesCheck(width, height) {
    let tempArr = [];
    bubblesArray = [];
    while (bubblesArray.length < 10) {
        x = Math.random() * (width - 150);
        //console.log(x);
        y = Math.random() * (height - 150);
        //console.log(y);
        let nextBubble = new Bubble(x,y);
        for(let i = 0; i < bubblesArray.length; i++) {
            let a = Boolean(Math.abs(bubblesArray[i].x - nextBubble.x) > 150);
            let b = Boolean(Math.abs(bubblesArray[i].y - nextBubble.y) > 150);
            tempArr.push(new TrueFalseCheck(a,b));
        }
        if(tempArr.some(function(elem) {
            return (elem.a === false && elem.b === false)
        })) {
            tempArr = [];
        } else {
            bubblesArray.push(nextBubble);
            tempArr = [];
        }
        bubblesArray.length;
    }
    //console.log(bubblesArray);
    return bubblesArray;
}

// console.log(randomX(width));
//console.log(bubblesCheck(width,height));

//losowanie początkowego położenia oraz koloru
bubblesCheck(width,height);
gameElements.forEach(function(element, index) {
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    element.style.left = bubblesArray[index].x + 'px';
    element.style.top = bubblesArray[index].y + 'px';
    element.style.backgroundColor = randomColor;
});

// gameElements.forEach(function (bubble,index) {
//     console.log(bubble.offsetLeft,index);
//     // console.log(bubble.offsetTop,index);
// })


// function which in interval changes position and color of bubbles
let timeInterval = setInterval(function(){
    bubblesCheck(width,height);
    //console.log(gameElements);
    gameElements.forEach(function(element, index) {
        let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        element.style.left = bubblesArray[index].x + 'px';
        element.style.top = bubblesArray[index].y + 'px';
        element.style.backgroundColor = randomColor;
    })
},1000);

// clearInterval(timeInterval);

// time counter, conditions to stop time counter, remove eventListeners when timer stops and count total score

let timeCounterInterval = setInterval(function(){
    timeCounter.innerText++;

    if(counter == 10){
        clearInterval(timeCounterInterval);
        clearInterval(timeInterval);
        gameElements.forEach(function(element) {
            element.removeEventListener('click', gameElementClick)
        });
        gameContainer.removeEventListener('click', gameContainerClick);
        //totalScore.innerText = Number(gameScore.innerText) + Number(timeCounter.innerText);
    }
},1000)

// clearInterval(timeInterval);

// adding eventListener for bubbles
gameElements.forEach(function(element){
    element.addEventListener('click', gameElementClick)
})

//adding eventListener fo game container (- poits)
gameContainer.addEventListener('click', gameContainerClick)

//function handler for bubble eventListener
function gameElementClick(e) {
    e.stopPropagation();
    gameScore.innerText++;
    this.style.display = 'none';
    counter++;
    return counter;
}

//function handler for gameContainer eventListener
function gameContainerClick(e) {
    gameScore.innerText--;
}

