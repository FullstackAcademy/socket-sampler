module.exports = class EventEmitter {
  constructor () {
    this.subscriptions = {}
  }
  on (eventName, handler) {
    if (!this.subscriptions[eventName]) {
      this.subscriptions[eventName] = []
    }

    this.subscriptions[eventName].push(handler)
  }

  emit (eventName, payload) {
    if (this.subscriptions[eventName]) {
      this.subscriptions[eventName].forEach(handler => {
        handler(payload)
      })
    }
  }
}
