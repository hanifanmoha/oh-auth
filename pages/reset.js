import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import './style.scss'
import styles from './reset.scss'
import nextRedirect from '../src/redirect'
import useInputForm from '../src/hooks/useInputForm'
import config from '../config'
import stringUtils from '../src/string'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Reset = ({ router }) => {

  const password = useInputForm('')
  const confirmPassword = useInputForm('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Logout current account
  useEffect(() => {
    localStorage.removeItem('accessToken')
  }, [])

  async function reset() {
    if (isLoading) return
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const resetResponse = await fetch(`${config.BASE_API}/reset`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: password.value,
          confirm_password: confirmPassword.value,
          token: stringUtils.parseToken(router.asPath)
        })
      })
      const resetResponseJSON = await resetResponse.json()
      if (resetResponseJSON.success) {
        alert(resetResponseJSON.data[0])
        nextRedirect({}, '/login')
      } else {
        setErrorMessages(resetResponseJSON.errors)
      }
    } catch (error) {
      setErrorMessages(['Connection error'])
    }
    setIsLoading(false)
  }

  function validateForm() {
    let errors = []
    if (!password.value) {
      errors.push('Password must not empty')
    }
    if (!confirmPassword.value) {
      errors.push('Confirm Password must not empty')
    }
    if (confirmPassword.value !== password.value) {
      errors.push('Password confirmation doesn\'t match')
    }
    setErrorMessages(errors)
    return errors.length === 0
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      reset()
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>Reset Password | OH AUTH</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.headerText}>Reset Password. Please enter</p>
          <p className={styles.headerText}>your new password.</p>
        </div>
        {errorMessages.length > 0 && errorMessages.map((errorMessage, key) => {
          return <p key={key} className={styles.errorMessage}>- {errorMessage}</p>
        })}
        <div className={styles.form}>
          <InputText className={styles.input} placeholder='Password' type='password' name='password'
            onKeyDown={handleKeyPress} {...password} />
          <InputText className={styles.input} placeholder='Confirm Password' type='password' name='confirm_password'
            onKeyDown={handleKeyPress} {...confirmPassword} />
          <div className={styles.actions}>
            <div/>
            <Button onClick={reset} loading={isLoading}>RESET</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default withRouter(Reset)