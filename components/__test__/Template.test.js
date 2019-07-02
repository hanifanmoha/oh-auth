import { configure, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Template />', () => {
  it('is true', () => {
    expect(true).toBe(true)
  })
})