document.addEventListener("DOMContentLoaded", () => {
  const RSP_AIS_X = {
    scissors: "0", // 가위
    rock: "-232px", // 바위
    paper: "-440px", // 보
  };

  const RSP_STATUS = {
    바위: "rock",
    가위: "scissors",
    보: "paper",
  };

  const SCORE_TABLE = {
    rock: 0,
    scissors: 1,
    paper: -1,
  };

  const COM_CHANGE_CHOICE = {
    scissors: "rock",
    rock: "paper",
    paper: "scissors",
  };

  const MAX_GAME_COUNT = 3;
  const WIN = 1;
  const LOSE = -1;
  const DRAW = 0;

  const $rock = document.querySelector("#rock");
  const $score = document.querySelector("#score");
  const $paper = document.querySelector("#paper");
  const $computer = document.querySelector("#computer-rsp-image");
  const $scissors = document.querySelector("#scissors");
  const $rspSpace = document.querySelector("#rsp-space");

  const RSP_IMG_URL = "./rsp.png";
  let intervalId;
  let myScore = 0;
  let comScore = 0;
  let clickable = true;
  let computerChoice = "scissors";

  const changeComputerHand = () => {
    computerChoice = COM_CHANGE_CHOICE[computerChoice];
    $computer.style.background = `url(${RSP_IMG_URL}) ${RSP_AIS_X[computerChoice]} 0px`;
    $computer.style.backgroundSize = `auto 200px`;
  };

  const showUserHand = (event) => {
    $rspSpace.style.visibility = "visible";
    console.log(RSP_AIS_X[RSP_STATUS[event.target.textContent]]);
    $rspSpace.style.background = `url(${RSP_IMG_URL}) ${
      RSP_AIS_X[RSP_STATUS[event.target.textContent]]
    } 0px`;
    $rspSpace.style.backgroundSize = `auto 200px`;
  };

  const intervalChangeComputerHand = () => {
    return setInterval(changeComputerHand, 50);
  };

  const checkComMatchResult = (diffScore) => {
    if ([2, -1].includes(diffScore)) {
      return WIN;
    } else if ([-2, 1].includes(diffScore)) {
      return LOSE;
    } else {
      return DRAW;
    }
  };

  const isFinishGame = () => {
    return myScore === MAX_GAME_COUNT || comScore === MAX_GAME_COUNT;
  };

  const printResultMessage = (message) => {
    if (myScore === MAX_GAME_COUNT) {
      return `[게임 종료] 나의 승리 ${myScore}:${comScore}`;
    } else if (comScore === MAX_GAME_COUNT) {
      return `[게임 종료] 컴퓨터의 승리 ${myScore}:${comScore}`;
    } else {
      return `${message} ${myScore}:${comScore}`;
    }
  };

  const clickButtonOperate = (event) => {
    if (clickable) {
      clearInterval(intervalId);
      clickable = false;

      showUserHand(event);

      const myChoice = RSP_STATUS[event.target.textContent];
      const diffScore = SCORE_TABLE[myChoice] - SCORE_TABLE[computerChoice];
      const matchResult = checkComMatchResult(diffScore);

      let message = "";

      if (matchResult === WIN) {
        myScore += 1;
        message = "승리";
      } else if (matchResult === LOSE) {
        comScore += 1;
        message = "패배";
      } else if (matchResult === DRAW) {
        message = "무승부";
      }

      if (!isFinishGame()) {
        setTimeout(() => {
          clickable = true;
          intervalId = intervalChangeComputerHand();
          $rspSpace.style.visibility = "hidden";
        }, 1000);
      }

      $score.textContent = printResultMessage(message);
    }
  };

  intervalId = intervalChangeComputerHand();

  $rock.addEventListener("click", clickButtonOperate);
  $scissors.addEventListener("click", clickButtonOperate);
  $paper.addEventListener("click", clickButtonOperate);

  const $stop = document.querySelector("#stop");
  $stop.addEventListener("click", stopppp);
  function stopppp() {
    clearInterval(intervalId);
  }
});
