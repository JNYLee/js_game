# **2048**!

- ## [Make 2048!](./index.js)
    <br></br>
  # **기능 소개**
  <br></br>
  ## 1. 마우스로 혹은 방향키로 상하좌우로 움직인다.
  <br></br>
  ## 2. 이동마다 2가 랜덤으로 생성되며, 같은 숫자끼리 인접한 상태에서 인접한 <br>&nbsp;&nbsp;&nbsp;&nbsp;면 방향으로 움직이면 숫자가 더해진다.
  <br></br>
  ## 3. 승리조건은 숫자가 점점 더해져 2048을 만드는 것이다.
  <br></br>
  ## 4. 패배조건은 2048을 만들기 전에 움직일 수 없는 것이다.
  <br></br>

  ## 5. 실수로 잘못 움직이면 되돌리기로 이전상태로 움직일 수 있다.
  <br></br>

  ## 6. 게임이 종료되면 합쳐진 만큼 점수를 표시해준다.
  <br></br>

  # **스킬 소개**
  <br></br>
  
  ## 1. Window의 이벤트를 입력받아 마우스나 키보드를 입력받는다.
  <br></br>

  ## 2. 방향마다 switch문에서 이전 배열에 값에서 같은 숫자끼리 더해주는 연산을 한다.
  <br></br>

  ## 3. 더해진 숫자를 또 기존 배열에 업데이트를 해준다. (숫자 크기마다 색을 갱신해준다.)
  <br></br>

  ## 4. 4 x 4배열이 includes로 2048이 있는지 검사하고 아닐 경우, 값이 다 차있는지 확인하여 게임을 종료한다.
  <br></br>