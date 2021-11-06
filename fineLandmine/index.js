document.addEventListener("DOMContentLoaded", () => {
  const $tbody = document.querySelector("#table tbody");
  const $result = document.querySelector("#result");

  const row = 10;
  const cell = 10;
  const mine = 10;
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
  drawTable();
});
