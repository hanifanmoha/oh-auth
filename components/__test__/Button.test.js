import { configure, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Button from '../Button/Button'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Button />', () => {
  it('calls onClick', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(<Button
      onClick={onClick}>
      Button
    </Button>)
    const button = wrapper.find('button').first()
    button.simulate('click')
    expect(onClick.callCount).toBe(1)
  })
})