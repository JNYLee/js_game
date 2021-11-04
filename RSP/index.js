const RSP_AIS_X = {
    scissors: '0', // 가위
    rock: '-220px', // 바위
    paper: '-440px', // 보
};

document.addEventListener("DOMContentLoaded",() => {
    const $computer = document.querySelector('#computer');
  const $score = document.querySelector('#score');
  const $rock = document.querySelector('#rock');
  const $scissors = document.querySelector('#scissors');
  const $paper = document.querySelector('#paper');
  const IMG_URL = './rsp.png';
  $computer.style.background = `url(${IMG_URL}) -464px 0`;
  $computer.style.backgroundSize = 'auto 200px';
  const rspX = {
      scissors: '0', // 가위
      rock: '-220px', // 바위
      paper: '-440px', // 보
    };
    let computerChoice = 'scissors';
    const changeComputerHand = () => {
        if(computerChoice === 'scissors'){
            computerChoice = 'rock';
        }else if (computerChoice === 'rock') {
            computerChoice = 'paper';
        }else if(computerChoice === 'paper') {
            computerChoice = 'scissors';
        }
        //rspx.computerChoice는 안됨. 이뜻은 rspX.["computerChoice"] 인데 이 값은 이미 가위바위보 3개만 지정되어있음.
        $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
        $computer.style.backgroundSize = `auto 200px`;
    }
    let intervalId = setInterval(changeComputerHand, 50);

    const clickButton = () => {
        clearInterval(intervalId);
        setTimeout(() => {
            intervalId = setTimeout(changeComputerHand, 50);
        }, 1000);
    };
    $rock.addEventListener('click', clickButton);
    $scissors.addEventListener('click', clickButton);
    $paper.addEventListener('click', clickButton);
});