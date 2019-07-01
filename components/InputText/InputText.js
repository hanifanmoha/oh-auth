import styles from './InputText.scss'
import React, { useState, useEffect } from 'react'
import cx from 'classnames'

const InputText = ({
  className,
  name,
  label,
  placeholder,
  type,
  onChange,
  required,
  value,
  validate,
  valid: formValid,
  setValid: setFormValid,
  message,
  setMessage,
  ...restProps
}) => {

  const [dirty, setDirty] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    updateValidation({ target: { value: value } })
  }, [])

  function handleChange(e) {
    updateValidation(e)
    onChange(e)
  }

  function updateValidation(e) {
    setDirty(true)
    let valid = true
    if (required && !e.target.value) {
      valid = false
      setMessage(`${name} is required`)
    } else if (type === 'phone' && !isPhone(e.target.value)) {
      valid = false
      setMessage(`${name} is not valid`)
    } else if (type === 'email' && !isEmail(e.target.value)) {
      valid = false
      setMessage(`${name} is not valid`)
    } else if (type === 'alpha' && !isAlpha(e.target.value)) {
      valid = false
      setMessage(`${name} is not valid. Only alphabets are allowed`)
    } else {
      setMessage('')
    }
    setValid(valid)
    if (setFormValid) setFormValid(valid)
  }

  function isPhone(str) {
    return str.match(/^((\+62)|0)[0-9]{7,13}$/)
  }

  function isEmail(str) {
    return str.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  function isAlpha(str) {
    return str.match(/^[a-zA-Z ]*$/)
  }

  return (
    <div className={cx(className, styles.root)}>
      <label className={styles.label}>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        {...restProps}
        className={cx({
          [styles.input]: true,
          [styles.invalid]: ((validate || (validate && dirty)) && !valid),
          [styles.valid]: ((validate || (validate && dirty)) && valid),
        })} />
    </div>
  );
}

export default InputText;