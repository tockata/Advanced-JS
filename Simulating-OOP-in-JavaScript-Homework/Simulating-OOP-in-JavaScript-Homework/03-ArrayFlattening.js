Array.prototype.flatten = function() {
    var resultArray = [];
    var self = this;
    innerFlatten(self);

    function innerFlatten(array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] instanceof Array) {
                innerFlatten(array[i]);
            } else {
                resultArray.push(array[i]);
            }
        }
    }

    return resultArray;
}

var array = [1, 2, 3, 4];
console.log(array.flatten());

var array = [1, 2, [3, 4], [5, 6]];
console.log(array.flatten());
console.log(array); // Not changed

var array = [0, ["string", "values"], 5.5, [[1, 2, true], [3, 4, false]], 10];
console.log(array.flatten());
