(function (is) {
    is.array = function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };

    is.arrayOf = function (t) {
        return function (a) {
            var ok = is.array(a);

            if (is.defined(a)) {
                for (var i = 0; i < a.length && ok; i++) {
                    ok = t(a[i]);
                }
            }

            return !!ok;
        };
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
       return n !== n;
    };

    is.number = function (n) {
        return !is.object(n) && Object.prototype.toString.call(n) === '[object Number]';
    };

    is.object = function (o) {
        return !!o && o instanceof Object;
    };

    is.realNumber = function (n) {
        return is.number(n) &&
            n !== Infinity &&
            n !== -Infinity &&
            !is.nan(n);
    };

    is.string = function (s) {
        return !is.object(s) && Object.prototype.toString.call(s) === '[object String]';
    };

    is.undefined = function (o) {
        return (typeof o === 'undefined');
    };

    is.instanceOf = function (constructor) {
        return function (o) {
            return is.function(constructor) && (o instanceof constructor);
        };
    };

// this cryptic expression is fairly common with npm modules
// it exports the library via exports for node.js,
// and attaches to window in the browser
}(typeof exports === 'undefined' ? this.is = {} : exports, this));

