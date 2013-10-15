var test = require('tape'),
    is = require('../src/is'),
    helper = {};

function runTests(data) {
    var testName = data.testName,
        passingInputs = data.passingInputs,
        failingInputs = data.failingInputs,
        fn = data.fn;

    test(testName, function (t) {
        var i;

        for (i = 0; i < passingInputs.length; i++) {
            t.assert(fn(passingInputs[i]));
        }

        for (i = 0; i < failingInputs.length; i++) {
            t.assert(!fn(failingInputs[i]));
        }

        t.end();
    });
}

runTests({
    testName      : 'is.array',
    fn            : is.array,
    passingInputs : [[], [1, 2, 3], ['a', 'b', 'c']],
    failingInputs : [null, undefined, 0, true, false, '', function () {}, {}]
});

runTests({
    testName      : 'is.boolean',
    fn            : is.boolean,
    passingInputs : [true, false],
    failingInputs : [null, undefined, [], 0, '', function () {}, {}]
});

runTests({
    testName      : 'is.defined',
    fn            : is.defined,
    passingInputs : [[], [1, 2, 3], -5, 0, 0.2, true, false, '', function () {}, {}],
    failingInputs : [null, NaN, Infinity, -Infinity, undefined]
});

runTests({
    testName      : 'is.function',
    fn            : is.function,
    passingInputs : [function () {}],
    failingInputs : [null, undefined, [], 0, true, false, '', {}]
});

runTests({
    testName      : 'is.integer',
    fn            : is.integer,
    passingInputs : [-1, 0, 1],
    failingInputs : [[], [1], [1, 2, 3], null, undefined, 0.2, NaN, Infinity, -Infinity, true, '', function () {}, {}]
});

runTests({
    testName      : 'is.nan',
    fn            : is.nan,
    passingInputs : [NaN],
    failingInputs : [[], null, undefined, -Infinity, Infinity, true, '', function () {}, {}]
});

runTests({
    testName      : 'is.number',
    fn            : is.number,
    passingInputs : [0, Infinity, Number.MAX_VALUE, NaN],
    failingInputs : [null, undefined, [], true, false, '5', function () {}, {}]
});

runTests({
    testName      : 'is.object',
    fn            : is.object,
    passingInputs : [{}, [], function () {}],
    failingInputs : [null, undefined, 0, true, false, '']
});

runTests({
    testName      : 'is.realNumber',
    fn            : is.realNumber,
    passingInputs : [0, -5, 0.2],
    failingInputs : [NaN, Infinity, -Infinity, [], [1, 2, 3], null, undefined, true, false, '', function () {}, {}]
});

runTests({
    testName      : 'is.string',
    fn            : is.string,
    passingInputs : ['', 'hello'],
    failingInputs : [null, undefined, [], ['a'], 0, true, false, function () {}]
});

runTests({
    testName      : 'is.undefined',
    fn            : is.undefined,
    passingInputs : [undefined],
    failingInputs : [NaN, Infinity, -Infinity, [], [1, 2, 3], null, true, false, '', function () {}, {}]
});
