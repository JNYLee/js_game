const hello = "엄청나게 어려운 코드"; /* 사람끼리 의사소통해요. 설명 적어줄게요. */
// 이것도 주석
const money = '1000,000';
//const money = '1000,000';
if (condition) {
    const money1 = '1000,000';
}

const SCORE = 75;
 if (score >= 90) {
     console.log('A++');
 }else if (score >= 80){
    console.log('A+');
 }else if (score >= 70){
    console.log('B');
 } else {
    console.log("F");
}
let value = 'B';
switch (value){
    case 'A':
        console.log('A');
        break;
    case 'B':
        console.log('B');
        break;
    case 'C':
        console.log('C');
        break;
}

let i = 1;
while(i <= 100) {
    console.log("Hello, While!");
    i++;
}

for (let i = 0; i <=99; i++){
    console.log(i+1);
}

let i =0;
while (true) {
    if(i===5) break;
        i++;
}
console.log(i);

let i = 0;
while (i < 10) {
    i++;
    if(i % 2 === 0) { //짝수는 건너뛰기
        continue;
    }
    console.log(i);
}

for(let i = 1; i < 10; i++){
    for(let j = 1; j < 10; j++) {
        if(i % 2 == 0 || j % 2 == 0) continue;
        console.log(i, "X", j);
    }

}
for(let starNum = 0; starNum < 5; starNum++)
{
    console.log(" ".repeat(4-starNum),"*".repeat(starNum+1));
}

//'라'를 모두 제거 하자
const arr = ['가', '라', '마', '라', '바', '라'];
for(let indexNum = 0; indexNum < arr.length; i++)
{
    if(arr[indexNum] == '라') arr.splice(indexNum, 1);
}
console.log(arr);