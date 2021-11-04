document.addEventListener("DOMContentLoaded", ()=> {
    
    const { body} = document;
    const data = [];
    const horizon_blank = 3;
    const $table = document.createElement('table');
    const $result = document.createElement('div');
    const rows = [];
    let turn = 'O';

    const callback = (event) => {
      if (event.target.textContent) return;
      event.target.textContent = turn;
      turn = turn === 'O' ? 'X' : 'O';
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