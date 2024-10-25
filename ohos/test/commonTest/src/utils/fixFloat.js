// https://zhuanlan.zhihu.com/p/87562425

// 兼容多种类型的表示
// 1.11 或者 1.11e-30 或者 1e-30
export function digitLength(num) {
  // 1.11 -> eSplit: ['1.11']
  // 1.11e-30 -> eSplit: ["1.11", "-30"]
  const eSplit = num.toString().split(/[eE]/);
  // 右边的 `|| ''` 为了防止 1e-30 -> eSplit: ["1", "-30"] 这种
  // 左边 1.11 有两个小数，右边 e 后面有 -30，所以是 2 - (-30) 为 32
  const len = (eSplit[0].split('.')[1] || '').length - Number(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

export function baseNum(num1, num2) {
  return Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
}

// 加法计算
export function plus(num1, num2) {
  const bn = baseNum(num1, num2);
  return (num1 * bn + num2 * bn) / bn;
}

// 减法计算
export function minus(num1, num2) {
  const bn = baseNum(num1, num2);
  return (num1 * bn - num2 * bn) / bn;
}

// 乘法计算
export function times(num1, num2) {
  const bn = digitLength(num1) + digitLength(num2);
  const intNum1 = num1 * Math.pow(10, digitLength(num1));
  const intNum2 = num2 * Math.pow(10, digitLength(num2));
  return (intNum1 * intNum2) / Math.pow(10, bn);
}

// 除法计算
export function divide(num1, num2) {
  const bn = baseNum(num1, num2);
  const intNum1 = num1 * bn;
  const intNum2 = num2 * bn;
  return intNum1 / intNum2;
}
