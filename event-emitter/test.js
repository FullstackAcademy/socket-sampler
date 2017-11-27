const EventEmitter = require('./event-emitter')
const { assert } = require('chai')

describe('EventEmitter', () => {
  let subject
  beforeEach(() => subject = new EventEmitter())

  it('emits events to subscribers when event is emitted', () => {
    let called = false
    subject.on('eventName', () => called = true)
    subject.emit('eventName')
    assert.isTrue(called)
  })

  it('only triggers matching subscriptions', () => {
    let called = false
    subject.on('eventName', () => called = true)
    subject.on('eventName2', () => {})
    subject.emit('eventName2')
    assert.isFalse(called)
  })

  it('emits payload data', () => {
    let payload
    subject.on('eventName', (givenPayload) => payload = givenPayload)
    subject.emit('eventName', 'payload')
    assert.equal(payload, 'payload')
  })
})
