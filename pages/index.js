import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import './style.scss'
import styles from './index.scss'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Index = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Sign In | OH AUTH</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.headerText}>Sign In. To be or not</p>
          <p className={styles.headerText}>to be, that is the question.</p>
        </div>
        <InputText className={styles.input} label='Email' type='email' />
        <InputText className={styles.input} label='Password' type='password' />
        <a href='#' className={styles.forgot}>forgot password?</a>
        <div className={styles.actions}>
          <Link href='/register'><a className={styles.textAction}>REGISTER</a></Link>
          <Button>SIGN IN</Button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Index