document.addEventListener("DOMContentLoaded", ()=> {
    
    const data = [];
    const horizon_blank = 3;
    const $table = document.createElement('table');
    const $result = document.createElement('div');
    
    let turn = 'O';

    for(let make_horizon_blank = 0; make_horizon_blank < horizon_blank; make_horizon_blank++) {
      data.push([]);
    }
    for(let make_blank_tr = 0; make_blank_tr < horizon_blank; make_blank_tr++) {
      const $tr = document.createElement('tr'); 
      for(let make_blank_td = 0; make_blank_td < horizon_blank; make_blank_td++) {
        const $td = document.createElement('td'); 
        $td.addEventListener('click', (event) => {
          if (event.target.textContent) return;
          event.target.textContent = turn;
          if (turn === 'O') {
            turn = 'X';
          }else if (turn === 'X') {
            turn = 'O';
          }
        });
        $tr.append($td);
      }
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

  document.body.append($table);
  document.body.append($result);
    

});