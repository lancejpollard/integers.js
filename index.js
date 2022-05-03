
module.exports = {
  triangular,
  star,
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