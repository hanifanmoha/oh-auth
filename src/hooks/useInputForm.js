import React, { useState } from 'react'

const useInputForm = function (initialValue) {
  const [value, setValue] = useState(initialValue)
  const [valid, setValid] = useState(true)
  const [message, setMessage] = useState('')
  return {
    value,
    onChange: (e) => setValue(e.target.value),
    valid,
    setValid,
    message,
    setMessage,
  }
}

export default useInputForm