import styles from './AuthLayout.scss'
import React from 'react'
import cx from 'classnames'

const AuthLayout = ({ className, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={styles.content}>
      </div>
      <div className={styles.authContainer}>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;