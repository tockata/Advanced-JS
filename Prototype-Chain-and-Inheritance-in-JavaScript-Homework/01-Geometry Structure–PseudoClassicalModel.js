Object.prototype.extends = function(parent) {
    if (!Object.create) {
        Object.prototype.create = function(proto) {
            function F() {}
            F.prototype = proto;
            return new F();
        };
    }

    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

var Shapes = (function() {
    var Shape = (function() {
        function Shape(x, y, color) {
            this._x = x;
            this._y = y;
            this._color = color;
        }

        Shape.prototype.toString = function() {
            return 'Color: ' + this._color + ', Point: (x:' + this._x + ', y: ' + this._y + ')';
        };

        return Shape;
    }());

    var Circle = (function() {
        function Circle(x, y, color, radius) {
            Shape.call(this, x, y, color);
            this._radius = radius;
        }

        Circle.extends(Shape);

        Circle.prototype.toString = function() {
            return 'Shape: Circle, ' + Shape.prototype.toString.call(this) + ', Radius: ' + this._radius;
        };

        return Circle;
    }());

    var Rectangle = (function() {
        function Rectangle(x, y, color, width, height) {
            Shape.call(this, x, y, color);
            this._width = width;
            this._height = height;
        }

        Rectangle.extends(Shape);

        Rectangle.prototype.toString = function() {
            return 'Shape: Rectangle, ' + Shape.prototype.toString.call(this) +
                ', Width: ' + this._width + ', Height: ' + this._height;
        };

        return Rectangle;
    }());

    var Triangle = (function() {
        function Triangle(x, y, color, x2, y2, x3, y3) {
            Shape.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
            this._x3 = x3;
            this._y3 = y3;
        }

        Triangle.extends(Shape);

        Triangle.prototype.toString = function() {
            return 'Shape: Triangle, ' + Shape.prototype.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')' +
                ', Point 3: (x: ' + this._x3 + ', y: ' + this._y3 + ')';
        };

        return Triangle;
    }());

    var Line = (function() {
        function Line(x, y, color, x2, y2) {
            Shape.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
        }

        Line.extends(Shape);

        Line.prototype.toString = function() {
            return 'Shape: Line, ' + Shape.prototype.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')';
        };

        return Line;
    }());

    var Segment = (function() {
        function Segment(x, y, color, x2, y2) {
            Shape.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
        }

        Segment.extends(Shape);

        Segment.prototype.toString = function() {
            return 'Shape: Segment, ' + Shape.prototype.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')';
        };

        return Segment;
    }());

    return {
        Circle: Circle,
        Rectangle: Rectangle,
        Triangle: Triangle,
        Segment: Segment,
        Line: Line
    };
}());

var circle = new Shapes.Circle(50, 50, '#FF0000', 20);
var rectangle = new Shapes.Rectangle(150, 150, '#FFFF00', 120, 80);
var triangle = new Shapes.Triangle(300, 200, '#FF0000', 350, 250, 400, 210);
var line = new Shapes.Line(500, 50, '#123456', 600, 70);
var segment = new Shapes.Segment(600, 100, '#123456', 690, 70);
console.log(circle.toString());
console.log(rectangle.toString());
console.log(triangle.toString());
console.log(line.toString());
console.log(segment.toString());
