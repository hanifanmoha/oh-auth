import React from 'react'
import Link from 'next/link'

import './style.scss'
import styles from './index.scss'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Index = () => {
  return (
    <AuthLayout>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.headerText}>Sign In. To be or not</p>
          <p className={styles.headerText}>to be, that is the question.</p>
        </div>
        <InputText className={styles.input} label='Email' type='email' />
        <InputText className={styles.input} label='Password' type='password' />
        <div className={styles.actions}>
          <Link href='/register'><a className={styles.textAction}>REGISTER</a></Link>
          <Button>LOGIN</Button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Index