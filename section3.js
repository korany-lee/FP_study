const {
  _map,
  _filter,
  _each,
  _curry,
  _curryr,
  _reduce,
  _reset,
  _get,
  _keys,
  _go,
} = require('./js/_');

//컬렉션 중심 프로그래밍의 4가지 유형과 함수

//1. 수집하기 - map, values, plick 등
//2. 거르기 - filter, reject, compact, without 등
//3. 찾아내기 - find, some, every 등
//4. 접기 - reduce, min, max, group_by, count_by 등

//앞에 있는 함수가 대표함수. 대표 함수로 각각의 특화함수를 만들어낼 수 있다.

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

//1. 수집하기 - map: 내부에 있는 값을 수집해오는 함수
// console.log(
//   _map(users, function (user) {
//     return user.name;
//   })
// );
//  1. values: key-value로 되어있는 데이터에 유리
//배열을 통해서 values를 꺼낼 때는 의미가 다소 없기에..
function _values(data) {
  return _map(data, function (val) {
    return val;
  });
}

//왜 사용하나..?
function _identity(val) {
  return val;
}
let a = 10;
// console.log(_identity(a));
//

console.log(_values(users[0])); // 여기서 왜 안나오는지 모르겠네;
//console.log(_keys(users[0]));

//  2. pluck: _pluck(users, 'age') -> [33, 44, 22, 11, ...]
function _pluck(data, key) {
  // return _map(data, function (obj) {
  //   return obj[key];
  // });
  return _map(data, _get(key));
}
console.log(_pluck(users, 'age'));

//2. 거르기 - filter
console.log(
  _filter(users, function (user) {
    return user.age > 30;
  })
);

function _reject(data, predi) {
  return _filter(data, _negate(predi));
}

console.log(
  _reject(users, function (user) {
    return user.age > 30;
  })
);

//predicate..

function _negate(func) {
  return function (val) {
    return !func(val);
  };
}

//함수들의 응용과 조합..
//compact -> trudy한 값만 남게 하는 함수,,

var _compact = _filter(_identity); //이렇게만 해도 된다
console.log(_compact([1, 2, 0, false, null, {}]));

//3. 찾아내기 - find
//  1. find : filter와 다른점은 find는 값 하나만 return, 만나자마자
function _find(list, predi) {
  var keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    let val = list[keys[i]];
    if (predi(val)) return val;
  }
}

console.log(
  _find(users, function (user) {
    return user.age == 32;
  })
);

//go를 사용해서 조금 더 응용해보자면,, 일단 find를 curry함수로 만들어주고
var _find = _curryr(function (list, predi) {
  var keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    let val = list[keys[i]];
    if (predi(val)) return val;
  }
});

console.log(
  _get(
    _find(users, function (user) {
      return user.id == 5;
    }),
    'name'
  )
);

//  2. find_index : 해당 값의 index 리턴
var _find_index = _curryr(function (list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

// console.log(
//   _find_index(users, function (user) {
//     return user.age == 32;
//   })
// );

//  3.some
function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1;
}

console.log(
  _some([1, 2, 5, 10, 20], function (val) {
    return val > 20;
  })
);

// 4. every
function _every(data, predi) {
  return _find_index(data, _negate(predi));
}
console.log(
  _every([1, 2, 5, 10, 20], function (val) {
    return val > 10;
  })
);

// 4. 접기 - reduce: 평가 순서와 상관없이
function _min(data) {
  return _reduce(data, function (a, b) {
    //reduce를 for문의 대체라고 생각하지말자.. 두개의 값만 있다 생각해보자
    return a < b ? a : b;
  });
}
//평가순서와 상관없이 해당하는 결과를 만들어내는 것에 대한 사고를 해야한다.
//항상 순서대로 뭔가 진행될거라 생각하지 말자
console.log(_min([1, 2, 4, 10, 5, -4])); // -4리턴

function _max(data) {
  return _reduce(data, function (a, b) {
    //reduce를 for문의 대체라고 생각하지말자.. 두개의 값만 있다 생각해보자
    return a > b ? a : b;
  });
}
console.log(_max([1, 2, 4, 10, 5, -4]));
//  1. min, max,
//  1-1. min_by, max_by
//  조금 더 다형성이 보장된다.
var _min_by = _curryr(function (data, iter) {
  return _reduce(data, function (a, b) {
    return iter(a) > iter(b) ? a : b;
  });
});
_min_by([1, 2, 4, 10, 5, -4], Math.abs);
function _max_by(data, iter) {
  return _reduce(data, function (a, b) {
    return iter(a) < iter(b) ? a : b;
  });
}
_max_by([1, 2, 4, 10, 5, -4], Math.abs);

//약간 쿼리 보는거같다..
_go(
  users,
  _filter((user) => user.age >= 30),
  _min_by(_get('age')),
  _get('name'),
  console.log
);
//  2. group_by, push
// 일단 결과가 객체로 되어야한다.
function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

var _group_by = _curryr(function (data, iter) {
  return _reduce(
    data,
    function (grouped, val) {
      return _push(grouped, iter(val), val);
    },
    {}
  );
});
var _head = function (list) {
  return list[0];
};
_go(users, _group_by(_get('age')), console.log);

_go(
  users,
  _group_by(function (user) {
    return user.age - (user.age % 10);
  }),
  console.log
);

_go(
  users,
  _group_by(function (user) {
    return user.name[0];
  }),
  console.log
);

_go(users, _group_by(_pipe(_get('name'), _head)), console.log);

// 3. _count_by, inc

var _inc = function (count, key) {
  count[key] ? count[key]++ : (count[key] = 1);
  return count;
};

var _count_by = _curryr(function (data, iter) {
  return _reduce(
    data,
    function (count, val) {
      return _inc(count, iter(val));
    },
    {}
  );
});

console.log(
  _count_by(users, function (user) {
    return user.age - (user.age % 10);
  })
);

_go(
  users,
  _count_by(function (user) {
    return user.name[0];
  }),
  console.log
);

console.log(_pairs(users[0]));

console.clear();

var f1 = _pipe(
  _count_by(function (user) {
    return user.age - (user.age % 10);
  }),
  _map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
  (list) => '<ul>' + list.join('') + '</ul>',
  document.write.bind(document)
);

_go(
  users,
  _reject((user) => user.age < 20),
  f1
);
_go(
  users,
  _filter((user) => user.age < 20),
  f1
);

//  3. count_by, inc
