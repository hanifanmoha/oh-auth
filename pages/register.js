import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import './style.scss'
import styles from './register.scss'
import nextRedirect from '../src/redirect'
import useInputForm from '../src/hooks/useInputForm'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';

const Index = () => {
  const phone = useInputForm('')
  const first_name = useInputForm('')
  const last_name = useInputForm('')
  const date_of_birth = useInputForm('')
  const gender = useInputForm('')
  const email = useInputForm('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function register() {
    if (isLoading) return
    setIsLoading(true)
    setErrorMessages([])
    const registerResponse = await fetch('https://oh-auth-api.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phone.value,
        first_name: first_name.value,
        last_name: last_name.value,
        date_of_birth: date_of_birth.value,
        gender: gender.value,
        email: email.value
      })
    })
    const registerResponseJSON = await registerResponse.json()
    if (registerResponseJSON.success) {
      nextRedirect({}, '/dashboard')
    } else {
      setErrorMessages(registerResponseJSON.errors)
    }
    setIsLoading(false)
  }

  return (
    <AuthLayout>
      <Head>
        <title>Register | OH AUTH</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.headerText}>Register. To be or not</p>
          <p className={styles.headerText}>to be, that is the question.</p>
        </div>
        {errorMessages.length > 0 && errorMessages.map((errorMessage, key) => {
          return <p key={key} className={styles.errorMessage}>{errorMessage}</p>
        })}
        <div className={styles.form}>
          <InputText className={styles.input} label='Phone' type='phone' {...phone} />
          <InputText className={styles.input} label='First Name' type='text' {...first_name} />
          <InputText className={styles.input} label='Last Name' type='text' {...last_name} />
          <InputText className={styles.input} label='Gender (male/female)' type='text' {...gender} />
          <InputText className={styles.input} label='Date of Birth' type='date'{...date_of_birth} />
          <InputText className={styles.input} label='Email' type='email' {...email} />
          <div className={styles.actions}>
            <Link href='/'><a className={styles.textAction}>SIGN IN</a></Link>
            <Button onClick={register}>REGISTER</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Index