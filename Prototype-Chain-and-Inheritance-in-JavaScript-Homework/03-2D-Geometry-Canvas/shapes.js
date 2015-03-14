var i,
    canvas,
    ctx,
    acceptedCharacters;

canvas = document.getElementById('myCanvas');
canvas.width = 700;
canvas.height = 500;
ctx = canvas.getContext("2d");

Object.prototype.extends = function (parent) {
  if (!Object.create) {
    Object.prototype.create = function (proto) {
      function F() {}
      F.prototype = proto;
      return new F();
    };
  }

  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

function isValidHexColor (colorToCheck) {
    acceptedCharacters = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f' ];
    for (i = 1; i < colorToCheck.length; i++) {
        if (acceptedCharacters.indexOf(colorToCheck[i].toLowerCase()) < 0) {
            return false;
        }
    }

    return true;
}

function areValidArgumens (args) {
    for (i = 0; i < args.length; i++) {
        if (typeof(args[i]) === 'undefined') {
            return false;
        }

        if (i !== 2 && (typeof(args[i]) !== 'number' || args[i] < 0)) {
            return false;
        }
    }

    return true;
}

var Shapes = (function () {
    var Shape = (function () {
        function Shape (x, y, color) {
            if (arguments.length !== 3 || !areValidArgumens(arguments)) {
                throw new Error('There is missing or incorrect argument!');
            }

            if (color[0] !== '#' || color.length !== 7 || !isValidHexColor(color)) {
                throw new SyntaxError('Invalid color: color must be in hex format!');
            }

            this._x = x;
            this._y = y;
            this._color = color;
        }

        Shape.prototype.toString = function () {
            return 'Color: ' + this._color + ', Point: (x:' + this._x + ', y: ' + this._y + ')';
      };

      Shape.prototype.draw = function () {
          ctx.beginPath();
          ctx.fillStyle = this._color;
      };

    return Shape;
    }());

    var Circle = (function () {
        function Circle (x, y, color, radius) {
            if (arguments.length !== 4 || !areValidArgumens(arguments)) {
                throw new Error('There is missing or incorrect argument!');
            }

            Shape.call(this, x, y, color);
            this._radius = radius;
        }

        Circle.extends(Shape);

        Circle.prototype.toString = function () {
            return 'Shape: Circle, ' + Shape.prototype.toString.call(this) + ', Radius: ' + this._radius;
        };

        Circle.prototype.draw = function() {
          Shape.prototype.draw.call(this);
          ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        };

        return Circle;
    }());

    var Rectangle = (function () {
        function Rectangle (x, y, color, width, height) {
            if (arguments.length !== 5 || !areValidArgumens(arguments)) {
                throw new Error('There is missing or incorrect argument!');
            }

            Shape.call(this, x, y, color);
            this._width = width;
            this._height = height;
        }

        Rectangle.extends(Shape);

        Rectangle.prototype.toString = function () {
            return 'Shape: Rectangle, ' + Shape.prototype.toString.call(this) +
            ', Width: ' + this._width + ', Height: ' + this._height;
        };

        Rectangle.prototype.draw = function() {
          Shape.prototype.draw.call(this);
          ctx.rect(this._x, this._y, this._width, this._height);
          ctx.fill();
          ctx.stroke();
        };

        return Rectangle;
    }());

    var Triangle = (function () {
        function Triangle (x, y, color, x2, y2, x3, y3) {
            if (arguments.length !== 7 || !areValidArgumens(arguments)) {
                throw new Error('There is missing or incorrect argument!');
            }

            Shape.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
            this._x3 = x3;
            this._y3 = y3;
        }

        Triangle.extends(Shape);

        Triangle.prototype.toString = function () {
            return 'Shape: Triangle, ' + Shape.prototype.toString.call(this) +
              ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')' +
              ', Point 3: (x: ' + this._x3 + ', y: ' + this._y3 + ')';
        };

        Triangle.prototype.draw = function() {
          Shape.prototype.draw.call(this);
          ctx.moveTo(this._x, this._y);
          ctx.lineTo(this._x2, this._y2);
          ctx.lineTo(this._x3, this._y3);
          ctx.fill();
          ctx.stroke();
        };

        return Triangle;
    }());

    var Line = (function () {
        function Line (x, y, color, x2, y2) {
            if (arguments.length !== 5 || !areValidArgumens(arguments)) {
                throw new Error('There is missing or incorrect argument!');
            }

            Shape.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
        }

        Line.extends(Shape);

        Line.prototype.toString = function () {
            return 'Shape: Line, ' + Shape.prototype.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')';
        };

        Line.prototype.draw = function() {
          Shape.prototype.draw.call(this);
          ctx.moveTo(this._x, this._y);
          ctx.lineTo(this._x2, this._y2);
          ctx.fill();
          ctx.stroke();
        };

        return Line;
    }());

    var Segment = (function () {
        function Segment (x, y, color, x2, y2) {
            if (arguments.length !== 5 || !areValidArgumens(arguments)) {
                throw new Error('There is missing or incorrect argument!');
            }

            Shape.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
        }

        Segment.extends(Shape);

        Segment.prototype.toString = function () {
            return 'Shape: Segment, ' + Shape.prototype.toString.call(this) +
                ', Point 2: (x: ' + this._x2 + ', y: ' + this._y2 + ')';
        };

        Segment.prototype.draw = function() {
          Shape.prototype.draw.call(this);
          ctx.moveTo(this._x, this._y);
          ctx.lineTo(this._x2, this._y2);
          ctx.fill();
          ctx.stroke();
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

var circle = new Shapes.Circle(50, 50, '#FF0000', 35);
var rectangle = new Shapes.Rectangle(150, 150, '#FFFF00', 120, 80);
var triangle = new Shapes.Triangle(300, 200, '#33AABB', 350, 250, 400, 210);
var line = new Shapes.Line(400, 50, '#123456', 600, 70);
var segment = new Shapes.Segment(550, 100, '#123456', 690, 70);
console.log(circle.toString());
console.log(rectangle.toString());
console.log(triangle.toString());
console.log(line.toString());
console.log(segment.toString());
circle.draw();
rectangle.draw();
triangle.draw();
line.draw();
segment.draw();
