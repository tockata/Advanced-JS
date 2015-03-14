Object.prototype.extends = function(properties) {
    function f() {}
    var prop;
    f.prototype = Object.create(this);
    for (prop in properties) {
        f.prototype[prop] = properties[prop];
    }

    f.prototype._super = this;
    return new f();
};

var Shapes = (function() {
    var shape = {
        init: function init(x, y, color) {
            this._x = x;
            this._y = y;
            this._color = color;
            return this;
        },

        toString: function toString() {
            return 'Color: ' + this._color + ', Point: (x:' + this._x + ', y: ' + this._y + ')';
        }
    };

    var circle = shape.extends({
        init: function init(x, y, color, radius) {
            this._super.init.call(this, x, y, color);
            this._radius = radius;
            return this;
        },

        toString: function toString() {
            return 'Shape: Circle, ' + this._super.toString.call(this) + ', Radius: ' + this._radius;
        }
    });

    var rectangle = shape.extends({
        init: function init(x, y, color, width, height) {
            this._super.init.call(this, x, y, color);
            this._width = width;
            this._height = height;
            return this;
        },

        toString: function toString() {
            return 'Shape: Rectangle, ' + this._super.toString.call(this) +
                ', Width: ' + this._width + ', Height: ' + this._height;
        }
    });

    var triangle = shape.extends({
        init: function init(x, y, color, x2, y2, x3, y3) {
            this._super.init.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
            this._x3 = x3;
            this._y3 = y3;
            return this;
        },

        toString: function toString() {
            return 'Shape: Triangle, ' + this._super.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')' +
                ', Point 3: (x: ' + this._x3 + ', y: ' + this._y3 + ')';
        }
    });

    var line = shape.extends({
        init: function init(x, y, color, x2, y2) {
            this._super.init.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
            return this;
        },

        toString: function toString() {
            return 'Shape: Line, ' + this._super.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')';
        }
    });

    var segment = shape.extends({
        init: function init(x, y, color, x2, y2) {
            this._super.init.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
            return this;
        },

        toString: function toString() {
            return 'Shape: Segment, ' + this._super.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')';
        }
    });

    return {
        circle: circle,
        rectangle: rectangle,
        triangle: triangle,
        segment: segment,
        line: line
    };
}());


var circle = Object.create(Shapes.circle).init(50, 50, '#FF0000', 20);
var rectangle = Object.create(Shapes.rectangle).init(150, 150, '#FFFF00', 120, 80);
var triangle = Object.create(Shapes.triangle).init(300, 200, '#FF0000', 350, 250, 400, 210);
var line = Object.create(Shapes.line).init(500, 50, '#123456', 600, 70);
var segment = Object.create(Shapes.segment).init(600, 100, '#123456', 690, 70);
console.log(circle.toString());
console.log(rectangle.toString());
console.log(triangle.toString());
console.log(line.toString());
console.log(segment.toString());
