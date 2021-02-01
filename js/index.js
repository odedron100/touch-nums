'use strict';
const EASY = 16;
const HARD = 25;
const EXTREME = 36;
const TIMER = 0;

var gNums = [];
var gCurrNumber = 1;
var startTime;
var elapsedTime = 0;
var timerInterval;
var currentLevel = EASY;

function init() {
  gCurrNumber = 1;
  gNums = createNumsArray(currentLevel);
  createBoard();
}


function restart() {
  init();
  resetTimer();
  var messageWinner = document.querySelector('.winner');
  messageWinner.innerHTML = '';
}


function levelClicked(elLevel) {
  if (elLevel.innerHTML === 'EXTREME') {
    resetTimer();
    gNums = createNumsArray(EXTREME);
    currentLevel = EXTREME;
    createBoard();
    gCurrNumber = 1;
  }
  else if (elLevel.innerHTML === 'HARD') {
    resetTimer();
    gNums = createNumsArray(HARD);
    currentLevel = HARD;
    createBoard();
    gCurrNumber = 1;
  }
  else if (elLevel.innerHTML === 'EASY') {
    resetTimer();
    gNums = createNumsArray(EASY);
    currentLevel = EASY;
    createBoard();
    gCurrNumber = 1;
  }
}


function winner() {
  if (gCurrNumber === gNums.length + 1) {
    pause();
    var messageWinner = document.querySelector('.winner');
    messageWinner.innerHTML = 'Congrats, you won!!';
  }
}

function cellClicked(clickedCell) {
  var cellClicked = clickedCell.innerHTML;
  if (cellClicked === '1') {
    start();
  }
  if (cellClicked === '' + gCurrNumber) {
    clickedCell.classList.add('right-cell');
    clickedCell.classList.add('right-cell-animation')
    setTimeout(() => clickedCell.classList.remove('right-cell-animation'), 2000);
    // clickedCell.classList.remove('right-cell-animation');
    gCurrNumber++;
    winner();
  }
}


function createBoard() {
  var strHTML = '';
  var count = -1;
  var boardLength = Math.sqrt(gNums.length);
  for (var i = 0; i < boardLength; i++) {
    strHTML += `<tr>`
    for (var j = 0; j < boardLength; j++) {
      count++;
      strHTML += `<td class="cell" onClick="cellClicked(this)">${gNums[count]}</td>`
    }
    strHTML += `</tr>`
  }
  var elBoard = document.querySelector('.game-board');
  elBoard.innerHTML = strHTML;
}


function createNumsArray(level) {
  var numsArray = [];
  for (var i = 0; i < level; i++) {
    numsArray.push(i + 1);
  }
  var shuffleArray = shuffle(numsArray)
  return shuffleArray;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    displayTimer(timeToString(elapsedTime));
  }, 10);
}

function pause() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  displayTimer("00:00:00");
  elapsedTime = 0;
}


function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}




function displayTimer(txt) {
  document.querySelector(".timer").innerHTML = txt;
}


function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
