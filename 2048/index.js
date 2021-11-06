document.addEventListener("DOMContentLoaded", () => {
  const $table = document.getElementById("table");
  const $score = document.getElementById("score");
  let data = [];

  // $table -> $fragment -> $tr -> $td
  function startGame() {
    const $fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
      const rowData = [];
      data.push(rowData);
      const $tr = document.createElement("tr");
      [1, 2, 3, 4].forEach(() => {
        rowData.push(0);
        const $td = document.createElement("td");
        $tr.appendChild($td);
      });
      $fragment.appendChild($tr);
    });
    $table.appendChild($fragment);
    put2ToRandomCell();
    draw();
  }

  function put2ToRandomCell() {
    const emptyCells = []; // [[i1, j1], [i2, j2], [i3, j3]]
    data.forEach(function (rowData, i) {
      rowData.forEach(function (cellData, j) {
        if (!cellData) {
          emptyCells.push([i, j]);
        }
      });
    });
    // randomCell === [i, j]
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    data[randomCell[0]][randomCell[1]] = 2;
  }

  function draw() {
    data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        const $target = $table.children[i].children[j];
        if (cellData > 0) {
          $target.textContent = cellData;
          $target.className = "color-" + cellData;
        } else {
          $target.textContent = "";
          $target.className = "";
        }
      });
    });
  }

  startGame();

  window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
      moveCells('up');
    } else if (event.key === 'ArrowDown') {
      moveCells('down');
    } else if (event.key === 'ArrowLeft') {
      moveCells('left');
    } else if (event.key === 'ArrowRight') {
      moveCells('right');
    }
  });

  let startCoord;
  window.addEventListener('mousedown', (event) => {
    startCoord = [event.clientX, event.clientY];
  });
  window.addEventListener('mouseup', (event) => {
    const endCoord = [event.clientX, event.clientY];
    const diffX = endCoord[0] - startCoord[0];
    const diffY = endCoord[1] - startCoord[1];
    if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
      moveCells('left');
    } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
      moveCells('right');
    } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
      moveCells('down');
    } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
      moveCells('up');
    } 
  });
  
});
