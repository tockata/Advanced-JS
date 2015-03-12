function testContext () {
    console.log(this);
}

function testTestContext(){
    testContext();
}

var test = new testContext(); // here "this" is the context of the newly created object

testContext(); // logs global "this"
testTestContext(); // logs the same result as calling testContext() - global "this"

console.log(test);
