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
function _filter(items, predi) {
  let result = [];
  for (let i = 0; i < items.length; i++) {
    if (predi(items[i])) {
      //조건을 아예 predi라는 함수에 위임한다
      result.push(items[i]);
    }
  }
  return result;
}

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
function _map(item, mapper) {
  let result = [];
  for (let i = 0; i < item.length; i++) {
    result.push(mapper(item[i]));
  }
  return result;
}
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

//3.
