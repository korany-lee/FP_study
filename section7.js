// 비동기 상황
function square(a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a * a);
    }, 500);
  });
}
// -> 프로미스 객체, 나중에 나올걸 약속하는
console.log(1);
square(10).then(function (res) {
  console.log(2);
  console.log(res);
});
console.log(3);
// 1 - 3 - 2 - res(100) 순서로 찍힐거다
// 코드의 순서를 개발자가 마음대로 제어하고 싶을때

// 1 - 2 - res - 3 이 찍히길 원한다면
console.log(1);
square(10)
  .then(function (res) {
    console.log(2);
    console.log(res);
  })
  .then(function () {
    console.log(3);
  });
// 이렇게 하면 됨

square(10).then(square).then(square).then(square).then(console.log);
// 위 아래 같다
_.go(square(10), square, square, square, console.log);

// 스퀘어라는 함수가 즉시평가되는 친구더라도 이를테면 re_suare
function re_square(a) {
  return a * a;
}
// 프로미스로 만들어진 함수에서는 에러가 나지만 아래 _.go 함수에서는 에러가 발생하지 않는다.

var list = [2, 3, 4];
//Promise.all 말고,,

new Promise(function (resolve) {
  (function recur(res) {
    if (list.length === res.length) return resolve(res);
    square(list[res.length]).then(function (val) {
      res.push(val);
      recur(res);
    });
  })([]);
}).then(console.log);

// 위와 동일한 기능을 하는 고차함수를 준비해보자, 좀 더 간결해진다 위는 명령형임

_.go(list, _.map(square), console.log);
