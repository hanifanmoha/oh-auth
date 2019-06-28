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
      {/* <label className={styles.label}>{label}</label> */}
      <input
        placeholder={label}
        {...restProps}
        className={styles.input} />
    </div>
  );
}

export default InputText;