import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import './style.scss'
import styles from './index.scss'
import nextRedirect from '../src/redirect'
import useInputForm from '../src/hooks/useInputForm'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Index = () => {

  const email = useInputForm('')
  const phone = useInputForm('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function login() {
    if (isLoading) return
    if (!email.value) {
      setErrorMessages(['Please provide an email'])
      return
    }
    if (!phone.value) {
      setErrorMessages(['Please provide a phone number'])
      return
    }
    setIsLoading(true)
    setErrorMessages([])
    const loginResponse = await fetch('https://oh-auth-api.herokuapp.com/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, phone: phone.value })
    })
    const loginResponseJSON = await loginResponse.json()
    if(loginResponseJSON.success) {
      nextRedirect({}, '/dashboard')
    } else {
      setErrorMessages(loginResponseJSON.errors)
    }
    setIsLoading(false)
  }

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
        {errorMessages.length > 0 && errorMessages.map((errorMessage, key) => {
          return <p key={key} className={styles.errorMessage}>{errorMessage}</p>
        })}
        <div className={styles.form}>
          <InputText className={styles.input} label='Email' type='email' {...email} />
          <InputText className={styles.input} label='Phone Number' type='text' {...phone} />
          <a href='#' className={styles.forgot}>forgot password?</a>
          <div className={styles.actions}>
            <Link href='/register'><a className={styles.textAction}>REGISTER</a></Link>
            <Button onClick={login}>SIGN IN</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Index