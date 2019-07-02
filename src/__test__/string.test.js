import { capitalize } from '../string'

test('capitalize string', () => {
  expect(capitalize('hello world')).toBe('Hello World')
  expect(capitalize()).toBe('')
  expect(capitalize('HELLO WORLD')).toBe('HELLO WORLD')
})