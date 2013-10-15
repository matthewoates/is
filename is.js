(function (is) {
    is.array = function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };

    is.boolean = function (b) {
        return !!b === b;
    };

    is.defined = function (x) {
        return x !== null &&
            !is.undefined(x) &&
            x !== Infinity &&
            x !== -Infinity &&
            !is.nan(x);
    }

    is.function = function (f) {
        return Object.prototype.toString.call(f) === '[object Function]';
    };

    is.integer = function (x) {
        return is.number(x) && x % 1 === 0;
    }

    is.nan = function (n) {
        return is.number(n) && isNaN(n);
    };

    is.number = function (n) {
        return Object.prototype.toString.call(n) === '[object Number]';
    };

    is.object = function (o) {
        return new Object(o) === o;
    };

    is.realNumber = function (n) {
        return is.number(n) &&
            n !== Infinity &&
            n !== -Infinity &&
            !is.nan(n);
    };

    is.string = function (s) {
        return Object.prototype.toString.call(s) === '[object String]';
    };

    is.undefined = function (o) {
        return (typeof o === 'undefined');
    };
}(typeof exports === 'undefined' ? this.tj = {} : exports));
