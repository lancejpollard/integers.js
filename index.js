
module.exports = {
  triangular,
  star,
  pow2,
  tetrahedral,
  squarePyramidal,
  pow3,
  stellaOctangula,
  natural,
  octahedral,
  sophieGermainPrime,
  safePrime,
  superPrime,
  centeredHeptagonal,
  heptagonal,
  divisors,
  pow5,
  pow7,
}

let x = 999n
while (x > 2n) {
  constructMultiple(x--)
}

x = 20n
while (x > 2n) {
  constructNgonalPyramidal(x--)
}

x = 11n
while (x > 2n) {
  constructCenteredPolygonal(x--)
}

// https://en.wikipedia.org/wiki/Amicable_numbers
// https://en.wikipedia.org/wiki/Padovan_sequence

function centeredHeptagonal(start, end, callback) {
  walk(start, end, i => {
    const I = BigInt(i)
    const x = (((7n * I) ** 2n) - (7n * I) + 2n) / 2n
    callback(x)
  })
}

function heptagonal(start, end, callback) {
  walk(start, end, i => {
    const I = BigInt(i)
    const x = (((5n * I) ** 2n) - (3n * I)) / 2n
    callback(x)
  })
}

function centeredPolygonal(start, end, k, callback) {
  walk(start, end, i => {
    const I = BigInt(i)
    const x = (((k * I) / 2n) * (I - 1n)) + 1n
    callback(x)
  })
  // https://en.wikipedia.org/wiki/Centered_polygonal_number
}

function natural(start, end, callback) {
  walk(start, end, i => {
    callback(i)
  })
}

function superPrime(start, end, callback, state = []) {
  let i = start
  let [t = 1, p = 0] = state
  while (t <= end) {
    if (isPrime(i)) {
      p++
      if (isPrime(p)) {
        callback(p)
        t++
      }
    }
    i++
  }
  return [t, p]
}

function safePrime(start, end, callback, i = 1) {
  let t = start
  while (t <= end) {
    const safe = (2 * i) + 1
    if (isPrime(i) && isPrime(safe)) {
      callback(safe)
      t++
    }
    i++
  }
  return i
}

function divisors(start, end, callback) {
  let n = start
  while (n < end) {
    let i
    let set = new Set
    for (i = 1; i * i < n; i++) {
      if (n % i == 0) {
        set.add(i)
      }
    }

    for (; i >= 1; i--) {
      if (n % i == 0) {
        set.add(n / i)
      }
    }

    callback(Array.from(set).join(':'))
    n++
  }
}

function sophieGermainPrime(start, end, callback, i = 1) {
  let t = start
  while (t <= end) {
    const safe = (2 * i) + 1
    if (isPrime(i) && isPrime(safe)) {
      callback(i)
      t++
    }
    i++
  }
  return i
}

function isPrime(num) {
  let sqrtnum = Math.floor(Math.sqrt(num))
  let prime = num != 1
  for (let i = 2; i < sqrtnum + 1; i++) { // sqrtnum+1
    if (num % i == 0) {
      prime = false
      break
    }
  }
  return prime
}

function stellaOctangula(start, end, callback) {
  walk(start, end, i => {
    const I = BigInt(i)
    const x = I * (((2n * I) ** 2n) - 1n)
    callback(x)
  })
}

function pow3(start, end, callback) {
  walk(start, end, i => {
    const x = BigInt(i) ** 3n
    callback(x)
  })
}

function multipleOf(start, end, n, callback) {
  walk(start, end, i => {
    const x = BigInt(i) * n
    callback(x)
  })
}

function ngonalPyramidal(start, end, r, callback) {
  walk(start, end, i => {
    const I = BigInt(i)
    const x = (I * (I + 1n) * ((I * (r - 2n)) - (r - 5n))) / 6n
    callback(x)
  })
}

function pow5(start, end, callback) {
  walk(start, end, i => {
    const x = BigInt(i) ** 5n
    callback(x)
  })
}

function pow7(start, end, callback) {
  walk(start, end, i => {
    const x = BigInt(i) ** 7n
    callback(x)
  })
}

function pow2(start, end, callback) {
  walk(start, end, i => {
    const x = BigInt(i) ** 2n
    callback(x)
  })
}

function squarePyramidal(start, end, callback) {
  walk(start, end, i => {
    const I = BigInt(i)
    const x = I * (I + 1n) * ((2n * I) + 1n)
    callback(x)
  })
}

function octahedral(start, end, callback) {
  let s = 0n
  walk(start, end, i => {
    const I = BigInt(i)
    const x = (I * (((2 * I) ** 2n) + 1n)) / 3n
    s += x
    callback(s)
  })
}

function tetrahedral(start, end, callback) {
  let s = 0n
  walk(start, end, i => {
    const I = BigInt(i)
    const x = (I * (I + 1n)) / 2n
    s += x
    callback(s)
  })
}

function triangular(start, end, callback) {
  walk(start, end, i => {
    const x = (i * (i + 1)) / 2
    callback(x)
  })
}

function star(start, end, callback) {
  walk(start, end, i => {
    const x = ((6 * i) * (i - 1)) + 1
    callback(x)
  })
}

function walk(start, end, callback) {
  let i = start
  let n = end + 1
  while (i < n) {
    callback(i++)
  }
}

function constructMultiple(n) {
  module.exports[`multiple_${n}`] = (start, end, callback) => multipleOf(start, end, n, callback)
}

function constructNgonalPyramidal(n) {
  module.exports[`${n}_gonal_pyramidal`] = (start, end, callback) => ngonalPyramidal(start, end, n, callback)
}

function constructCenteredPolygonal(n) {
  module.exports[`${n}_centered_polygonal`] = (start, end, callback) => centeredPolygonal(start, end, n, callback)
}

