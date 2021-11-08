document.addEventListener("DOMContentLoaded", ()=> {
  
  const { body } = document;
  const $table = document.createElement('table');
  const $result = document.createElement('div'); // 결과창
  const rows = [];

  let turn = 'O';
  
  const checkWinner = (target) => {
    
    if(!clickable) return;
    
    // 가로, 세로 줄 index 가져오기
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;

    // 세칸 다 채워졌나?
    let hasWinner = false;
    
    // 가로줄 검사
    if (
      rows[rowIndex][0].textContent === turn &&
      rows[rowIndex][1].textContent === turn &&
      rows[rowIndex][2].textContent === turn
    ) {
      hasWinner = true;
    }
    rows[rowIndex].every().forEach(col => col === turn)
    // 세로줄 검사
    if (
      rows[0][cellIndex].textContent === turn &&
      rows[1][cellIndex].textContent === turn &&
      rows[2][cellIndex].textContent === turn
      ) {
        hasWinner = true;
      }
      // 대각선 검사
      if (
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
        ) {
          hasWinner = true;
        }
    if (
      rows[0][2].textContent === turn &&
      rows[1][1].textContent === turn &&
      rows[2][0].textContent === turn
      ) {
        hasWinner = true;
      }
    return hasWinner;
  };
  
  const checkWinnerAndDraw = (target) => {

    const hasWinner = checkWinner(target);
    // 승자가 있으면
    if (hasWinner) {
      $result.textContent = `${turn}님이 승리!`;
      $table.removeEventListener('click', ifButtonClick);
      return;
    }
    
    // 승자가 없으면 무승부 확인
    const draw = rows.flat().every((cell) => cell.textContent);
    if (draw) {
      $result.textContent = `무승부`;
      return;
    }
    
    //턴 바꿔주기
    turn = turn === 'X' ? 'O' : 'X';
  };
  
  
  let clickable = true;
  const ifButtonClick = (event) => {

    // 연타를 못하게 막아주는 조건
    if (!clickable) {
      return;
    }
    
    // 빈 칸 아닌지 확인
    if (event.target.textContent !== '') {
      alert('빈 칸이 아닙니다.');
      return;
    }

    // 빈 칸이면
    console.log('빈 칸입니다');
    event.target.textContent = turn;
    checkWinnerAndDraw(event.target);
    if (turn === 'X') { // 컴퓨터 턴 일때,
      const emptyCells = rows.flat().filter((v) => !v.textContent); // 비어있는 셀만 가져오기
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // 비어있는 셀 중 하나 선택
      clickable = false; // 클릭 방지
      setTimeout(() => {
        randomCell.textContent = 'X';
        clickable = true;
        checkWinnerAndDraw(randomCell);
        console.log(rows);
      }, 1000);
    }
  };
  
  // 3 x 3 칸을 만듦
  for (let i = 1; i <= 3; i++) {
    const $tr = document.createElement('tr');
    const cells = [];
    for (let j = 1; j <= 3; j++) {
      const $td = document.createElement('td');
      cells.push($td);
      $tr.appendChild($td);
     // console.log($td);
    }
    rows.push(cells);
    $table.appendChild($tr);
    $table.addEventListener('click', ifButtonClick);
  }

  body.appendChild($table);
  body.appendChild($result);

});