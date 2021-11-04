document.addEventListener("DOMContentLoaded", ()=> {
    const data = [];
    const horizon_blank = 3;
    for(let make_horizon_blank = 0; make_horizon_blank < horizon_blank; make_horizon_blank++) data.push([]);

    const $table = document.createElement('table');

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


});