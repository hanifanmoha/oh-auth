import React, { useState } from 'react'

const useInputForm = function (initialValue) {
  const [value, setValue] = useState(initialValue)
  return {
    value,
    onChange: (e) => setValue(e.target.value)
  }
}

export default useInputForm