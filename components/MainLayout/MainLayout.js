import styles from './MainLayout.scss'
import React from 'react'
import cx from 'classnames'

const MainLayout = ({ className, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;