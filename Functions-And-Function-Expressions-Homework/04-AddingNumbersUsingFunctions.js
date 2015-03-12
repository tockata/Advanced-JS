function add(a) {
    var sum = a;

    function addInner(b) {
        sum += b;
        return addInner;
    }

    addInner.toString = function() {
        return sum;
    };

    return addInner;
}

console.log(+add(1));
console.log(+add(2)(3));
console.log(+add(1)(1)(1)(1)(1));
console.log(+add(1)(0)(-1)(-1));

var addTwo = add(2);
console.log(+addTwo);
var addTwo = add(2);
console.log(+addTwo(3));
var addTwo = add(2);
console.log(+addTwo(3)(5));
