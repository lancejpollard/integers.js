
const fs = require('fs')
const numbers = require('.')
const MAX = 10000
const CHUNK = 5000

listPow2()
listStar()
listTriangular()

async function listPow2() {
  await write(`pow2`, 1, 256)
}

async function listStar() {
  await write(`star`, 2, 1000000)
}

async function listTriangular() {
  await write(`triangular`, 2, 1000000)
}

async function write(type, min, max) {
  const stream = fs.createWriteStream(`list/${type}.csv`, { flags: 'w+' })
  stream.write(`number,\n`)
  await chunk(stream, min, max, (i, n) => list(type, i, n))
}

async function chunk(stream, start, end, callback) {
  return new Promise((res, rej) => {
    compute(start)

    function compute(s) {
      let n = Math.min(s + CHUNK, end)
      const numbers = callback(s, n)
      const written = stream.write(`${numbers.join(',\n')},\n`)
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
