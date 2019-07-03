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

const Forgot = () => {

  const email = useInputForm('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      nextRedirect({}, '/')
    }
  }, [])

  async function forgot() {
    if (isLoading) return
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const forgotResponse = await fetch(`${config.BASE_API}/forgot`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value })
      })
      const forgotResponseJSON = await forgotResponse.json()
      if (forgotResponseJSON.success) {
        alert(forgotResponseJSON.data[0])
        nextRedirect({}, '/login')
      } else {
        setErrorMessages(forgotResponseJSON.errors)
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
    setErrorMessages(errors)
    return errors.length === 0
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      forgot()
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>Forgot Password | OH AUTH</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.headerText}>Forgot Password. Enter your email</p>
          <p className={styles.headerText}>and we will send the reset instruction.</p>
        </div>
        {errorMessages.length > 0 && errorMessages.map((errorMessage, key) => {
          return <p key={key} className={styles.errorMessage}>- {errorMessage}</p>
        })}
        <div className={styles.form}>
          <InputText className={styles.input} placeholder='Email' type='email' name='email'
            onKeyDown={handleKeyPress}  {...email} />
          <div className={styles.actions}>
            <Link href='/login'><a className={styles.textAction}>SIGN IN</a></Link>
            <Button onClick={forgot} loading={isLoading}>SEND</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Forgot