const $wrapper = document.querySelector("#wrapper"); // id가 wrapper인 div 태그
// 팝업 창을 띄워 카드 개수 물어보기
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "white",
  "pink",
  "cyan",
  "violet",
  "gray",
  "black",
];

let total; // 카드 개수 입력받기 - 5
let colorSlice; // 입력받은 개수의 1/2 만큼 색 정함 - 6
let colorCopy; // 배열 2배로 불리기 - 7
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;

// 이 함수 실행 - 4
function shuffle() {
  // 피셔-예이츠 셔플
  total = parseInt(prompt("카드 개수를 짝수로 입력하세요(최대 20)."));
  colorSlice = colors.slice(0, total / 2);
  colorCopy = colorSlice.concat(colorSlice);

  for (let i = 0; colorCopy.length > 0; i += 1) {
    // 2배가 된 만큼 반복 - 8
    const randomIndex = Math.floor(Math.random() * colorCopy.length); // 길이 - 1 숫자에서 랜뽑 - 9
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1)); // 랜덤하게 재배열 shuffled안에 들어감 - 10
  }
}

function createCard(i) {
  // div.card > div.card-inner > (div.card-front + div.card-back)
  // card 클래스마다 미리 디자인 설정해놓음(css)
  const card = document.createElement("div");
  card.className = "card"; // .card 태그 생성

  const cardInner = document.createElement("div");
  cardInner.className = "card-inner"; // .card-inner 태그 생성

  const cardFront = document.createElement("div");
  cardFront.className = "card-front"; // .card-front 태그 생성

  const cardBack = document.createElement("div");
  cardBack.className = "card-back"; // .card-back 태그 생성

  cardBack.style.backgroundColor = shuffled[i]; // 카드 색 설정
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card; // card태그 구조를 만든 다음 반환 - 13
}

function onClickCard() {
  // this는 card를 가리킴
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  } // 클릭을 허용하지 않았거나, card가 아직 completed에 포함되지 않았거나  방금 뒤집은 카드를 눌렀거나

  this.classList.add("flipped"); // card classList에 flipped 태그 추가
  //연습으로 add대신 toggle을 사용해도 무방하다.
  clicked.push(this); // 클릭한 그 카드를 클릭한 카드에 추가

  if (clicked.length !== 2) {
    // 2개가 아니면
    return;
  }
  // 카드를 2개 뽑았을 때 이야기
  const firstBackColor =
    clicked[0].querySelector(".card-back").style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector(".card-back").style.backgroundColor;

  if (firstBackColor === secondBackColor) {
    // 두 카드가 같은 카드면 성공된 배열에 추가
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = []; // 다시 clicked 초기화

    if (completed.length !== total) {
      return;
    } // 아직 게임이 안끝났다면

    const endTime = new Date();
    setTimeout(() => {
      alert(`축하합니다! ${(endTime - startTime) / 1000}초 걸렸습니다.`);
      resetGame();
    }, 1000);
    return;
  }

  clickable = false;

  setTimeout(() => {
    clicked[0].classList.remove("flipped");
    clicked[1].classList.remove("flipped");
    clicked = [];
    clickable = true;
  }, 500);
}
//function endGame() {}

function resetGame() {
  $wrapper.innerHTML = "";
  colorCopy = [];
  shuffled = [];
  completed = [];
  document.querySelectorAll(".card").forEach((card, index) => {
    card.removeEventListener("click", onClickCard);
  });
  startGame();
}

// 이 함수를 실행시킴 - 2
function startGame() {
  clickable = false; // 클릭 못함
  shuffle(); // shuffle함수 시작 - 3
  shuffled.map((cell, index) => {
    // 카드 개수만큼 반복 - 11
    const card = createCard(index); // createCard함수 total번 실행 - 12
    card.addEventListener("click", onClickCard); // 카드 클릭시 onClickCard 함수 실행
    $wrapper.appendChild(card);
  });

  document.querySelectorAll(".card").forEach((card, index) => {
    // 초반 카드 공개
    setTimeout(() => {
      card.classList.add("flipped"); // css 스타일 적용으로 뒤집어지게
    }, 1000 + 100 * index); //순차적으로 뒤집히도록
  }); // forEach문 종료

  setTimeout(() => {
    // 카드 감추기
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped"); // 뒤집어진 스타일 원상복구
    });
    clickable = true; // 다 보여줬으면 이제 클릭 허용
    startTime = new Date(); // 게임 타이머 시작
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  startGame(); // 게임을 시작! - 1
});
