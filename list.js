
const fs = require('fs')
const numbers = require('.')
const MAX = 10000
const CHUNK = 5000

// listPow5()
// listPow7()
// listStar()
// listTriangular()
// listTetrahedral()
// listSquarePyramidal()
// listPow3()
// listStellaOctangula()
// listNatural()
// listSuperPrime()
// listSafePrime()
// listSophieGermainPrime()
// listCenteredHeptagonal()
// listHeptagonal()
// listDivisors()

// listNgonalPyramidals()

listCenteredPolygonals()

function listCenteredPolygonals() {
  let x = 11n
  while (x > 2n) {
    write(`${x--}_centered_polygonal`, 1, 1024)
  }
}

function listNgonalPyramidals() {
  let x = 20n
  while (x > 2n) {
    write(`${x--}_gonal_pyramidal`, 1, 1024)
  }
}

function listMultiples() {
  let x = 999n
  while (x > 2n) {
    write(`multiple_${x}`, 1, 1024)
    x--
  }
}

async function listDivisors() {
  await write(`divisors`, 1, 65536)
}

async function listHeptagonal() {
  await write(`heptagonal`, 1, 65536)
}

async function listCenteredHeptagonal() {
  await write(`centeredHeptagonal`, 1, 65536)
}

async function listSophieGermainPrime() {
  await write(`sophieGermainPrime`, 1, 65536)
}

async function listSafePrime() {
  await write(`safePrime`, 1, 65536)
}

async function listSuperPrime() {
  await write(`superPrime`, 1, 65536)
}

async function listNatural() {
  await write(`natural`, 1, 65536)
}

async function listStellaOctangula() {
  await write(`stellaOctangula`, 1, 1000000)
}

async function listSquarePyramidal() {
  await write(`squarePyramidal`, 1, 1000000)
}

async function listTetrahedral() {
  await write(`tetrahedral`, 1, 1000000)
}

async function listPow5() {
  await write(`pow5`, 1, 65536)
}

async function listPow7() {
  await write(`pow7`, 1, 65536)
}

async function listPow3() {
  await write(`pow3`, 1, 65536)
}

async function listPow2() {
  await write(`pow2`, 1, 65536)
}

async function listStar() {
  await write(`star`, 2, 1000000)
}

async function listTriangular() {
  await write(`triangular`, 2, 1000000)
}

async function write(type, min, max) {
  const stream = fs.createWriteStream(`integers.js/list/${type}.csv`, { flags: 'w+' })
  await chunk(stream, min, max, (i, n, s) => list(type, i, n, s))
}

async function chunk(stream, start, size, callback) {
  return new Promise((res, rej) => {
    const end = start + size - 1

    compute(start)

    function compute(s, inputState) {
      let n = Math.min(s + CHUNK, end)
      const [numbers, outputState] = callback(s, n, inputState)
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
        compute(s + CHUNK + 1, outputState)
      }
    }
  })
}

function list(type, i, n, s) {
  console.log(`${type} => ${i}...${n}`)
  const array = []
  const state = numbers[type](i, n, x => array.push(x), s)
  return [array, state]
}
