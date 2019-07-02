import { configure, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import MainLayout from '../MainLayout/MainLayout'

configure({ adapter: new Adapter() })

describe('<MainLayout />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<MainLayout />)
    expect(wrapper).toMatchSnapshot()
  })
})