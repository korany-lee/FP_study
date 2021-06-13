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

console.log('30세 이상', _filter(users, 31));
console.log('30세 미만', _filter(users, 30));
