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

// - 위에 1번 3번이 중복되고 있는데, '이상', '미만' 거르는 부분이 살짝 애매하쥬?
// 근데 함수형 프로그래밍에서는 이 부분을 재밌게 해결할 수 있당
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
//여기서 over30에 대한 값에 pop메소드를 실행하거나 slice라는 메소드를 실행해서 값을 변형시킬 우려가 있기 때문에?
// -> 이걸 대인문 설명하면서..?

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
//순수함수가 아니고, 객체에 따라 결과가 달라지는 메서드는 객체지향 프로그래밍임.
//map, filter => array라는 객체의 인스턴스에서만 사용 가능
//다형성을 지원하기 어렵다(형을 다루기 어렵다)
// -> array와 array like는 다른 객체이기 때문에 map과 filter 메소드에서 지원하지 않는다.
//다형성을 지원한다. -> document.querySelectorAll('*') -> []의 형태라고 배열이 아니다. prototype은 Nodelist!
//데이터가 먼저 나오는 프로그램, 함수가 먼저 나오는 프로그램 => 데이터가 있기 전부터 함수가 있는거고..
//객체지향은 평가 순서가 굉장히 중요하다..
//데이터가 생기지 않아도 먼저 함수가 존재할 수 있다 평가시점이 굉장히 유연해진다.
//map 메서드는 실행되지 않지만, 방금전 만든 _map함수는 실행된다.
//  1. _each로 ㅡmap, _filter 중복 제거

//  2. 외부 다형성
//    1.array_like, arguments, document.querySelectorAll
//  3. 내부 다형성
//    1.predi, iter, mapper
//외부다형성은 고차함수의 구조에 따라 달라지지만, 그 배열안에 어떤 값이든 들어있어도 수행할 수 있게 만드는 역할은 보조함수가 맡고 있다.
//개발자가 넘기는 배열과 그 배열안에 존재하는 내부 값에 대한 개발자의 이해로 보조함수의 역할을 정할 수 있다.

//모든 것을 다 수행한 이후에 콜백함수는 마지막에 돌려주는 함수?
// 무조건 콜백핢수? 노! 어떤 일들을 다 수행한 다음에 다시 돌려주는 것을 뜻할 때 이름을 콜백함수라고 할때,
//predicate ->  어떤 조건을 return하는 함수
//iterate -> 돌면서 반복적으로 실행되는 함수
//mapper -> 무언가와 무언가 사이를 매핑해주는 함수
//이렇게 역할에 맞게 보조함수를 불러주는 것이 좋다.
//각각 어떤 일들을 하느냐에 따라 보조함수의 이름을 다르게 붙여줄 수 있다.

//3. 커링 - 함수와 인자를 다루는 기법
// -> 함수에 인자를 하나씩 적용해나가다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법
//  자바스크립트에 자체적으로 가지고 있는것은 아니지만 1급함수가 지원되고 평가시점을 조절할 수 있기 떄문에
//  커링기법을 얼마든지 만들어낼 수 있다.
//  1. _curry, _curryr

function _curry(fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
}
/* 
커리함수는 인자로 함수를 받는다. 
커리함수를 실행한 즉시 함수를 리턴한다. 이 함수는 첫 번째 인자를 받고,
이 함수가 실행되면 또 다시 함수를 실행한다.
그리고 그 함수 안쪽에서 미리 받아두었던 함수 본체를 평가한다.
*/

var add = function (a, b) {
  return a + b;
};

console.log(add(10, 5)); //15

var add = _curry(function (a, b) {
  return a + b;
});

console.log(add(10));
console.log(add(10)(5));

var slice = Array.prototype.slice;

//  2. _get 만들어 좀 더 간단하게 하기

//4. _reduce 만들기
console.log(_reduce([1, 2, 3, 4], add, 10));

//5. 파이프라인 만들기
//  1. _pipe
//  2. _go
//  3. users에 _go 적용
//  4. 화살표 함수 간단히

//6. _each의 외부 다형성 높이기
