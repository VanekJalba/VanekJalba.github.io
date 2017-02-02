// --------------------------------------------
function pow(base, exponent) {
// --------------------------------------------
  if (!checkNatural(base) || !checkNatural(exponent) || !isNumeric(base) || !isNumeric(exponent)) {
    return NaN;
  }
  var result = base;
// --------------------------------------------
  for (var i = 1; i < Math.abs(exponent); i++) {
    result *= base;
  }
// --------------------------------------------
  if (exponent < 0) {
    result = (1 / result).toFixed(2);
  } else if (( +base != 0) && (+exponent === 0)) { 
    result = 1;
  }
  return result;
}
// --------------------------------------------
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// --------------------------------------------
function checkNatural(x) {
  return (parseInt(x) == x);
}
// --------------------------------------------
var num = prompt('Введите целое значение основания:', '');
var exp = prompt('Введите целое значение степени:', '');
// --------------------------------------------
if (isNumeric(pow(num, exp))) {
  console.log(num + ' ^ ' + exp + ' = ' + pow(num, exp));
} else { // --------------------------------------------
  console.log('Что-то пошло не так! Проверьте введенные данные');
}
