function countB(word){
  let count = 0;
  for (var i = 0; i < word.length; i++){
      const char = word[i];
      if (char == 'B'){
        count++
      }
  }
  return count
}
console.log(countB('BBBBBBBBBB'));
