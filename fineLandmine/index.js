document.addEventListener("DOMContentLoaded", () => {
  const $form = document.querySelector("#form");
  const $timer = document.querySelector("#timer");
  const $tbody = document.querySelector("#table tbody");
  const $result = document.querySelector("#result");
  let row; // 줄
  let cell; // 칸
  let mine;
  const CODE = {
    NORMAL: -1, // 닫힌 칸(지뢰 없음)
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    MINE: -6,
    OPENED: 0, // 0 이상이면 다모두 열린 칸
  };
  let data;
  let openCount = 0;
  let startTime;
  let interval;

  function onSubmit(event) {
    event.preventDefault();
    row = parseInt(event.target.row.value);
    cell = parseInt(event.target.cell.value);
    mine = parseInt(event.target.mine.value);
    openCount = 0;
    normalCellFound = false;
    searched = null;
    firstClick = true;
    clearInterval(interval);
    $tbody.innerHTML = "";
    drawTable();
    startTime = new Date();
    interval = setInterval(() => {
      const time = Math.floor((new Date() - startTime) / 1000);
      $timer.textContent = `${time}초`;
    }, 1000);
  }
  $form.addEventListener("submit", onSubmit);

  function plantMine() {
    const candidate = Array(row * cell)
      .fill()
      .map((arr, i) => {
        return i;
      });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
      const chosen = candidate.splice(
        Math.floor(Math.random() * candidate.length),
        1
      )[0];
      shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++) {
        rowData.push(CODE.NORMAL);
      }
    }

    for (let k = 0; k < shuffle.length; k++) {
      const ver = Math.floor(shuffle[k] / cell); // 7번째 줄
      const hor = shuffle[k] % cell; // 1번째 칸
      data[ver][hor] = CODE.MINE;
    }
    return data;
  }

  function onRightClick(event) {
    event.preventDefault();
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if (cellData === CODE.MINE) {
      // 지뢰면
      data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
      target.className = "question";
      target.textContent = "?";
    } else if (cellData === CODE.QUESTION_MINE) {
      // 물음표 지뢰면
      data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
      target.className = "flag";
      target.textContent = "!";
    } else if (cellData === CODE.FLAG_MINE) {
      // 깃발 지뢰면
      data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
      target.className = "";
      target.textContent = "";
    } else if (cellData === CODE.NORMAL) {
      // 닫힌 칸이면
      data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
      target.className = "question";
      target.textContent = "?";
    } else if (cellData === CODE.QUESTION) {
      // 물음표면
      data[rowIndex][cellIndex] = CODE.FLAG; // 깃발으로
      target.className = "flag";
      target.textContent = "!";
    } else if (cellData === CODE.FLAG) {
      // 깃발이면
      data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌 칸으로
      target.className = "";
      target.textContent = "";
    }
  }

  // 1 2 3
  // 4 5 6
  // 7 8 9
  function countMine(rowIndex, cellIndex) {
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
    if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;
    const target = $tbody.children[rowIndex]?.children[cellIndex];
    if (!target) {
      return;
    }
    const count = countMine(rowIndex, cellIndex);
    target.textContent = count || "";
    target.className = "opened";
    data[rowIndex][cellIndex] = count;
    openCount++;
    console.log(openCount);
    if (openCount === row * cell - mine) {
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

  function openAround(rI, cI) {
    setTimeout(() => {
      const count = open(rI, cI);
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

  let normalCellFound = false;
  let searched;
  let firstClick = true;
  function transferMine(rI, cI) {
    if (normalCellFound) return; // 이미 빈칸을 찾았으면 종료
    if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return;
    if (searched[rI][cI]) return; // 이미 찾은 칸이면 종료
    if (data[rI][cI] === CODE.NORMAL) {
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
    const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
    data.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (mines.includes(cell)) {
          $tbody.children[rowIndex].children[cellIndex].textContent = "X";
        }
      });
    });
  }

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
    }
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

  function drawTable() {
    data = plantMine();
    data.forEach((row) => {
      const $tr = document.createElement("tr");
      row.forEach((cell) => {
        const $td = document.createElement("td");
        if (cell === CODE.MINE) {
          // $td.textContent = 'X'; // 개발 편의를 위해
        }
        $tr.append($td);
      });
      $tbody.append($tr);
      $tbody.addEventListener("contextmenu", onRightClick);
      $tbody.addEventListener("click", onLeftClick);
    });
  }
});
