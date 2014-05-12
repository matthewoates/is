(function (is) {
    is.object = function (val) {
        return val instanceof Object;
    };

    is.function = function (val) {
        return val instanceof Function;
    };

    is.array = function (val) {
        return val instanceof Array;
    };

    is.instanceOf = function (constructor) {
        return function (val) {
            return is.function(constructor) && (val instanceof constructor);
        };
    };

    is.number = function (val) {
        return Number(val) === val || is.nan(val);
    };

    is.undefined = function (val) {
        return (typeof val === 'undefined');
    };

    is.string = function (val) {
        return typeof val === 'string';
    };

    is.nan = function (val) {
       return val !== val;
    };

    is.boolean = function (val) {
        return !!val === val;
    };

    is.integer = function (val) {
        return is.number(val) && val % 1 === 0;
    }

    is.arrayOf = function (typeFn) {
        return function (val) {
            var ok = is.array(val);

            if (val) { // a truthy check will suffice, instead if is.defined(val)
                for (var i = 0; i < val.length && ok; i++) {
                    ok = typeFn(val[i]);
                }
            }

            return !!ok;
        };
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


// this cryptic expression is fairly common with npm modules
// it exports the library via exports for node.js,
// and attaches to window in the browser
}(typeof exports === 'undefined' ? this.is = {} : exports, this));

