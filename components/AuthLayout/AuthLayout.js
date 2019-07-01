import styles from './AuthLayout.scss'
import React from 'react'
import cx from 'classnames'

import logo from './logo1.png'

const AuthLayout = ({ className, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={styles.screen}>
        <div className={styles.authContainer}>
          <img src={logo} className={styles.logo} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;