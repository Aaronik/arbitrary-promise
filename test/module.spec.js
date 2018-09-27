/* eslint-env mocha */
import { expect } from 'chai'
import ArbitraryPromise from '../src/index'

describe('ArbitraryPromise', () => {
  it('is properly exported', () => {
    expect(ArbitraryPromise).to.be.a('function')
  })

  it('throws with no input', () => {
    expect(() => { new ArbitraryPromise() }).to.throw()
  })

  it('throws with malformed input', () => {
    expect(() => { new ArbitraryPromise('bob') }).to.throw()
    expect(() => { new ArbitraryPromise(['bob']) }).to.throw()
    expect(() => { new ArbitraryPromise(['bob', 'jim']) }).to.throw()
  })

  describe('when given well formed input', () => {

    const pass = 'pass'
    const receive = 'receive'
    const passReceivePairs = [[pass, receive]]

    let arbitraryPromise

    beforeEach(() => {
      arbitraryPromise = new ArbitraryPromise(passReceivePairs)
    })

    it('has clear attribute', () => {
      expect(arbitraryPromise).to.have.property('clear')
    })

    it('assigns pass/receive methods to prototype', () => {
      expect(arbitraryPromise).to.have.property(pass)
      expect(arbitraryPromise).to.have.property(receive)
    })

    describe('when a receive function is given', () => {

      let receivedData = null

      beforeEach(() => {
        arbitraryPromise[receive](data => { receivedData = data })
      })

      afterEach(() => {
        receivedData = null
      })

      it('calls it with passed data', () => {
        const data = 'jim'

        arbitraryPromise[pass](data)
        expect(receivedData).to.eq(data)
      })

      it('allows for chained calls', () => {
        const data = 'bubblegum'
        const ret = arbitraryPromise[pass](data)
        expect(ret).to.be.an('object')
        expect(ret).to.have.property('clear')
      })

      it('handles multiple arguments', () => {
        const data1 = 'herald'
        const data2 = 'ruth'
        arbitraryPromise[pass](data1, data2)[receive]((d1, d2) => {
          expect(d1).to.eq(data1)
          expect(d2).to.eq(data2)
        })
      })
    })

    describe('before a receive function is given', () => {

      it('allows pass function to be called', () => {
        const data = 'fred'

        expect(arbitraryPromise[pass].bind(null, data)).to.not.throw()
      })
    })

    describe('when a pass function is called before a receive function', () => {

      const data = 'barney'
      let receivedData1 = null
      let receivedData2 = null

      beforeEach(() => {
        arbitraryPromise[pass](data)
        arbitraryPromise[receive](data => receivedData1 = data)
        arbitraryPromise[receive](data => receivedData2 = data)
      })

      afterEach(() => {
        receivedData1 = null
        receivedData2 = null
      })

      it('calls receive function with previously passed data', () => {
        expect(receivedData1).to.eq(data)
      })

      it('calls a second receive function with previously passed data', () => {
        expect(receivedData2).to.eq(data)
      })

      describe('and then clear is called', () => {

        let receivedData = null

        beforeEach(() => {
          arbitraryPromise.clear()
          arbitraryPromise[receive](data => receivedData = data)
        })

        it('no longer populates new calls with old data', () => {
          expect(receivedData).to.eq(null)
        })
      })
    })
  })

  describe('when instructed to not save state', () => {

    const pass = 'pass'
    const receive = 'receive'
    const passReceivePairs = [[pass, receive]]
    const promise = new ArbitraryPromise(passReceivePairs, false)

    describe('and given a handler after a call', () => {

      let receivedData

      beforeEach(() => {
        promise[pass]('data')
        promise[receive](data => receivedData = data)
      })

      it('does not populate call', () => {
        expect(receivedData).to.eq(undefined)
      })
    })

  })
})

