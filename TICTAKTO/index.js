const { body } = document; // document.body 축약
const $table = document.createElement('table'); // table태그 생성
const $result = document.createElement('div'); // 결과창
const rows = [];
const checkForBingoArr = [0, 1, 2];

let turn = 'O';
let clickable = true;

function checkForWinner(rowIdx, cellIdx, turn){
  if(checkForBingoArr.every( cell => rows[rowIdx][cell].textContent === turn))
      return true;
  else if(checkForBingoArr.every( cell => rows[cell][cellIdx].textContent === turn))
      return true;
  else if( checkForBingoArr.every( cell => rows[cell][cell].textContent === turn))
      return true;
  else if( checkForBingoArr.every( cell => rows[2-cell][cell].textContent === turn))
      return true;
  return false;
}

const checkWinner = (target) => {
  
  if(!clickable) return;
  
  // 가로, 세로 줄 index 가져오기
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  // 승자 확인
  let hasWinner = false;
  hasWinner = checkForWinner(rowIndex, cellIndex, turn);

  return hasWinner;
};

const checkWinnerAndDraw = (target) => {

  const hasWinner = checkWinner(target);
  const draw = rows.flat().every((cell) => cell.textContent);
  
  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', ifButtonClick);
    return;
  }
  
  // 승자가 없으면 무승부 확인
  if (draw) {
    $result.textContent = `무승부`;
    $table.removeEventListener('click', ifButtonClick);
    return;
  }
  
  //턴 바꿔주기
  turn = turn === 'X' ? 'O' : 'X';
};

const ifButtonClick = (event) => {

  // 연타를 못하게 막아주는 조건
  if (!clickable) {
    return;
  }
  
  // 빈 칸 인지 확인
  if (event.target.textContent !== '') {
    alert('빈 칸이 아닙니다.');
    return;
  }

  // 빈 칸이면
  console.log('빈 칸입니다');  //dev
  event.target.textContent = turn;
  checkWinnerAndDraw(event.target);
  if (turn === 'X') { // 컴퓨터 턴 일때,
    const emptyCells = rows.flat().filter((v) => !v.textContent); // 비어있는 셀만 가져오기
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // 비어있는 셀 중 하나 선택
    
    clickable = false; // 클릭 막음
    
    setTimeout(() => {
      randomCell.textContent = 'X';
      clickable = true; // 클릭 풀어줌

      checkWinnerAndDraw(randomCell);
    }, 1000);
  }
};

document.addEventListener("DOMContentLoaded", ()=> {
  
  // 3 x 3 칸을 만듦
  checkForBingoArr.forEach((cell) => {
    const $tr = document.createElement('tr'); // 3개의 tr
    const cells = []; // 3개의 td를 넣을 3개의 cells

    checkForBingoArr.forEach((cell) => {
      const $td = document.createElement('td'); // 3개의 td * 3
      cells.push($td); // cells안에 td 넣기
      $tr.appendChild($td); // tr에 td 넣기
     // console.log($td);
    });

    rows.push(cells); //rows안에 cells 넣기
    $table.appendChild($tr); //table안에 tr넣기
    $table.addEventListener('click', ifButtonClick); //click시 ifButtonClick함수 실행
  });
  
  body.appendChild($table);
  body.appendChild($result);

});