const $form = document.querySelector("#form");
const $timer = document.querySelector("#timer");
const $result = document.querySelector("#result");
const $tbody = document.querySelector("#table tbody");

const CODE = {
  NORMAL: -1, // 닫힌 칸(지뢰 없음)
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, // 0 이상이면 다모두 열린 칸
};

let row; // 줄
let cell; // 칸
let mine;
let data;
let interval;
let searched;
let startTime;
let openCount = 0;
let firstClick = true;
let normalCellFound = false;

function onSubmit(event) {
  event.preventDefault();
  clearInterval(interval); // 얜 대체 뭐임????

  openCount = 0;
  searched = null;
  firstClick = true;
  normalCellFound = false;

  row = parseInt(event.target.row.value);
  cell = parseInt(event.target.cell.value);
  mine = parseInt(event.target.mine.value);

  $tbody.innerHTML = "";
  drawTable();
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time}초`;
  }, 1000);
} // > drawTable();

function plantMine() {
  //일단 노말 심고 랜덤으로 지뢰심기 data저장
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    }); // row*cell 갯수만큼 크기를 가지고 0~row*cell-1을  넣고있는 배열
  console.log("candidate: " + candidate);
  const shuffle = [];

  //
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    );
    console.log("chosen: " + chosen);
    shuffle.push(chosen);
  }

  const data = [];
  //일단 노말로 대입
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  //랜덤으로 뽑은 인덱스에 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // 행
    const hor = shuffle[k] % cell; // 열
    data[ver][hor] = CODE.MINE;
  }
  console.log("data: " + data);
  return data;
}

function codeText(target, code) {
  if (code === -3 || code === -5) {
    target.className = "flag";
    target.textContent = "!";
  } else if (code === -3 || code === -5) {
    target.className = "question";
    target.textContent = "?";
  } else if (code === -3 || code === -5) {
    target.className = "";
    target.textContent = "";
  }
}

function onRightClick(event) {
  // 깃발 꽂기(상태 전환)
  event.preventDefault();
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  // 지뢰일 때 순환 조건문
  if (cellData === CODE.MINE) {
    // 지뢰면
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
    codeText(target, CODE.QUESTION_MINE);
  } else if (cellData === CODE.QUESTION_MINE) {
    // 물음표 지뢰면
    data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
    codeText(target, CODE.FLAG_MINE);
  } else if (cellData === CODE.FLAG_MINE) {
    // 깃발 지뢰면
    data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
    codeText(target, CODE.MINE);
  }
  // 일반 칸일 때 순환 조건문
  else if (cellData === CODE.NORMAL) {
    // 닫힌 칸이면
    data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
    codeText(target, CODE.QUESTION);
  } else if (cellData === CODE.QUESTION) {
    // 물음표면
    data[rowIndex][cellIndex] = CODE.FLAG; // 깃발으로
    codeText(target, CODE.FLAG);
  } else if (cellData === CODE.FLAG) {
    // 깃발이면
    data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌 칸으로
    codeText(target, CODE.NORMAL);
  }
}

function countMine(rowIndex, cellIndex) {
  // 주변에 지뢰가 있는지 카운트
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}

function open(rowIndex, cellIndex) {
  //지뢰개수 알아보고 다 열었으면 게임 종료
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return; //
  const target = $tbody.children[rowIndex]?.children[cellIndex];

  if (!target) {
    // 이미 열린 칸이 아니라면
    return;
  }
  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || "";
  target.className = "opened";
  data[rowIndex][cellIndex] = count;
  openCount++;
  console.log(openCount);

  if (openCount === row * cell - mine) {
    // 지뢰 빼고 다 열었으면
    const time = (new Date() - startTime) / 1000;
    clearInterval(interval);
    $tbody.removeEventListener("contextmenu", onRightClick);
    $tbody.removeEventListener("click", onLeftClick);
    setTimeout(() => {
      alert(`승리했습니다! ${time}초가 걸렸습니다.`);
    }, 500);
  }
  return count;
}

// 주위를 한꺼번에 여는 함수
function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI); // 지뢰개수
    if (count === 0) {
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0);
}

function transferMine(rI, cI) {
  // 첫 턴의 지뢰일 경우 바꾸는 함수
  if (normalCellFound) return; // 이미 빈칸을 찾았으면 종료
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return;
  if (searched[rI][cI]) return; // 이미 찾은 칸이면 종료
  if (data[rI][cI] === CODE.NORMAL) {
    // 노말이면 지뢰랑 바꾸기
    // 빈칸인 경우
    normalCellFound = true;
    data[rI][cI] = CODE.MINE;
  } else {
    // 지뢰 칸인 경우 8방향 탐색
    searched[rI][cI] = true;
    transferMine(rI - 1, cI - 1);
    transferMine(rI - 1, cI);
    transferMine(rI - 1, cI + 1);
    transferMine(rI, cI - 1);
    transferMine(rI, cI + 1);
    transferMine(rI + 1, cI - 1);
    transferMine(rI + 1, cI);
    transferMine(rI + 1, cI + 1);
  }
}

function showMines() {
  // 지뢰류 전부 보여주기 - 게임 종료
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) {
        $tbody.children[rowIndex].children[cellIndex].textContent = "X";
      }
    });
  });
}

// 클릭한 칸 인데스 가져와서 첫번쨰인지, 아니면 지뢰인지 구별하고 지뢰면 종료
function onLeftClick(event) {
  const target = event.target; // td 태그겠죠?
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];

  if (firstClick) {
    firstClick = false;
    searched = Array(row)
      .fill()
      .map(() => []);
    if (cellData === CODE.MINE) {
      // 첫 클릭이 지뢰면
      transferMine(rowIndex, cellIndex); // 지뢰 옮기기
      data[rowIndex][cellIndex] = CODE.NORMAL; // 지금 칸을 빈칸으로
      cellData = CODE.NORMAL;
    }
  } // if-firstClick 종료

  if (cellData === CODE.NORMAL) {
    // 닫힌 칸이면
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    // 지뢰 칸이면
    showMines();

    target.textContent = "펑";
    target.className = "opened";

    clearInterval(interval);
    $tbody.removeEventListener("contextmenu", onRightClick);
    $tbody.removeEventListener("click", onLeftClick);
  } // 나머지는 무시
  // 아무 동작도 안 함
}

// table에 tr, td생성 및 추가
function drawTable() {
  data = plantMine();

  data.forEach((row) => {
    const $tr = document.createElement("tr");
    row.forEach((cell) => {
      const $td = document.createElement("td");
      // if (cell === CODE.MINE) {
      //   // $td.textContent = 'X'; // 개발 편의를 위해
      // }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener("contextmenu", onRightClick);
    $tbody.addEventListener("click", onLeftClick);
  });
} // > plantMine(), onRightClick(), onLeftClick();

document.addEventListener("DOMContentLoaded", () => {
  $form.addEventListener("submit", onSubmit);
});
