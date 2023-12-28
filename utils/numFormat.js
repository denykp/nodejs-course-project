const numFormat = (value) => {
  let tempValue = [...value.toString()].reverse();
  let result = [];
  do {
    result.push(tempValue.splice(0, 3).reverse().join(""));
  } while (tempValue.length);
  return result.reverse().join(".");
};

module.exports = numFormat;
