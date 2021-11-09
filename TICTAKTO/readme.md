# **T**ik **T**ak! **T**ok!

- ## [TIKTAKTOK Match for Computer](./index.js)
    <br></br>
  # **기능 소개**
  <br></br>
  ## 1. 3x3 빈칸을 나타낸다.
  <br></br>
  ## 2. 사용자 먼저 O를 입력한다.
  <br></br>
  ## 3. 다음 컴퓨터가 빈칸에 랜덤으로 X를 입력한다.
  <br></br>
  ## 4. 순차적으로 입력한다. 만약 이미 채워진 곳에 클릭하면, <br>&nbsp;&nbsp;&nbsp; 빈칸이 아님을 알려준다.
  <br></br>
  ## 5. 가로, 세로, 대각선에 같은 문자 3개가 일치하면 승리를 판별해준다. <br>&nbsp;&nbsp;&nbsp; 만약, 승부가 안나면 무승부가 된다.
  <br></br>
  # **스킬 소개**
  <br></br>
  
  ## 1. forEach를 이중으로 해서 tr을 생성하고 td를 안에 3개씩 넣어 3번 생성한다.<br>&nbsp;&nbsp;&nbsp; cell 빈칸에 다 넣어두고 table에도 tr를 넣어서 table 버튼을 만든다.
  <br></br>
  ## 2. 사용자가 클릭을 하면 이벤트타깃을 받아서 그곳에 "O"를 넣어준다.
  <br></br>
  ## 3. 이후에 승자(checkForWinner)나 빈칸이 있는지(CheckWinner) 검색하는 데, <br>&nbsp;&nbsp;&nbsp;없으면 컴퓨터 차례로 넘어간다. "X"가 입력된다.
    > ### 1) rows 배열을 forEach로 가로, 세로, 대각선 2개에 있는 지 판별한다.
    > ### 2) 있으면 hasWinner값을 true로 반환한다.
    > ### 3) draw에 빈칸이 유무에 따라 true, false값을 대입한다.
    > ### 4) hasWinner가 참이면 승자를 가려준다.
    > ### 5) false라면 draw값에 따라 무승부를 출력한다.
    > ### 6) 모두 거짓일 경우, 현재 turn값을 전환하여 다음 차례로 넘어간다.
    > ### 7) "X"로 넘어갈 경우, 컴퓨터의 턴을 진행한다.
    <br></br>
  ## 4. "X"는 빈칸의 셀을 배열로 받고 랜덤으로 하나를 선택하여 입력한다.(emptCells, randomCell)
  <br></br>
  ## 5. 다음 셀을 입력하기 전에 setTimeout으로 텀을 1초 둔다.
     #### 1) 연타방지를 위해 막아두었던 clickable을 false에서 true로 바꿔준다.
     #### 2) 랜덤하게 정했던 빈 셀에 X를 입력한다.
  <br></br>
  ## 6. 다시 사용자의 입력을 기다린다.
  

