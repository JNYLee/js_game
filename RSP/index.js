document.addEventListener("DOMContentLoaded", () => {
  const RSP_AIS_X = {
    scissors: "104px", // 가위
    rock: "0px", // 바위
    paper: "-116px", // 보
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
  const $paper = document.querySelector("#paper");
  const $computer = document.querySelector("#computer-rsp-image");
  const $scissors = document.querySelector("#scissors");
  const $rspSpace = document.querySelector("#rsp-space");
  const $userScore = document.querySelector("#user-score");
  const $comScore = document.querySelector("#computer-score");
  // const $end = document.querySelector("#end");
  //const $restart = document.querySelector("#restart");
  const $alertGame = document.querySelector("#alert-game");

  const RSP_IMG_URL = "./rsp_sprite.png";
  let intervalId;
  let userScore = 0;
  let comScore = 0;
  let clickable = true;
  let computerChoice = "scissors";
  let count = 0;

  const changeComputerHand = () => {
    computerChoice = COM_CHANGE_CHOICE[computerChoice];
    $computer.style.background = `url(${RSP_IMG_URL}) 0px ${RSP_AIS_X[computerChoice]}`;
    $computer.style.backgroundSize = `166px 332px`;
  };

  const showUserHand = (event) => {
    $rspSpace.style.visibility = "visible";
    console.log(RSP_AIS_X[RSP_STATUS[event.target.textContent]]);
    $rspSpace.style.background = `url(${RSP_IMG_URL}) 0px ${
      RSP_AIS_X[RSP_STATUS[event.target.textContent]]
    }`;
    $rspSpace.style.backgroundSize = `166px 332px`;
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
    return userScore === MAX_GAME_COUNT || comScore === MAX_GAME_COUNT;
  };

  const printGamingResult = (gameMessage) => {
    $alertGame.textContent = gameMessage;
    $userScore.textContent = userScore;
    $comScore.textContent = comScore;
  };

  const waitScreen = () => {
    clickable = true;
    intervalId = intervalChangeComputerHand();
    $rspSpace.style.visibility = "hidden";
    $alertGame.textContent = "가위바위보 게임";
  };

  const printResultMessage = () => {
    if (userScore === MAX_GAME_COUNT) {
      printGamingResult("[게임 종료] 플레이어 승리");
      return 0;
    } else if (comScore === MAX_GAME_COUNT) {
      printGamingResult("[게임 종료] 플레이어 패배");
      return 0;
    } else {
      return 0;
    }
  };

  // checkOperateSystemButton = (event) => {
  //   if (event.target.textContent === "종료") {
  //     clearInterval(intervalId);
  //   } else if (event.target.textContent === "재시작") {
  //     count = 0;
  //     userScore = 0;
  //     comScore = 0;
  //     clearInterval(intervalId);
  //     intervalId = intervalChangeComputerHand();
  //   }
  // };

  const clickButtonOperate = (event) => {
    if (clickable) {
      clearInterval(intervalId);
      clickable = false;

      showUserHand(event);

      //checkOperateSystemButton(event);

      const userChoice = RSP_STATUS[event.target.textContent];
      const diffScore = SCORE_TABLE[userChoice] - SCORE_TABLE[computerChoice];
      const matchResult = checkComMatchResult(diffScore);

      let message = "";
      count++;

      if (matchResult === WIN) {
        userScore += 1;
        message = `${count}번째 판: 플레이어 승리`;
      } else if (matchResult === LOSE) {
        comScore += 1;
        message = `${count}번째 판: 플레이어 패배`;
      } else if (matchResult === DRAW) {
        message = `${count}번째 판: 무승부`;
      }

      printGamingResult(message);
      printResultMessage();

      if (!isFinishGame()) {
        setTimeout(() => {
          waitScreen();
        }, 1000);
      }
    }
  };

  intervalId = intervalChangeComputerHand();

  $rock.addEventListener("click", clickButtonOperate);
  $scissors.addEventListener("click", clickButtonOperate);
  $paper.addEventListener("click", clickButtonOperate);
  //$end.addEventListener("click", clickButtonOperate);
  //$restart.addEventListener("click", clickButtonOperate);
});
