document.addEventListener("DOMContentLoaded", ()=> {
    
    const { body} = document;
    const data = [];
    const horizon_blank = 3;
    const $table = document.createElement('table');
    const $result = document.createElement('div');
    const rows = [];
    let turn = 'O';

      const checkWinner = (target) => {
        const rowIndex = target.parentNode.rowIndex;
        const cellIndex = target.cellIndex;
        // 세 칸 다 채워졌나?
        // 가로줄 검사
        let hasWinner = false;
        if (
          rows[rowIndex][0].textContent === turn &&
          rows[rowIndex][1].textContent === turn &&
          rows[rowIndex][2].textContent === turn
        ) {
          hasWinner = true;
        }
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

        const callback = (event) => {
          if (event.target.textContent !== '') { // 칸이 이미 채워져 있는가?
            console.log('빈칸이 아닙니다.');
            return;
          }
          // 빈칸이면
          console.log('빈칸입니다');
          event.target.textContent = turn;
          // 승부 판단하기
          if (checkWinner(event.target)) {
            $result.textContent = `${turn}님이 승리!`;
            $table.removeEventListener('click', callback);
            return;
          }
          //무승부 검사 이 부분 헷갈림 row안에 뭘 저장하고 있는지
          const draw = rows.flat().every((cell) => cell.textContent);
          
          if (draw) {
            $result.textContent = '무승부';
            return;
          }
          turn = turn === 'X' ? 'O' : 'X';
        };

    for(let make_horizon_blank = 0; make_horizon_blank < horizon_blank; make_horizon_blank++) {
      data.push([]);
    }
    for(let make_blank_tr = 0; make_blank_tr < horizon_blank; make_blank_tr++) {
      const $tr = document.createElement('tr');
      const cells = [];
      for(let make_blank_td = 0; make_blank_td < horizon_blank; make_blank_td++) {
        const $td = document.createElement('td'); 
        cells.push($td);
        $tr.append($td);
      }
      rows.push(cells);
      $table.addEventListener('click', callback);
      $table.append($tr);
    }

    // 테이블의 구조 참고  <table>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // </table> -->

  body.append($table);
  body.append($result);
    

});