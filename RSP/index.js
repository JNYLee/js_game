const IMG_URL = "./rsp.png"; // 이미지 로딩을 끊기 위해 잠시 . 을  붙임.
const $rock = document.querySelector("#rock");
const $score = document.querySelector("#score");
const $paper = document.querySelector("#paper");
const $computer = document.querySelector("#computer");
const $scissors = document.querySelector("#scissors");

let intervalId; // 0.05초마다 사진 바꿔주기
let myScore = 0;
let comScore = 0;
let clickable = true;
let computerChoice = "scissors";

const RSP_AIS_X = {
  scissors: "0", // 가위
  rock: "-220px", // 바위
  paper: "-440px", // 보
};

const computerChangeChoice = {
    scissors: 'rock',
    rock: 'paper',
    paper: 'scissors'
};

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const changeComputerHand = () => {
  computerChoice = computerChangeChoice[computerChoice];
      // test print computer change choice
      // console.log(computerFirstChoice);
  //RSP_AIS_X.computerChoice는 안됨. 이뜻은 RSP_AIS_X.["computerChoice"] 인데 이 값은 이미 가위바위보 3개만 지정되어있음.
  $computer.style.background = `url(${IMG_URL}) ${RSP_AIS_X[computerChoice]} 0`;
  $computer.style.backgroundSize = `auto 200px`;
};

function checkMatchResult(diffChoiceKey) {
    if ([2, -1].includes(diffChoiceKey)) {
        myScore += 1;
        return '승리';
      } else if ([-2, 1].includes(diffChoiceKey)) {
        comScore += 1;
        return '패배';
      } else {
        return '무승부';
      }
}

function clickButtonOperate(event){
  
    if (clickable) {
      clearInterval(intervalId);
      clickable = false;
      // 점수 계산 및 화면 표시
      const myChoice = event.target.textContent === '바위' 
        ? 'rock' 
        : event.target.textContent === '가위' 
          ? 'scissors' 
          : 'paper';
      
      const myChoiceKey = scoreTable[myChoice];
      const computerChoiceKey = scoreTable[computerChoice];
      const diff = myChoiceKey - computerChoiceKey;

      let message;
      // 2, -1은 승리조건이고, -2, 1은 패배조건, 점수표 참고
      message = checkMatchResult(diff);
      
      printScoreNowOrWinner(message);
    } // if-clickable true 조건문 종료
}// clickButtonOperate 함수 종료

function printScoreNowOrWinner(message) {
  if (myScore === 3) {
    $score.textContent = `나의 승리 ${myScore}:${comScore}`;
  } else if (comScore === 3) {
    $score.textContent = `컴퓨터의 승리 ${myScore}:${comScore}`;
  } else {
    $score.textContent = `${message} ${myScore}:${comScore}`;
    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  // 매 0.5초마다 컴퓨터 손 바꿔주기
  intervalId =  setInterval(changeComputerHand, 50); 

  $rock.addEventListener('click', clickButtonOperate);
  $scissors.addEventListener('click', clickButtonOperate);
  $paper.addEventListener('click', clickButtonOperate);
});
