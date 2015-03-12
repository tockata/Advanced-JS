function printArgsInfo () {
    for (var i = 0; i < arguments.length; i++) {
        console.log("Value: " + arguments[i] +
            ", argument type: (" +
                (arguments[i] instanceof Array ? "array" : typeof(arguments[i])) +
                 ")");
    }
}

console.log(printArgsInfo.call());
console.log(printArgsInfo.call(null, 5, "name", false, NaN));

console.log(printArgsInfo.apply());
console.log(printArgsInfo.apply(null, [5, "name", false, NaN]));
