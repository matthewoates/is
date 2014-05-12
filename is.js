(function (is) {
    is.array = function (val) {
        return Object.prototype.toString.call(val) === '[object Array]';
    };

    is.function = function (val) {
        return Object.prototype.toString.call(val) === '[object Function]';
    };

    is.number = function (val) {
        return !is.object(val) && Object.prototype.toString.call(val) === '[object Number]';
    };

    is.string = function (val) {
        return !is.object(val) && Object.prototype.toString.call(val) === '[object String]';
    };

    is.arrayOf = function (typeFn) {
        return function (val) {
            var ok = is.array(val);

            if (is.defined(val)) {
                for (var i = 0; i < val.length && ok; i++) {
                    ok = typeFn(val[i]);
                }
            }

            return !!ok;
        };
    };

    is.nan = function (val) {
       return val !== val;
    };

    is.boolean = function (val) {
        return !!val === val;
    };

    is.defined = function (val) {
        return val !== null &&
            !is.undefined(val) &&
            val !== Infinity &&
            val !== -Infinity &&
            !is.nan(val);
    }

    is.realNumber = function (val) {
        return is.number(val) &&
            val !== Infinity &&
            val !== -Infinity &&
            !is.nan(val);
    };

    is.integer = function (val) {
        return is.number(val) && val % 1 === 0;
    }

    is.object = function (val) {
        return !!val && val instanceof Object;
    };

    is.undefined = function (val) {
        return (typeof val === 'undefined');
    };

    is.instanceOf = function (constructor) {
        return function (val) {
            return is.function(constructor) && (val instanceof constructor);
        };
    };

// this cryptic expression is fairly common with npm modules
// it exports the library via exports for node.js,
// and attaches to window in the browser
}(typeof exports === 'undefined' ? this.is = {} : exports, this));

