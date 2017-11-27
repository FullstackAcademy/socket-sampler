const express = require('express')
const { EventEmitter } = require('events')

const app = express()
const clock = new EventEmitter()

setInterval(() => {
  const time = (new Date()).toLocaleString()
  console.log(`got "time" ' ${time}`)
  clock.emit('tick', time)
}, 500)

app.get('/the-time', (req, res) => {
  let handler = time => {
    res.write(time)
    res.write('\n')
  }

  clock.addListener('tick', handler)
  req.on('close', () => {
    clock.removeListener('tick', handler)
  })
})

const keypress = require('keypress')

keypress(process.stdin)

const keys = new EventEmitter()

process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', ch)
  keys.emit('press', ch)
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause()
    process.exit()
  }
})

process.stdin.setRawMode(true)
process.stdin.resume()
app.get('/the-keys', (req, res) => {
  let handler = key => {
    res.write(key)
    res.write('\n')
  }

  keys.addListener('press', handler)
  req.on('close', () => {
    keys.removeListener('press', handler)
  })
})

app.listen(3333, () => {
  console.log('check out /the-time and /the-keys')
})
