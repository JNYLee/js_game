document.addEventListener("DOMContentLoaded", () => {
    const $startScreen = document.querySelector('#start-screen');
    const $gameMenu = document.querySelector('#game-menu');
    const $battleMenu = document.querySelector('#battle-menu');
    const $heroName = document.querySelector('#hero-name');

    $startScreen.addEventListener('submit', (event) => { // form안에서 submit이라는 이벤트를 발생시켰을 때
        event.preventDefault();
        const name = event.target['name-input'].value; // 이벤트를 발생시킨 form 태그안에 name-input id 를 가지고 있는 태그를 가져온다.
        $startScreen.style.display = 'none'; // startScreen에 태그를 닫는다.
        $gameMenu.style.display = 'block'; // gameMenu에 태그를 보여준다.
        $heroName.textContent = name; // heroName에 사용자가 입력한 name을 보여준다.
    });
    


});