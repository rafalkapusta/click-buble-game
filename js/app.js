// html elements
let gameContainer = document.querySelector('.container');
let gameScore = document.querySelector('.game__menu__score .score__counter');
let timeCounter = document.querySelector('.game__menu__score .time__counter');
let gameMenu = document.querySelector('.game__menu');
let FindButton = document.querySelector('.blinking');
let start = document.querySelector('#start');
let bubblesArray = [];
//let playerName = document.querySelector('.playerName');

// defining border of container which bubbles can't cross
let width = gameContainer.offsetWidth;
let height = gameContainer.offsetHeight;

let numOfBubbles = Math.floor(width/150);
/*//Player name variables
let playerNameInput = document.querySelector('#form__playerName--input');
let addPlayerButton = document.querySelector('#form__playerName--btn--plus');
let playerNameForm = document.querySelector('.form__playerName');
let playerName = document.querySelector('.playerName');

function localStorageCheck() {
    if(localStorage.playerName) {
        playerNameForm.style.display = "none";
        playerName.style.display = "flex";
        playerName.querySelector('p').innerText = localStorage.getItem('playerName');
    }
}

localStorageCheck();*/
// bubbles constructor function

function Bubble(x,y){
    this.x = x;
    this.y = y;
}

// prototype function drawing bubble type (size)
Bubble.prototype.type = function type() {
    let type = Math.floor(Math.random() * 3);
    if (type === 0) {
        return this.type = 'game__bubble--small';
    } else if (type === 1) {
        return this.type = 'game__bubble--medium';
    } else {
        return this.type = 'game__bubble--big';
    }
};

// prototype function drawing bubble color

Bubble.prototype.color = function color() {
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    return this.color = randomColor;
};

// object needed to keep true or false returned from bubbleCheck function
function TrueFalseCheck(a,b,c){
    this.a = a;
    this.b = b;
    this.c = c;
}

//drawing bubble position. bubbles can't be positioned one on top another
function bubbleCheck(width, height) {
    let tempArr = [];
    bubblesArray = [];
    while (bubblesArray.length < numOfBubbles) {
        // 150 is width and height of the largest bubble
        x = Math.random() * (width - 150);
        y = Math.random() * (height - 150);
        let nextBubble = new Bubble(x,y);
        nextBubble.type();
        nextBubble.color();
        for(let i = 0; i < bubblesArray.length; i++) {
            let a = Boolean(Math.abs(bubblesArray[i].x - nextBubble.x) > 150);
            let b = Boolean(Math.abs(bubblesArray[i].y - nextBubble.y) > 150);
            let c = Boolean(parseInt(bubblesArray[i].color) - parseInt(nextBubble.color));
            tempArr.push(new TrueFalseCheck(a,b,c));
        }
        if(tempArr.some(function(elem) {
            return (elem.a === false && elem.b === false && elem.c === false)
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

//creating bubbles in HTML
function createBubbles(arr) {
    for(let i = 0; i < arr.length; i++){
        let div = document.createElement('div');
        div.classList.add('game__bubble');
        div.classList.add(arr[i].type);
        gameContainer.appendChild(div);
    }
}
createBubbles(bubbleCheck(width,height));

//selecting all created bubbles
let gameElements = document.querySelectorAll('.game__bubble');

gameElements.forEach(function(elem) {
   elem.style.visibility = 'hidden';
   elem.style.opacity = '0';
});

start.addEventListener('click', function (e) {
    gameElements.forEach(function(elem) {
        elem.style.visibility = 'visible';
        elem.style.opacity = '1';
    });
    gameScore.innerText++;
    setInterval(timeCounterInterval,1000);
    start.style.visibility='hidden';
    gameContainer.addEventListener('click', gameContainerClick);
    FindButton.style.display = 'none';
    gameMenu.style.justifyContent = 'flex-end';
});

//drawing bubbles initial color
gameElements.forEach(function(element, index) {
    element.style.backgroundColor = bubblesArray[index].color;
});

// changing bubbles position and color every second
let timeInterval = setInterval(function(){
    bubbleCheck(width,height);
    //console.log(gameElements);
    gameElements.forEach(function(element, index) {
        //let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        element.style.left = bubblesArray[index].x + 'px';
        element.style.top = bubblesArray[index].y + 'px';
        //element.style.backgroundColor = bubblesArray[index].color;
    })
},1000);

// time count, game stops after 60 seconds
function timeCounterInterval() {
    timeCounter.innerText++;

    if (timeCounter.innerText === '60') {
        gameElements.forEach(function (element) {
            element.removeEventListener('click', gameElementClick);
            element.style.opacity = '0';
        });
        gameContainer.removeEventListener('click', gameContainerClick);
        clearInterval(timeInterval);
        clearInterval(timeCounterInterval);
        alert('Game Over! Your score is ' + gameScore.innerText);
    }
}

//function handler for bubble eventListener
function gameElementClick(e) {
    e.stopPropagation();
    let score = 0;
    if(this.classList[1] === 'game__bubble--small') {
        score += 3;
        gameScore.innerText = (parseInt(gameScore.innerText) + score).toString();
    }else if(this.classList[1] === 'game__bubble--medium'){
        score += 2;
        gameScore.innerText = (parseInt(gameScore.innerText) + score).toString();
    }else {
        score += 1;
        gameScore.innerText = (parseInt(gameScore.innerText) + score).toString();
    }
    this.classList.remove(this.classList[1]);
    this.classList.add(bubblesArray[0].type);
    this.style.backgroundColor = bubblesArray[0].color;
}

// adding eventListener for bubbles
gameElements.forEach(function(element){
    element.addEventListener('click', gameElementClick)
});

//function handler for gameContainer eventListener
function gameContainerClick(e) {
    gameScore.innerText--;
}

//adding eventListener fo game container (- poits)
// gameContainer.addEventListener('click', gameContainerClick);

/*//player name feature
addPlayerButton.addEventListener('click', function(e) {
    e.preventDefault();
    //console.log(playerNameInput.value);
    saveToLocalStorage(playerNameInput.value);
    playerNameInput.style.display = "none";
    playerName.style.display = "flex";
    playerName.querySelector('p').innerText = localStorage.getItem('playerName');
});

function saveToLocalStorage(name) {
    if(localStorage.playerName == undefined && playerNameInput.value != '') {
        localStorage.playerName = name;
    }
}*/







