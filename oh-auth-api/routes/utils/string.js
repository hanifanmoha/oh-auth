function capitalize(str) {
  if (!str) return ''
  let s = str.split(' ');
  let S = s.map(s => {
    c = s.split('')
    c[0] = c[0].toUpperCase()
    return c.join('')
  })
  return S.join(' ')
}

function random() {
  return Math.random().toString(36).substring(2, 14)
    + Math.random().toString(36).substring(2, 14)
    + Math.random().toString(36).substring(2, 14)
}

module.exports = {
  capitalize: capitalize,
  random: random
}