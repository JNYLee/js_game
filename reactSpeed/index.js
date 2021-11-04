document.addEventListener("DOMContentLoaded", () => {
    const $screen = document.querySelector('#screen');
    const $result = document.querySelector('#result');

    let startTime;
    let endTime;

    const records = [];

    $screen.addEventListener('click', (event) => {
        if (event.target.classList.contains('waiting')) {
            $screen.classList.remove('waiting');
            $screen.classList.add('ready');
            $screen.textContent = '초록색이 되면 클릭하세요';
            setTimeout(function () {
                startTime = new Date();
                $screen.classList.remove('ready');
                $screen.classList.add('now');
                $screen.textContent = '지금 클릭하세요!';
                // 시작 시간 재기

            }, Math.floor(Math.random()*1000) + 2000); // 원하는 시간을 2~3초로 랜덤으로 설정
        }else if (event.target.classList.contains('ready')) {

        }else if (event.target.classList.contains('now')) {
            endTime = new Date();
            const current = endTime - startTime;
            records.push(current);
            const average = records.reduce((a,c) => a + c) / records.length;
            $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;
            startTime = null;
            endTime = null;
            $screen.classList.remove('now');
            $screen.classList.add('waiting');
            $screen.textContent = '클릭하면 시작하세요';
             // 끝 시간 재기
            // 시간 저장
        }
    });
});