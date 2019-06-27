import styles from './InputText.scss'
import React from 'react'
import cx from 'classnames'

const InputText = ({
  className,
  label,
  ...restProps
}) => {
  return (
    <div className={cx(className, styles.root)}>
      <label className={styles.label}>{label}</label>
      <input
        {...restProps}
        className={styles.input} />
    </div>
  );
}

export default InputText;