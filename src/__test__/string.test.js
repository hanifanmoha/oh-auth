import { capitalize, parseToken } from '../string'

test('capitalize string', () => {
  expect(capitalize('hello world')).toBe('Hello World')
  expect(capitalize()).toBe('')
  expect(capitalize('HELLO WORLD')).toBe('HELLO WORLD')
})

test('parsing token', () => {
  expect(parseToken('?id=1&token=123123&name=hanifan')).toBe('123123')
  expect(parseToken('')).toBe('')
  expect(parseToken('asdf')).toBe('')
})