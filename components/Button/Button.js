import styles from './Button.scss'
import React from 'react'
import cx from 'classnames'

const Button = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <button {...restProps} className={cx(className, styles.root)}>
      {children}
    </button>
  );
}

export default Button;