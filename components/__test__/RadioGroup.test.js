import { configure, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import RadioGroup from '../RadioGroup/RadioGroup'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('<RadioGroup />', () => {
  it('renders three options', () => {
    const options = [
      { label: 'AAA', value: 'aaa' },
      { label: 'BBB', value: 'bbb' },
      { label: 'CCC', value: 'ccc' },
    ]
    const wrapper = shallow(<RadioGroup
      name='radio'
      options={options}
      value='ccc'
      onChange={() => { }} />)
    expect(wrapper.find('input')).toHaveLength(3)
  })

  it('call onChange on click radio', () => {
    const onChange = sinon.spy()
    const options = [
      { label: 'AAA', value: 'aaa' },
      { label: 'BBB', value: 'bbb' },
      { label: 'CCC', value: 'ccc' },
    ]
    const wrapper = shallow(<RadioGroup
      name='radio'
      options={options}
      value={null}
      onChange={onChange} />)
    wrapper.find('input').first().simulate('change')
    expect(onChange).toHaveProperty('callCount', 1)
  })

  it('has correct label and value', () => {
    const onChange = sinon.spy()
    const options = [
      { label: 'AAA', value: 'aaa' },
    ]
    const wrapper = shallow(<RadioGroup
      name='radio'
      options={options}
      value={null}
      onChange={onChange} />)
    let input = wrapper.find('input').get(0)
    let span = wrapper.find('span').get(0)
    expect(input.props.value).toBe('aaa')
    expect(span.props.children).toBe('AAA')
  })

  it('only one checked radio', () => {
    const onChange = sinon.spy()
    const options = [
      { label: 'AAA', value: 'aaa' },
      { label: 'BBB', value: 'bbb' },
      { label: 'CCC', value: 'ccc' },
    ]
    const wrapper = shallow(<RadioGroup
      name='radio'
      options={options}
      value='bbb'
      onChange={onChange} />)
    let aaa = wrapper.find('input').get(0)
    let bbb = wrapper.find('input').get(1)
    let ccc = wrapper.find('input').get(2)
    expect(aaa.props.checked).toBeFalsy()
    expect(bbb.props.checked).toBeTruthy()
    expect(ccc.props.checked).toBeFalsy()
  })

})