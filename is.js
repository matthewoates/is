(function (is) {
    is.optional = function (type) {
        return function (val) {
            return is.undefined(val) || type(val);
        };
    };

    is.any = function (val) {
        return true;
    };

    is.object = function (val) {
        return val instanceof Object;
    };

    is.fn = function (val) {
        return val instanceof Function;
    };

    is.array = function (val) {
        return val instanceof Array;
    };

    is.instanceOf = function (constructor) {
        return function (val) {
            return is.fn(constructor) && (val instanceof constructor);
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

            for (var i = 0; ok && i < val.length; i++) {
                ok = typeFn(val[i]);
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

    is.matchingSchema = function (schema) {
        // we can assume schema is a function or object
        return function (data) {
            // if schema is an object, data must be an object
            var result = (is.object(schema) && is.object(data)) || is.fn(schema);

            for (var key in schema) {
                if (!result) break;

                if (schema.hasOwnProperty(key)) {
                    if (is.fn(schema[key])) {
                        result = schema[key](data[key]);
                    } else if (is.object(schema[key])) {
                        result = is.matchingSchema(schema[key])(data[key]);
                    } else {
                        result = false;
                    }
                }
            }

            // make sure that data doesn't have any extra keys
            for (var key in data) {
                if (data.hasOwnProperty(key) && !schema.hasOwnProperty(key)) {
                    result = false;
                }
            }

            return result;
        };
    };

// this cryptic expression is fairly common with npm modules
// it exports the library via exports for node.js,
// and attaches to window in the browser
}(typeof exports === 'undefined' ? this.is = {} : exports, this));

