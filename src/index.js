class ArbitraryPromise {
  constructor(passReceivePairs, shouldSaveCalls = true) {
    if (!this._validatePassReceivePairs(passReceivePairs))
      throw new Error("must pass in tuples of function names like [['handleData', 'onData'], ...]")

    this._createState()

    passReceivePairs.forEach(this._processPassReceivePair.bind(this, shouldSaveCalls))
  }

  // Remove all state. Useful for applications making heavy repeated use
  // of single promises.
  clear() {
    this._resetState()
  }

  // initialize state on prototype
  _createState() {
    this._state = {}
  }

  // free up the state
  _resetState() {
    Object.keys(this._state).forEach(stateKey => {
      this._state[stateKey] = []
    })
  }

  // attach the handlers / memory
  _processPassReceivePair(shouldSaveCalls, pair) {
    const [ pass, receive ] = pair

    const stateKey = '__state_' + pass
    const handlerKey = '__handler_' + receive

    // This will contain the data from every pass call
    this._state[stateKey] = []

    this[receive] = (handler) => {
      // set local handler for pass funk to call
      this[handlerKey] = handler

      // Get all data previously called from pass funk
      if (shouldSaveCalls)
        this._state[stateKey].forEach(args => handler(...args))

      // return this for chaining
      return this
    }

    this[pass] = (...args) => {
      // Save data for future receive assignments to get
      this._state[stateKey].push(args)

      // Call receive function with data
      if (shouldSaveCalls)
        this[handlerKey] && this[handlerKey](...args)

      // return this for chaining
      return this
    }

  }

  // Make sure user has passed in valid pairs
  _validatePassReceivePairs(passReceivePairs) {
    const isArray = Array.isArray(passReceivePairs)
    if (!isArray) return false

    const hasSomeEntries = passReceivePairs.length >= 1
    if (!hasSomeEntries) return false

    const isTuples = passReceivePairs.every(pair => {
      return pair.length === 2
    })
    if (!isTuples) return false

    const areStrings = passReceivePairs.every(pair => {
      return typeof pair[0] === 'string' &&
             typeof pair[1] === 'string'
    })
    if (!areStrings) return false

    return true
  }
}

module.exports = ArbitraryPromise
