function Vector(array) {
    if (array === undefined || array.length === 0) {
        throw "Invalid data for vector dimensions!";
    }
    this.dimensions = array;

    Vector.prototype.add = function(other) {
        var newDimensions = [];
        if (this.dimensions.length !== other.dimensions.length) {
            throw "Vectors dimensions are different";
        }

        for (var i = 0; i < this.dimensions.length; i++) {
            newDimensions[i] = this.dimensions[i] + other.dimensions[i];
        }

        return new Vector(newDimensions);
    }
    
    Vector.prototype.subtract = function (other) {
        var newDimensions = [];
        if (this.dimensions.length !== other.dimensions.length) {
            throw "Vectors dimensions are different";
        }
        
        for (var i = 0; i < this.dimensions.length; i++) {
            newDimensions[i] = this.dimensions[i] - other.dimensions[i];
        }
        
        return new Vector(newDimensions);
    }
    
    Vector.prototype.dot = function (other) {
        var sum = 0;
        if (this.dimensions.length !== other.dimensions.length) {
            throw "Vectors dimensions are different";
        }
        
        for (var i = 0; i < this.dimensions.length; i++) {
            sum += this.dimensions[i] * other.dimensions[i];
        }
        
        return sum;
    }
    
    Vector.prototype.norm = function () {
        var result = 0;
        for (var i = 0; i < this.dimensions.length; i++) {
            result += this.dimensions[i] * this.dimensions[i];
        }
        
        return Math.sqrt(result);
    }

    Vector.prototype.toString = function() {
        return "(" + this.dimensions.join(", ") + ")";
    }
}

var a = new Vector([1, 2, 3]);
var b = new Vector([4, 5, 6]);
var c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
console.log(a.toString());
console.log(c.toString());

var result = a.add(b);
console.log(result.toString());

var result = a.subtract(b);
console.log(result.toString());

var result = a.dot(b);
console.log(result.toString());

var a = new Vector([1, 2, 3]);
var b = new Vector([4, 5, 6]);
var c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
console.log(a.norm());
console.log(b.norm());
console.log(c.norm());
console.log(a.add(b).norm());