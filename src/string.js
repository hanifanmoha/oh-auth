function capitalize(str = '') {
  if (!str) return ''
  let s = str.split(' ');
  let S = s.map(s => {
    let c = s.split('')
    c[0] = c[0].toUpperCase()
    return c.join('')
  })
  return S.join(' ')
}

function parseToken(str) {
  if (!str) return ''
  const search = str.split('?')[1] || ''
  const query = search.split('&').map(q => q.split('='))
  const queryToken = query.find(q => q[0]==='token') || []
  return queryToken[1] || ''
}

module.exports = {
  capitalize: capitalize,
  parseToken: parseToken
}