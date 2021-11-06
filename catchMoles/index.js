document.addEventListener("DOMContentLoaded", () => {
  const $timer = document.querySelector("#timer");
  const $score = document.querySelector("#score");
  const $game = document.querySelector("#game");
  const $start = document.querySelector("#start");
  const $$cells = document.querySelectorAll(".cell");

  const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let started = false;
  let score = 0;
  let time = 60;

  $start.addEventListener('click', () => {
    if (started) return; // 이미 시작했으면 무시
    started = true;
    console.log('시작');
    tick();
  });

  function tick() {
    holes.forEach((hole, index) => {
      if (hole) return; // 무언가 일어나고 있으면 return
      const randomValue = Math.random();
      if (randomValue < gopherPercent) {
        const $gopher = $$cells[index].querySelector('.gopher');
        holes[index] = setTimeout(() => { // 1초 뒤에 사라짐
          $gopher.classList.add('hidden');
          holes[index] = 0;
        }, 1000); 
        $gopher.classList.remove('hidden');
      } else if (randomValue < bombPercent) {
        const $bomb = $$cells[index].querySelector('.bomb');
        holes[index] = setTimeout(() => { // 1초 뒤에 사라짐
          $bomb.classList.add('hidden');
          holes[index] = 0;
        }, 1000); 
        $bomb.classList.remove('hidden');
      }
    });
  }

});
