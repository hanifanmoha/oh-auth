import styles from './Button.scss'
import React from 'react'
import cx from 'classnames'

import loadinggif from './loadinggif.gif'

const Button = ({
  className,
  children,
  loading,
  ...restProps
}) => {
  return (
    <button {...restProps} className={cx(className, styles.root)}>
      {!loading && children}
      {loading && <div style={{ backgroundImage: `url(${loadinggif}` }} className={styles.loading} />}
    </button>
  );
}

export default Button;