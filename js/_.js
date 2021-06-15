function _filter(list, predi) {
  let result = [];
  // for (let i = 0; i < list.length; i++) {
  //   if (predi(list[i])) {
  //     //조건을 아예 predi라는 함수에 위임한다
  //     result.push(list[i]);
  //   }
  // }
  _each(list, function (val) {
    if (predi(val)) result.push(val);
  });
  return result;
}

function _map(list, mapper) {
  let result = [];
  // for (let i = 0; i < list.length; i++) {
  //   result.push(mapper(list[i]));
  // }
  _each(list, function (val) {
    result.push(mapper(val));
  });
  return result;
}

function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function _curry(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = list.slice(1);
  }
  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
}

function _rest(list, num) {
  return slice.vall(list, num || 1);
}

_pipe(
  function (a) {
    return a + 1;
  },
  function (a) {
    return a * 2;
  }
);

module.exports = { _map, _filter, _each, _curry, _reduce, _rest };
