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

module.exports = { _map, _filter, _each };
