# IS (simple-is)
*Quick, easy, and lightweight type checking*

# Why?

Type checking should be simple. This library does that, in as simple of a way that I can think of. It's easy to get tripped up with some of the neuances of JavaScript (such as `typeof null === "object"`, or `isNaN("wtf") === true`), and this library aims to prevent that.

# Installation

### Node.js
`npm install simple-is`

### In the browser
`<script src="is.js"/>`

# Usage

```javascript
// simple type checking
console.log(is.number(5)); // true
console.log(is.integer(2.5)); // false
console.log(is.function(console.log)); // true

// complex type checking
function Point(x, y) {
    this.x = x;
    this.y = y;
}

var point = new Point(2, 4);
var fakePoint = {x: 2, y: 4};

console.log(is.instanceOf(Point)(p)); // true
console.log(is.instanceOf(Point((fakePoint)); // false

// even more complex type checking
console.log(is.arrayOf(is.number)([1, 2, 3])); // true
console.log(is.arrayOf(is.instanceOf(Point))([point])); // true
```

### Using your own functions
You can easily extend `IS` by adding your own functions. These functions can also be passed in to `is.arrayOf`.
```javascript
is.even = function (x) {
    return x % 2 === 0;
};

console.log(is.even(4)); // true
console.log(is.arrayOf(is.even)([2, 4, 6, 8])); // true
```

# Matching Basic JavaScript Types
*NOTE: `typeof null === "object"`, but `IS` considers null to not be an object*

| matches                                 | is.array | is.number | is.bool | is.string | is.fn | is.object |
|-----------------------------------------|----------|-----------|---------|-----------|-------|-----------|
| null, undefined                         | no       | no        | no      | no        | no    | no        |
| NaN, Infinity                           | no       | yes       | no      | no        | no    | no        |
| 0, 2, -5                                | no       | yes       | no      | no        | no    | no        |
| 0.5, Math.PI                            | no       | yes       | no      | no        | no    | no        |
| true, false                             | no       | no        | yes     | no        | no    | no        |
| "", "hello"                             | no       | no        | no      | yes       | no    | no        |
| [], [1, 2, 3]                           | yes      | no        | no      | no        | no    | yes       |
| {}                                      | no       | no        | no      | no        | no    | yes       |
| function () {}, console, window, Object | no       | no        | no      | no        | yes   | yes       |

# Special Types
*NOTE: we treat `""` as defined*

| matches                                 | is.defined | is.realNumber | is.integer |
|-----------------------------------------|------------|---------------|------------|
| null, undefined                         | no         | no            | no         |
| NaN, Infinity                           | no         | no            | no         |
| 0, 2, -5                                | yes        | yes           | yes        |
| 0.5, Math.PI                            | yes        | yes           | no         |
| true, false                             | yes        | no            | no         |
| "", "hello"                             | yes        | no            | no         |
| [], [1, 2, 3]                           | yes        | no            | no         |
| {}                                      | yes        | no            | no         |
| function () {}, console, window, Object | yes        | no            | no         |

# Testing
```
npm install -g mocha
npm test
```

# License
MIT
