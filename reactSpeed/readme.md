# CHECK **REACT** SPEED **GAME**!

- ## [CAN YOU REACT GREEN SCREEN?](./index.js)
    <br></br>
  # **기능 소개**
  <br></br>
  ## 1. 하늘색 화면이 나오면 대기단계이다.
  <br></br>
  ## 2. 빨간색 화면이 나오면 준비단계이다.
  <br></br>
  ## 3. 초록색 화면이 나오면 시작단계이다.(이때 클릭을 해야한다.)
  <br></br>
  ## 4. 클릭을 하면 다시 게임 대기단계인 하늘색 화면으로 전환된다.
  <br></br>
  ## 5. 전환되면서, 방금 걸린시간과 지금까지 한 속도의 평균 그리고 가장 빨랐던 TOP 5를 출력한다.
  <br></br>
  # **스킬 소개**
  <br></br>
  
  ## 0. css에 waitng, ready, now 클래스 마다 디자인을 해둔다.
  <br></br>
  ## 1. 스크린을 클릭하면 addEventLister로 클릭된 이벤트의 타깃을 가져온다.
  <br></br>
  ## 2. 이벤트를 clickEventChangeScreenClass함수로 가져간다.
  <br></br>
  ## 3. 이벤트 타깃의 클래스 리스트안에 "waiting","ready","now"가 있는지 contains로 분류한다.
  <br></br>
  ## 4. waiting이면 실행시키는 것들
    > #### 1) class에 waiting을 지우고 ready를 넣는다. + "초록색을 클릭하세요"를 출력한다.
    > #### 2) timOutId에 랜덤으로 시간을 주고 setTimeout을 실행시킨다. 
    > #### 3) 시작시간을 기록하고 ready 클래스를 지우고 now를 추가한다. + "지금 클릭하세요"를 출력한다.  
  <br></br>
  ## 5. ready면 실행시키는 것들
    > #### 1) 대기일 때 실행시켰던 setTimeout를 clear시킨다.
    > #### 2)  class에 ready을 지우고 waiting를 넣는다. + "너무 빨리 눌렀습니다!"를 출력한다.
  <br></br>
  ## 6. now면 실행시키는 것들
    > #### 1) 종료시간을 기록한다.
    > #### 2) 종료시간에서 시작시간을 뺀 시간을 current에 저장한다.
    > #### 3) 시간정렬을 위해 sortTopSpeed에 current를 대입한다.
    > #### 4) records 배열에 시간을 넣고, sort를 통해 top5를 가져오고, reduce를 이용해 평균을 구한다.
    > #### 5) 구해진 TOP5와 평균, 현재 반응속도를 출력한다.
    > #### 6) 기록한 시작, 끝 시간을 초기화한다.
    > #### 7) class에 now을 지우고 waiting을 넣는다. + "클릭하면 시작하세요"를 출력한다.

