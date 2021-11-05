document.addEventListener("DOMContentLoaded", () => {
  const $wrapper = document.querySelector('#wrapper');
  const total = 12;
  const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
  let colorCopy = colors.concat(colors);
  let shuffled = [];
  let clicked = [];
  let completed = [];

  function shuffle() { // 색깔들을 무작위로 섞어주는 함수
    for(let i = 0; colorCopy.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * colorCopy.length);
      shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
    }
  }

  function createCard(i) { // 카드를 만드는 함수
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = shuffled[i]; // 카드의 색깔을 넣어주기
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;

  }

  function onClickCard() {  //카드가 클릭했을 때 발생하는 함수? 모르겠다
    this.classList.toggle('flipped');
    clicked.push(this);

    if (clicked.length !== 2) {return;} // 두 카드가 같은 지 확인하는 부분
    
    const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
    const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
    if (firstBackColor === secondBackColor) {
      completed.push(clicked[0]);
      completed.push(clicked[1]);
      clicked = [];
      return;
    }
    
    setTimeout(() => {
      clicked[0].classList.remove('flipped');
      clicked[1].classList.remove('flipped');
      clicked = [];
    }, 1000);

  }

  function startGame() {
    shuffle();
    for(let i = 0; i < total; i += 1) { // 카드 수 만큼 돌리기
      const card = createCard(i);
      card.addEventListener('click', onClickCard);
      $wrapper.appendChild(card);
    }
    document.querySelectorAll('.card').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('flipped');
      }, 1000 + 100 * index);
    });

    setTimeout(() => {
      document.querySelectorAll('.card').forEach((card) => {
        card.classList.remove('flipped');
      });
    }, 5000);

  }

  startGame();

});