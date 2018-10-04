


for (let number = 1; number <= 100; number++) {
  let print = "";
  if (number % 3 == 0) print += "Fizz";
  if (number % 5 == 0) print += "Buzz";
  console.log(print, number);
}
