function capitalize(str='') {
  if(!str) return ''
  let s = str.split(' ');
  let S = s.map(s => {
    let c = s.split('')
    c[0] = c[0].toUpperCase()
    return c.join('')
  })
  return S.join(' ')
}

module.exports = {
  capitalize : capitalize
}