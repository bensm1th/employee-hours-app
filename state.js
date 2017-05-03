const firstRe = /^\d+/g;
const secondRe = /\d+$/g;
const matched1 = ('2:15').match(firstRe);
const matched2 = ('2:15').match(secondRe);
console.log(matched1);
console.log(matched2);