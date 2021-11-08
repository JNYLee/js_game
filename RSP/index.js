const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const IMG_URL = "./rsp.png";

let myScore = 0;
let comScore = 0;

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

document.addEventListener("DOMContentLoaded", () => {

  $computer.style.background = `url(${IMG_URL}) -464px 0`;
  $computer.style.backgroundSize = "auto 200px";
  
  let computerChoice = "scissors";
  
  const changeComputerHand = () => {
    computerChoice = computerChangeChoice[computerChoice];
        // test print computer change choice
        // console.log(computerFirstChoice);
    //RSP_AIS_X.computerChoice는 안됨. 이뜻은 RSP_AIS_X.["computerChoice"] 인데 이 값은 이미 가위바위보 3개만 지정되어있음.
    $computer.style.background = `url(${IMG_URL}) ${RSP_AIS_X[computerChoice]} 0`;
    $computer.style.backgroundSize = `auto 200px`;
  };
  
  //0.05초마다 사진 바꿔주기
  let intervalId = setInterval(changeComputerHand, 50);

  const scoreTable = {
    rock: 0,
    scissors: 1,
    paper: -1,
  };

  // clickButton 5번 호출, 인터벌 1번, 2번, 3번, 4번, 5번(얘만 intervalId)
  //  그 다음에 버튼을 클릭하면 5번만 취소
  let clickable = true;
  let computer = 0;
  let me = 0;

  const clickButton = (event) => {
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
    } // if-clickable true 조건문 종료
  }; // clickButton-event 종료

  $rock.addEventListener('click', clickButton);
  $scissors.addEventListener('click', clickButton);
  $paper.addEventListener('click', clickButton);
});
