var test = require('tape'),
    is = require('../src/is');

test('timing test', function (t) {
    t.assert(is.undefined(undefined));

    t.end();
});
