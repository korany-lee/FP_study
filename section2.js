const { _map, _filter, _each, _curry, _reduce, _reset } = require('./js/_');

require('./js/_');

var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 },
];

//1. 명령형 코드
// 1. 30세 이상인 users를 거른다.
var tempUsers = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    tempUsers.push(users[i]);
  }
}
console.log('tempUsers: ', tempUsers);
// 2. 30세 이상인 users의 names을 수집한다.
var names = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    names.push(users[i].name);
  }
}
console.log('names: ', names);
// 3. 30세 미만인 users를 거른다.
var tempUsers2 = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    tempUsers2.push(users[i]);
  }
}
console.log('tempUsers2: ', tempUsers2);
// 4. 30세 미만인 suers의 ages를 수집한다.
var ages = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    ages.push(users[i].age);
  }
}
console.log('ages: ', ages);

// - 위에 1번 3번이 중복되고 있는데, '이상', '미만' 거르는 부분이 살짝 애매하쥬? 근데 함수형 프로그래밍에서는 이 부분을 재밌게 해결할 수 있당
// 2. _filter, _map으로 리팩토링
// function _filter(items, predi) {
//   let result = [];
//   for (let i = 0; i < items.length; i++) {
//     if (predi(items[i])) {
//       //조건을 아예 predi라는 함수에 위임한다
//       result.push(items[i]);
//     }
//   }
//   return result;
// }
//위의 _filter 함수는 _.js로 이동했습니다.

var over30 = _filter(users, function (user) {
  return user.age >= 30;
});
console.log('30세 이상', over30);
var under30 = _filter(users, function (user) {
  return user.age < 30;
});
console.log('30세 미만', under30);
//정리 -> _filter 함수처럼 매개변수로 함수를 받는 것을 고차함수라고 함.
// _filter함수는 단순히 users에 국한된 것이 아니라, 안에 매개변수로 넣는 배열과 조건 함수에 따라 다양한 일들을 할 수 있다.

//다시 돌아가서 2번과 4번도 같은 역할을 하고 있다.
//때문에 _map이라는 함수로 하나의 함수이지만 age와 name을 수집하는 또 다른 고차함수를 만들어보자
// function _map(item, mapper) {
//   let result = [];
//   for (let i = 0; i < item.length; i++) {
//     result.push(mapper(item[i]));
//   }
//   return result;
// }
//위의 _filter 함수는 _.js로 이동했습니다.
//_filter로 한번 걸러준 후에 _map으로 반환해주어야 함!
console.log(
  '30세 이상의 name',
  _map(over30, function (user) {
    return user.name;
  })
);
//여기서 over30에 대한 값에 pop메소드를 실행하거나 slice라는 메소드를 실행해서 값을 변형시킬 우려가 있기 때문에? -> 이걸 대인문 설명하면서..?

console.log(
  '30세 미만의 age',
  _map(under30, function (user) {
    return user.age;
  })
);

//대인문?이 없으면 보다 간결한 코드를 만들어 줄 수 있다.
console.log(
  _map(
    _filter(users, function (user) {
      return user.age >= 30;
    }),
    function (user) {
      return user.name;
    }
  )
);
console.log(
  _map(
    _filter(users, function (user) {
      return user.age < 30;
    }),
    function (user) {
      return user.age;
    }
  )
);
//위에서 만들어진 코드를 _.js라는 곳에 담아둘게요 -> 파일 생성 & 이동
//3._each로 분리하기 -> _.js라는 파일에 _each만들어서 실행

//배열에 이미 map과 filter라는 메서드가 존재한다..!
//하지만 함수가 아니고 method임.
//순수함수가 아니고, 객체에 따라 달라지는 메서드는 객체지향 프로그래밍임.
//다형성을 지원하기 어렵다 -> array와 array like는 다른 객체이기 때문에 map과 filter 메소드에서 지원하지 않는다.
//다형성을 지원한다. -> document.querySelectorAll('*') -> []의 형태라고 배열이 아니다. prototype은 Nodelist!
//map 메서드는 실행되지 않지만, 방금전 만든 _map함수는 실행된다.

//모든 것을 다 수행한 이후에 콜백함수는 마지막에 돌려주는 함수?
//predicate ->  어떤 조건을 return하는 함수
//iterate -> 돌면서 반복적으로 실행되는 함수
//mapper -> 무언가와 무언가 사이를 매핑해주는 함수
//각각 어떤 일들을 하느냐에 따라 보조함수의 이름을 다르게 붙여줄 수 있다.

var add = _curry(function (a, b) {
  return a + b;
});

var slice = Array.prototype.slice;
console.log(_reduce([1, 2, 3, 4], add, 10));
