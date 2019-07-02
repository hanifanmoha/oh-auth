import { configure, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import AuthLayout from '../AuthLayout/AuthLayout'

configure({ adapter: new Adapter() })

describe('<AuthLayout />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<AuthLayout />)
    expect(wrapper).toMatchSnapshot()
  })
})