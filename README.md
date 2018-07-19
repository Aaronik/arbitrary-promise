# arbitrary-promise

ArbitraryPromise is a simple Promise library that allows you to make your own arbitrarily named resolve/then functions.

[![Travis](https://img.shields.io/travis/aaronik/arbitrary-promise.svg)](https://travis-ci.org/aaronik/arbitrary-promise)
[![Codecov](https://img.shields.io/codecov/c/github/aaronik/arbitrary-promise.svg)](https://codecov.io/gh/aaronik/arbitrary-promise)
[![npm](https://img.shields.io/npm/v/arbitrary-promise.svg)](https://npmjs.com/package/arbitrary-promise)

## Examples

Go with a classic:

```js
import ArbitraryPromise from 'arbitrary-promise'

const promise = new ArbitraryPromise([['resolve', 'then']])

promise.then(console.log)
promise.resolve('Mathematical!')
```

-> `Mathematical!`

Or, spice it up with what this library provides, customization!

```js
import ArbitraryPromise from 'arbitrary-promise'

const promise = new ArbitraryPromise([['handleData', 'onData']])

promise.onData(console.log)
promise.handleData('Whoa! Algebraic!')
```

-> `Whoa! Algebraic!`

Of course, the promise will also work in reverse order, it being a promise and all:

```js
import ArbitraryPromise from 'arbitrary-promise'

const promise = new ArbitraryPromise([['handleData', 'onData']])

promise.handleData('Whoa! Algebraic!')
promise.onData(console.log)
```

-> `Whoa! Algebraic!`

Check out [the tests](./test/module.spec.js) for all the info, of which there is not much more than what you already know :)
