import styles from './AuthLayout.scss'
import React from 'react'
import cx from 'classnames'

const AuthLayout = ({ className, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={styles.authContainer}>
        <img src='https://assets.vsco.co/assets/images/icons/vsco-seal.svg' className={styles.logo} />
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;