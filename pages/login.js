import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import './style.scss'
import styles from './login.scss'
import nextRedirect from '../src/redirect'
import useInputForm from '../src/hooks/useInputForm'
import config from '../config'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Login = () => {

  const email = useInputForm('')
  const password = useInputForm('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem('accessToken')) {
      nextRedirect({}, '/')
    }
  }, [])

  async function login() {
    if (isLoading) return
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const loginResponse = await fetch(`${config.BASE_API}/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value })
      })
      const loginResponseJSON = await loginResponse.json()
      if (loginResponseJSON.success) {
        localStorage.setItem('accessToken', loginResponseJSON.data.token)
        nextRedirect({}, '/')
      } else {
        setErrorMessages(loginResponseJSON.errors)
      }
    } catch (error) {
      setErrorMessages(['Connection error'])
    }
    setIsLoading(false)
  }

  function validateForm() {
    let errors = []
    if (!email.value) {
      errors.push('Please provide an email')
    }
    if (!password.value) {
      errors.push('Password must not empty')
    }
    setErrorMessages(errors)
    return errors.length === 0
  }

  function handleKeyPress(e) {
    if(e.keyCode === 13) {
      login()
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>Sign In | OH AUTH</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.headerText}>Sign In. Please enter</p>
          <p className={styles.headerText}>your email and password.</p>
        </div>
        {errorMessages.length > 0 && errorMessages.map((errorMessage, key) => {
          return <p key={key} className={styles.errorMessage}>- {errorMessage}</p>
        })}
        <div className={styles.form}>
          <InputText onKeyDown={handleKeyPress} className={styles.input} placeholder='Email' type='email' {...email} />
          <InputText onKeyDown={handleKeyPress} className={styles.input} placeholder='Password' type='password' {...password} />
          <div className={styles.actions}>
            <Link href='/register'><a className={styles.textAction}>REGISTER</a></Link>
            <Button onClick={login} loading={isLoading}>SIGN IN</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login