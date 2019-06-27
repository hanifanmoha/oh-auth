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
        <h1 className={styles.title}>Sign In</h1>
        <InputText className={styles.input} label='Email' type='email'/>
        <InputText className={styles.input} label='Password' type='password'/>
        <div className={styles.actions}>
          <Button>LOGIN</Button>
          <h5>or</h5>
          <Link href='/register'><a className={styles.textAction}>Register</a></Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Index