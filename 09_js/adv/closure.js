function outer(){
    let count = 4;
    return function(){
        return ++count;
    }
}

let incre1 = outer();
console.log(incre1()); //5
console.log(incre1()); //6
console.log(incre1()); //7

let incre2 = outer();
console.log(incre2()); //5
console.log(incre2()); //6
console.log(incre1()); //8