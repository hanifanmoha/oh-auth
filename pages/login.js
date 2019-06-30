import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import './style.scss'
import styles from './login.scss'
import nextRedirect from '../src/redirect'
import useInputForm from '../src/hooks/useInputForm'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Login = () => {

  const email = useInputForm('')
  const password = useInputForm('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function login() {
    if (isLoading) return
    if (!email.value) {
      setErrorMessages(['Please provide an email'])
      return
    }
    if (!password.value) {
      setErrorMessages(['Password must not empty'])
      return
    }
    setIsLoading(true)
    setErrorMessages([])
    const loginResponse = await fetch('https://oh-auth-api.herokuapp.com/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const loginResponseJSON = await loginResponse.json()
    if(loginResponseJSON.success) {
      localStorage.setItem('accessToken', loginResponseJSON.data.token)
      nextRedirect({}, '/')
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
          <InputText className={styles.input} label='Password' type='password' {...password} />
          <a href='#' className={styles.forgot}>forgot password?</a>
          <div className={styles.actions}>
            <Link href='/register'><a className={styles.textAction}>REGISTER</a></Link>
            <Button onClick={login}>{isLoading? '...' : 'SIGN IN'}</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login