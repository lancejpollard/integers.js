
const fs = require('fs')
const numbers = require('.')
const MAX = 10000
const CHUNK = 5000

listStar()

async function listStar() {
  await write(`star`)
}

async function listTriangularNumbers() {
  await write(`triangular`)
}

async function write(type) {
  const stream = fs.createWriteStream(`list/${type}.csv`, { flags: 'w+' })
  await chunk(stream, 2, MAX, (i, n) => list(type, i, n))
}

async function chunk(stream, start, end, callback) {
  return new Promise((res, rej) => {
    compute(start)

    function compute(s) {
      let n = Math.min(s + CHUNK, end)
      const numbers = callback(s, n)
      const written = stream.write(`${numbers.join('\n')}\n`)
      if (!written) {
        stream.once('drain', () => {
          process.nextTick(next)
        })
      } else {
        process.nextTick(next)
      }

      function next() {
        if (n === end) {
          return res()
        }
        compute(s + CHUNK)
      }
    }
  })
}

function list(type, i, n) {
  console.log(`${type} => ${i}...${n}`)
  const array = []
  numbers[type](i, n, x => array.push(x))
  return array
}
