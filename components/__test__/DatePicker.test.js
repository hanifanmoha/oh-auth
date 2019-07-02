import { configure, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import DatePicker from '../DatePicker/DatePicker'

configure({ adapter: new Adapter() })

describe('<DatePicker />', () => {
  it('called onChange with correct value', () => {
    const onChange = sinon.spy()
    const wrapper = shallow(<DatePicker
      value={null}
      onChange={onChange} />)
    const month = wrapper.find('select').at(0)
    const date = wrapper.find('select').at(1)
    const year = wrapper.find('select').at(2)
    let dateArg;
    month.simulate('change', { target: { value: 5 } })
    dateArg = new Date(onChange.args[0][0].target.value)
    expect(dateArg.getMonth()).toBe(4)
    date.simulate('change', { target: { value: 3 } })
    dateArg = new Date(onChange.args[1][0].target.value)
    expect(dateArg.getDate()).toBe(3)
    year.simulate('change', { target: { value: 2000 } })
    dateArg = new Date(onChange.args[2][0].target.value)
    expect(dateArg.getFullYear()).toBe(2000)

  })
})