import styles from './RadioGroup.scss'
import React from 'react'
import cx from 'classnames'


const RadioGroup = ({ className, options, name, value, onChange }) => {

  function handleClick(e) {
    onChange(e)
  }

  return (
    <div className={cx(className, styles.root)}>
      {options.map((option, index) => {
        return <label key={`${index}--${option.value}`}
          className={styles.container}>
          <input type="radio" onChange={handleClick} name={name} value={option.value} checked={option.value === value} />
          <span className={cx({
            [styles.text] : true,
            [styles.textActive] : option.value === value
          })}>{option.label}</span>
        </label>
      })}
    </div>
  );
}

export default RadioGroup;