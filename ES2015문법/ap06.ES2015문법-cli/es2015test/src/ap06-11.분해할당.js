/*
 (구조) 분해 할당에 대해서 알아본다.


*/

//배열 분해 할당은 배열의 순번을 이용해서 매핑한다.
//객체 분해 할당은 객체의 프로퍼티 명(props)을 이용해서 매핑한다.

const points = [20, 30, 40];
const x1 = points[0]; //20
const y1 = points[1]; //30
const z1 = points[2]; //40
console.log(x1, y1, z1);

const [x2, y2, z2] = points;
console.log(x2, y2, z2);

//두번째 값 무시하기
const [x3, , z3] = points; //변수가 필요없는 곳은 빈자리로 넣어주면 된다.
console.log(x3, z3); //20, 40

//세번째 값 무시하기
const [x4, z4] = points;
console.log(x4, z4); //20, 30

//객체 분해 할당
const car = {
  type: 't',
  color: 'S',
  model: 2017,
};

const type1 = car.type;
const color1 = car.color;
const model1 = car.model;
console.log(type1, color1, model1);

//객체분해 할당을 이용해서 type, color, model을 만드시오
const { type, color, model, gear } = car;
console.log(type, color, model, gear); //값이 없으면 undefined가 들어간다.
