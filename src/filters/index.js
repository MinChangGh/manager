export function nToBr(raw) {
  var reg = new RegExp("\\n", "ig");
  return raw.replace(reg, '<br>');
}

export function toFixedByNum(num, n = 2) {
  return num.toFixed(n);
}