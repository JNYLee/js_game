const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

let startTime;
let endTime;
let timeOutId;

const records = [];

function sortTopSpeed(currentTime) {
  records.push(currentTime);
  const averageTime = records.reduce((a, c) => a + c) / records.length;
  $result.textContent = `현재 ${currentTime}ms, 평균: ${averageTime}ms`;

  records.sort((a, b) => a - b);
  records.slice(0, 5).forEach((record, idx) => {
    $result.append(
      document.createElement("br"),
      `Top Speed #${idx + 1}: ${record}`
    );
  });
}

function clickEventChangeScreenClass(event) {
  if (event.target.classList.contains("waiting")) {
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.textContent = "초록색이 되면 클릭하세요";

    timeOutId = setTimeout(function () {
      startTime = new Date();

      $screen.classList.remove("ready");
      $screen.classList.add("now");
      $screen.textContent = "지금 클릭하세요!";
      // 시작 시간 재기
    }, Math.floor(Math.random() * 1000) + 2000); // 원하는 시간을 2~3초로 랜덤으로 설정

  } else if (event.target.classList.contains("ready")) {
    clearTimeout(timeOutId);

    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.textContent = "너무 빨리 눌렀습니다!";

  } else if (event.target.classList.contains("now")) {
    endTime = new Date();

    const current = endTime - startTime;
    startTime = null;
    endTime = null;

    sortTopSpeed(current);

    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.textContent = "클릭하면 시작하세요";
    // 끝 시간 재기
    // 시간 저장
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //스크린을 클릭하면
  $screen.addEventListener("click", (event) => {
    clickEventChangeScreenClass(event);

  });
});
