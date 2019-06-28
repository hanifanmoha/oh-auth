import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import './style.scss'
import styles from './register.scss'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Index = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Register | OH-AUTH</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.headerText}>Register. To be or not</p>
          <p className={styles.headerText}>to be, that is the question.</p>
        </div>
        <InputText className={styles.input} label='Phone' type='phone' />
        <InputText className={styles.input} label='First Name' type='text' />
        <InputText className={styles.input} label='Last Name' type='text' />
        <InputText className={styles.input} label='Date of Birts' type='date' />
        <InputText className={styles.input} label='Email' type='email' />
        <InputText className={styles.input} label='Password' type='password' />
        <div className={styles.actions}>
          <Link href='/'><a className={styles.textAction}>SIGN IN</a></Link>
          <Button>LOGIN</Button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Index