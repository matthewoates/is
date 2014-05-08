var assert = require('assert'),
    is = require('./is');

function runTests(data) {
    var testName = data.testName,
        passingInputs = data.passingInputs,
        failingInputs = data.failingInputs,
        fn = data.fn,
        i;

    describe(testName, function () {
        it('testing passing cases', function () {
            for (i = 0; i < passingInputs.length; i++) {
                assert.equal(fn(passingInputs[i]), true);
            }
        });

        it('testing failing cases', function () {
            for (i = 0; i < passingInputs.length; i++) {
                assert.equal(fn(failingInputs[i]), false);
            }
        });
    });
}

runTests({
    testName      : 'is.array',
    fn            : is.array,
    passingInputs : [[], [1, 2, 3], ['a', 'b', 'c']],
    failingInputs : [null, undefined, 0, true, false, '', function () {}, {}]
});

// if all of the other tests pass, it is sufficient to test is.arrayOf
// with only one function that does not always return true or false
runTests({
    testName      : 'is.arrayOf',
    fn            : is.arrayOf(is.number),
    passingInputs : [[1, 2, 3], [0], []],
    failingInputs : [[{}], [1, 2, {}], [1, {}, 3], [{}, 2, 3], {}, null, undefined, Infinity, 0]
});

runTests({
    testName      : 'is.bool',
    fn            : is.bool,
    passingInputs : [true, false],
    failingInputs : [null, undefined, [], 0, '', function () {}, {}, new Boolean(true), new Boolean(false)]
});

runTests({
    testName      : 'is.defined',
    fn            : is.defined,
    passingInputs : [[], [1, 2, 3], -5, 0, 0.2, true, false, '', function () {}, {}],
    failingInputs : [null, NaN, Infinity, -Infinity, undefined]
});

runTests({
    testName      : 'is.fn',
    fn            : is.fn,
    passingInputs : [function () {}, new Function()],
    failingInputs : [null, undefined, [], 0, true, false, '', {}]
});

runTests({
    testName      : 'is.integer',
    fn            : is.integer,
    passingInputs : [-1, 0, 1],
    failingInputs : [[], [1], [1, 2, 3], null, undefined, 0.2, NaN, Infinity, -Infinity, true, '', function () {}, {}, new Number(5)]
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
    failingInputs : [null, undefined, [], true, false, '5', function () {}, {}, new Number(5)]
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
    failingInputs : [NaN, Infinity, -Infinity, [], [1, 2, 3], null, undefined, true, false, '', function () {}, {}, new Number(5)]
});

runTests({
    testName      : 'is.string',
    fn            : is.string,
    passingInputs : ['', 'hello'],
    failingInputs : [null, undefined, [], ['a'], 0, true, false, function () {}, new String('foo')]
});

runTests({
    testName      : 'is.undefined',
    fn            : is.undefined,
    passingInputs : [undefined],
    failingInputs : [NaN, Infinity, -Infinity, [], [1, 2, 3], null, true, false, '', function () {}, {}]
});

function Foo() {}

runTests({
    testName      : 'is.instanceOf',
    fn            : is.instanceOf(Foo),
    passingInputs : [new Foo()],
    failingInputs : [{}, [], null, undefined, NaN, Infinity]
});

