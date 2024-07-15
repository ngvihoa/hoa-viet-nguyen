/* 
    Base on the question and the example, I assume that n is integer and always >= 1.
    With n < 1, I will return 0.
*/

var sum_to_n_a = function (n) {
  // your code here
  // implementation using formula for summation of n
  if (n < 1) return 0;
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  // your code here
  // implementation using loop for summation of n
  if (n < 1) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

var sum_to_n_c = function (n) {
  // your code here
  // implementation using recursion for summation of n
  if (n < 1) return 0;
  if (n === 1) return n;
  return n + sum_to_n_c(n - 1);
};

console.log(`sum_to_n_a(${6}):`, sum_to_n_a(6)); // 21
console.log(`sum_to_n_b(${6}):`, sum_to_n_b(6)); // 21
console.log(`sum_to_n_c(${6}:)`, sum_to_n_c(6)); // 21

console.log(`sum_to_n_a(${18}):`, sum_to_n_a(18)); // 171
console.log(`sum_to_n_b(${18}):`, sum_to_n_b(18)); // 171
console.log(`sum_to_n_c(${18}):`, sum_to_n_c(18)); // 171

console.log(`sum_to_n_a(${0}):`, sum_to_n_a(0)); // 0
console.log(`sum_to_n_b(${-1}):`, sum_to_n_a(-1)); // 0
console.log(`sum_to_n_c(${-3}):`, sum_to_n_a(-3)); // 0
