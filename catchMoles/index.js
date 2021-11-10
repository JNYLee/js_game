// html에 미리 두더지, 폭탄 클래스를 넣어둠.
const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $life = document.querySelector("#life");
const $start = document.querySelector("#start");
const $$cells = document.querySelectorAll(".cell"); // 모든 구멍 선택

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const gopherPopPercent = 0.3;
const bombPopPercent = 0.5;

let started = false;
let score;
let time;
let life;
let timerId;
let tickId;

function popObject() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return
    const randomValue = Math.random(); // 0 ~< 1

    if (randomValue < gopherPopPercent) {
      // 30% 확률로 두더지가 구멍에서 올라옴
      const $gopher = $$cells[index].querySelector(".gopher");
      holes[index] = setTimeout(() => {
        // 1초 뒤에 사라짐
        $gopher.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove("hidden"); //setTimeout보다 먼저 실행됨.
    } else if (randomValue < bombPopPercent) {
      // 20%확률로 폭탄이 올라옴
      const $bomb = $$cells[index].querySelector(".bomb"); //
      holes[index] = setTimeout(() => {
        // 1초 뒤에 사라짐
        $bomb.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove("hidden");
    } // else-if문 종료
  }); // holes-forEach문 종료
}

$$cells.forEach(($cell, index) => {
  // 두더지를 눌렀을 때 이벤트
  $cell.querySelector(".gopher").addEventListener("click", (event) => {
    if (!event.target.classList.contains("dead")) {
      score += 1;
      $score.textContent = score;
    }

    event.target.classList.add("dead");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]); // 기존 내려가는 타이머제거 즉시 내려가도록

    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("dead");
    }, 1000);
  });

  // 폭탄을 눌렀을 때 이벤트
  $cell.querySelector(".bomb").addEventListener("click", (event) => {
    event.target.classList.add("boom");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거하고 즉시 내려가도록

    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("boom");
    }, 1000);

    life--;
    $life.textContent = life;
    checkEndGame();
  }); // $cell bomb eventListener 함수 종료
});

function checkEndGame() {
  if (life === 0) {
    clearInterval(timerId);
    clearInterval(tickId);
    setTimeout(() => {
      alert(`게임 오버! 점수는${score}점`);
    }, 50);
    return started = false;
  }

  if (time === 0) {
    // 시간이 다 되면
    clearInterval(timerId);
    clearInterval(tickId);

    setTimeout(() => {
      alert(`게임 오버! 점수는${score}점`);
    }, 50); // setTimeout 종료
  } // if문 종료
  return started = false;
}

document.addEventListener("DOMContentLoaded", () => {
  $start.addEventListener("click", () => {
    score = 0
    time = 8;
    life = 3;
    $score.textContent = score;
    $timer.textContent = time;
    $life.textContent = life;
  
    if (started) return; // 이미 시작했으면 무시
      started = true;
  
      console.log("시작"); // start확인 메세지
  
      timerId = setInterval(() => {
        time = (time * 10 - 1) / 10; // 소수점 계산 시 문제있음
        $timer.textContent = time; // 웹 상에 시간 표시
  
        checkEndGame();
      }, 100); // setInterval 함수 종료
  
      tickId = setInterval(popObject, 1000);
      popObject(); // 두더지나 폭탄 나오는 함수
  }); // start 이벤트 함수 종료
});
