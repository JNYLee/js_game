# **R**ock, **S**cissors, **P**aper!

- ## [ROCK SCISSORS PAPER GAME](./index.js)
    <br></br>
  - >### **기능 소개**
    - >#### 1. 컴퓨터와 매 **1초 마다** 경기를 치룰 수 있다.
    - >#### 2. 사용자는 가위, 바위, 보 **버튼**을 누를 수 있다.
    - >#### 3. 본 게임은 **3선승제**로 이루어져있다.
    - >#### 4. 매 게임마다 승리, 무승부, 패배를 **알려준다**.
    - >#### 5. 컴퓨터의 동작을 보지 못하도록 **0.5초**씩 마다 바뀐다. 
    <br></br>
  - >### **스킬 소개**
    - >#### 1. 컴퓨터의 가위바위보 사진은 1장을 다운받아 style.background로 사진을 3등분한다.
    - >#### 2. setInterval을 이용해 0.5초마다 changeComputerHand함수로 손모양(사진)을 바꿔준다.
    - >#### 3. 각 3개의 버튼마다 addEventListener를 추가하여 클릭했을때 clickButtonOperate함수를 실행시킨다.
    - >#### 4. clickButtonOperate함수가 실행되면
      -  >##### 1) 미리 만들어둔 clickable변수를 확인받아 true면 false로 바꾸고 함수를 실행시키고,<br>컴퓨터의 interval을 멈춘다. false면 이 함수를 건너뛴다. (연타를 방지하기 위한 변수) 
      - >##### 2) 이벤트가 일어난 곳에 문자열을 삼항연산자로 분류하여 각각 RSP값을 myChoice에 입력한다.
      - >##### 3) computerChoice는 computerChangeChoice 함수에 의해 바뀌고<br>changeComputerHand에서 멈추었을 때 computerChoice대입된다.
      - >##### 4) 만들어둔 scoreTable에 myChoice와 computerChoice값을 넣어 해당 값을 불러온다. 
      - >##### 5) 불러온 값을 diff변수에 넣어서 checkMatchResult 함수에 대입한다.
      - >##### 6) diff값에 따라 승리, 무승부, 패배를 리턴하고, 각각에 따라 점수를 올려준다.
      - >##### 7) 리턴된 값을 message에  넣어서 printScoreNowWinner함수에 대입해 <br>승리나 각 게임 결과를 보여준다.
