import { configure, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import InputText from '../InputText/InputText'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<InputText />', () => {
  it('has correct property', () => {
    const wrapper = shallow(<InputText
      label='Label'
      name='Name'
      value='Value'
      placeholder='Placeholder'
      type='text'
      onChange={() => { }} />)
    const { props: inputProps } = wrapper.find('input').get(0)
    const { props: labelProps } = wrapper.find('label').get(0)
    expect(inputProps.placeholder).toBe('Placeholder')
    expect(inputProps.value).toBe('Value')
    expect(inputProps.type).toBe('text')
    expect(labelProps.children).toBe('Label')
  })

  it('calls onChange with correct value', () => {
    const onChange = sinon.spy()
    const wrapper = shallow(<InputText
      label='Label'
      name='Name'
      value='Value'
      placeholder='Placeholder'
      type='text'
      onChange={onChange} />)
    const input = wrapper.find('input').first()
    const changeEvent = { target: { value: 'Hello World' } }
    input.simulate('change', changeEvent)
    expect(onChange.args[0][0]).toBe(changeEvent)
  })

  it('calls setMessage with correct message for required', () => {
    const setMessage = sinon.spy()
    const wrapper = shallow(<InputText
      label='Label'
      name='Name'
      value='Value'
      placeholder='Placeholder'
      required
      type='text'
      setMessage={setMessage} />)
    const input = wrapper.find('input').first()
    const changeEvent = { target: { value: '' } }
    input.simulate('change', changeEvent)
    expect(setMessage.args[0][0]).toBe('Name is required')
  })

  it('calls setMessage with correct message for email', () => {
    const setMessage = sinon.spy()
    const wrapper = shallow(<InputText
      label='Label'
      name='Name'
      value=''
      placeholder='Placeholder'
      required
      type='email'
      setMessage={setMessage} />)
    const input = wrapper.find('input').first()
    const changeEvent = { target: { value: 'username' } }
    input.simulate('change', changeEvent)
    expect(setMessage.args[0][0]).toBe('Name is not valid')
    const changeEvent2 = { target: { value: 'username@domain.com' } }
    input.simulate('change', changeEvent2)
    expect(setMessage.args[1][0]).toBe('')
    const changeEvent3 = { target: { value: '' } }
    input.simulate('change', changeEvent3)
    expect(setMessage.args[2][0]).toBe('Name is required')
  })

  it('calls setMessage with correct message for email', () => {
    const setMessage = sinon.spy()
    const wrapper = shallow(<InputText
      label='Label'
      name='Name'
      value=''
      placeholder='Placeholder'
      required
      type='phone'
      setMessage={setMessage} />)
    const input = wrapper.find('input').first()
    const changeEvent = { target: { value: 'username' } }
    input.simulate('change', changeEvent)
    expect(setMessage.args[0][0]).toBe('Name is not valid')
    const changeEvent2 = { target: { value: '081234123412' } }
    input.simulate('change', changeEvent2)
    expect(setMessage.args[1][0]).toBe('')
    const changeEvent3 = { target: { value: '+6281234123412' } }
    input.simulate('change', changeEvent3)
    expect(setMessage.args[2][0]).toBe('')
    const changeEvent4 = { target: { value: '' } }
    input.simulate('change', changeEvent4)
    expect(setMessage.args[3][0]).toBe('Name is required')
  })
})