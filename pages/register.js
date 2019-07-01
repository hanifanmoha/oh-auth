import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cx from 'classnames'

import './style.scss'
import styles from './register.scss'
import useInputForm from '../src/hooks/useInputForm'
import config from '../config'
import nextRedirect from '../src/redirect'

import AuthLayout from '../components/AuthLayout/AuthLayout';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';
import RadioGroup from '../components/RadioGroup/RadioGroup';
import DatePicker from '../components/DatePicker/DatePicker';

const SuccessMessage = ({ email }) => {

  const ref = useRef(null)

  useEffect(() => {
    window.scrollTo(0, ref.current.offsetTop)
  }, [])

  return <div className={styles.box} ref={ref}>
    <div className={styles.header}>
      <p className={styles.headerTextBig}>Register Success!</p>
      <p className={styles.headerText}>We've sent your password to {email}</p>
    </div>
    <Link href='/login'><a className={styles.goToLogin}>Go to login page ></a></Link>
  </div>
}

const Register = () => {
  const phone = useInputForm('')
  const firstName = useInputForm('')
  const lastName = useInputForm('')
  const dateOfBirth = useInputForm(null)
  const gender = useInputForm(null)
  const email = useInputForm('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [validate, setValidate] = useState(false)
  const [successRegister, setSuccessRegister] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem('accessToken')) {
      nextRedirect({}, '/')
    }
  }, [])

  async function register() {
    if (isLoading) return
    setValidate(true)
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const registerResponse = await fetch(`${config.BASE_API}/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.value,
          first_name: firstName.value.trim(),
          last_name: lastName.value.trim(),
          date_of_birth: dateOfBirth.value,
          gender: gender.value,
          email: email.value.trim()
        })
      })
      const registerResponseJSON = await registerResponse.json()
      if (registerResponseJSON.success) {
        alert('Please check your email to get your password')
        finishRegistraion()
      } else {
        setErrorMessages(registerResponseJSON.errors)
      }
    } catch (error) {
      setErrorMessages(['Connection error'])
    }
    setIsLoading(false)
  }

  function finishRegistraion() {
    setSuccessRegister(true);
  }

  function validateForm() {
    let errors = []
    if (phone.message) errors.push(phone.message)
    if (firstName.message) errors.push(firstName.message)
    if (lastName.message) errors.push(lastName.message)
    if (email.message) errors.push(email.message)
    setErrorMessages(errors)
    return errors.length === 0
  }

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]

  return (
    <AuthLayout>
      <Head>
        <title>Register | OH AUTH</title>
      </Head>
      <div className={cx({
        [styles.root]: true,
        [styles.rootDisabled]: successRegister
      })}>
        <div className={styles.header}>
          <p className={styles.headerText}>Register. Please</p>
          <p className={styles.headerText}>complete this form.</p>
        </div>
        {errorMessages.length > 0 && errorMessages.map((errorMessage, key) => {
          return <p key={key} className={styles.errorMessage}>- {errorMessage}</p>
        })}
        <div className={styles.form}>
          <InputText validate={validate} className={styles.input} required
            name='Mobile Number' placeholder='Mobile Number*' type='phone' {...phone} />
          <InputText validate={validate} className={styles.input} required
            name='First Name' placeholder='First Name*' type='alpha' {...firstName} />
          <InputText validate={validate} className={styles.input} required
            name='Last Name' placeholder='Last Name*' type='alpha' {...lastName} />
          <DatePicker className={styles.input} label='Date of Birth' type='date'{...dateOfBirth} />
          <RadioGroup className={styles.input} options={genderOptions} name='Gender' {...gender} />
          <InputText validate={validate} className={styles.input} required
            name='Email' placeholder='Email*' type='email' {...email} />
          <div className={styles.actions}>
            <Link href='/login'><a className={styles.textAction}>SIGN IN</a></Link>
            <Button onClick={register} loading={isLoading}>
              REGISTER
            </Button>
          </div>
        </div>
      </div>
      {successRegister && <SuccessMessage email={email.value} />}
    </AuthLayout>
  )
}

export default Register