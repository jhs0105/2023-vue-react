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
console.log(type, color, model, gear); //값이 없으면 undefined가 들어간다. // t, S, 2017, undefined

const { type: type2, color: color2, model: model2, gear: gear2 } = car;

const func1 = ({ type, color }) => {
  console.log(type);
  console.log(color);
};
func1(car); // car={type: "t", color:"s", model:2017}

const func2 = (car) => {
  const { type, color } = car;
  console.log(type);
  console.log(color);
};
func2(car);

function func3(...args) {
  const [first, ...others] = args;
  console.log('func3', first);
  console.log('func3', others);
  console.log('func3', others[2]);
}
func3(1, 2, 3, 4, 0);
//...others에서 ...는 rest연산자, other는 배열 (spread연산자가 아니다!)

const abc = [1, 2, 3, 4];
console.log(...abc);//spread 연산자 개별 요소로 분리
