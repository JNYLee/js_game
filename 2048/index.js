const $back = document.getElementById("back");
const $score = document.getElementById("score");
const $table = document.getElementById("table");
const $fragment = document.createDocumentFragment();

const history = [];
const emptyCells = []; // [[i1, j1], [i2, j2], [i3, j3]]

let bridge;
let copyRow;
let newData;
let copyCell;
let data = [];
let startCoord;

$back.addEventListener("click", () => {
  const prevData = history.pop();
  if (!prevData) return; // 되돌릴 게 없으면 종료
  $score.textContent = prevData.score;
  data = prevData.table;
  draw();
});

// $table -> $fragment -> $tr -> $td

function startGame() {
  [1, 2, 3, 4].forEach(() => {
    const rowData = [];
    data.push(rowData); // 가로 배열 4개 대입
    const $tr = document.createElement("tr"); // tr 4개 생성
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0); // 0 16개
      const $td = document.createElement("td"); // td 16개
      $tr.appendChild($td); // tr 안에 td
    }); // 두 번째 forEach종료
    $fragment.appendChild($tr); // fr안에 tr
  }); // 첫 번째 forEach종료
  $table.appendChild($fragment); // tb안에 fr
  put2ToRandomCell();
  draw();
} // > put(), draw()

function put2ToRandomCell() {
  // 랜덤하게 2하나 생성
  data.forEach((rowData, i) => {
    // 4번
    rowData.forEach((cellData, j) => {
      // 4번 * 4
      if (!cellData) {
        // 0이 이면
        emptyCells.push([i, j]); // empty안에 16개 좌표 배열
      }
    });
  });
  // randomCell === [i, j]
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // 16개의 좌표 중 아무거나 1개
  data[randomCell[0]][randomCell[1]] = 2; // 빈 셀 아무데나 2 생성
}

function draw() {
  // 숫자있으면 색깔칠해주기
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j]; // 16개 하나하나 타깃으로 잡음
      if (cellData > 0) {
        //값이 있으면
        $target.textContent = cellData; // 웹상에도 업데이트
        $target.className = "color-" + cellData; // 숫자마다 다른 색상
      } else {
        // 빈 칸 이면 공백처리
        $target.textContent = "";
        $target.className = "";
      }
    });
  });
}

function updateData(newData, arrow) {
  [1, 2, 3, 4].forEach((cellData, i) => {
    [1, 2, 3, 4].forEach((rowData, j) => {
      changeValue(arrow, i, j);
    });
  });
  return newData;
} // updateData 함수 종료

function changeValue(arrow, row, cell) {
  copyCell = cell;
  copyRow = row;

  switch (arrow) {
    case "up":
      bridge = cell;
      copyCell = row;
      copyRow = bridge;
      break;
    case "down":
      bridge = 3 - cell;
      copyCell = row;
      copyRow = bridge;
      break;
    case "left":
      break;
    case "right":
      copyCell = 3 - cell;
      break;
  }

  return (data[copyRow][copyCell] = Math.abs(newData[row][cell]) || 0);
} // changeValue 함수 종료

// data = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];
// draw();
function moveCells(direction) {
  history.push({
    table: JSON.parse(JSON.stringify(data)),
    score: $score.textContent,
  });

  function 숫자합치기(type) {
    function getNextNumber(type, cellData, rowData, data) {
      if (type === "left") return cellData;
      if (type === "right") return rowData;
      if (type === "up") return cellData;
      if (type === "down") return data;
    }

    newData = [[], [], [], []];
    data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        const nextNumber = getNextNumber(
          type,
          cellData,
          rowData[3 - j],
          data[3 - i][j]
        );
        if (nextNumber) {
          //
          const currentRow =
            type === "left" || type === "right" ? newData[i] : newData[j];
          const prevData = currentRow[currentRow.length - 1];

          if (prevData === nextNumber) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
            console.log("if sum: "+newData);
          } else {
            newData[i].push(nextNumber);
            console.log("if not sum: "+newData);
          }
        }
      });
    });
    newData = updateData(newData, type);
  } // 숫자 합치기 함수 종료

  숫자합치기(direction);
  console.log(data);

  if (data.flat().includes(2048)) {
    // 승리
    draw();
    setTimeout(() => {
      alert("축하합니다. 2048을 만들었습니다!");
    }, 0);
  } else if (!data.flat().includes(0)) {
    // 빈 칸이 없으면 패배
    alert(`패배했습니다... ${$score.textContent}점`);
  } else {
    put2ToRandomCell();
    draw();
  }
}
// window로 입력받는 방향 입력 값 > movecells

window.addEventListener("keyup", (event) => {
  // 키보드를 눌렀을 때
  if (event.key === "ArrowUp") {
    moveCells("up");
  } else if (event.key === "ArrowDown") {
    moveCells("down");
  } else if (event.key === "ArrowLeft") {
    moveCells("left");
  } else if (event.key === "ArrowRight") {
    moveCells("right");
  }
});

window.addEventListener("mousedown", (event) => {
  // 마우스를 눌렀을 때 사용자의 x, y좌표
  startCoord = [event.clientX, event.clientY];
});

window.addEventListener("mouseup", (event) => {
  const endCoord = [event.clientX, event.clientY]; // 마우스를 뗐을 때 사용자의 x, y좌표
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    // 벡터 값에 따라 블록의 방향 결정
    moveCells("left");
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells("right");
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells("down");
  } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells("up");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});
