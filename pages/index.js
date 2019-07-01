import styles from './index.scss'
import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import fetch from 'isomorphic-unfetch'
import { capitalize } from '../src/string'

import nextRedirect from '../src/redirect'

import MainLayout from '../components/MainLayout/MainLayout';

const Index = () => {

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    fetch('https://oh-auth-api.herokuapp.com/users', {
      headers: { 'Authorization': token },
    })
      .then(apiReponse => apiReponse.json())
      .then(apiReponseJSON => {
        if (apiReponseJSON.success) {
          setUsers(apiReponseJSON.data.users)
          setCurrentUser(apiReponseJSON.data.user)
        } else {
          localStorage.removeItem('accessToken')
          nextRedirect({}, '/login')
        }
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <MainLayout>
      <p>Loading ...</p>
    </MainLayout>
  }

  function logout() {
    localStorage.removeItem('accessToken')
    nextRedirect({}, '/login')
  }

  return (
    <MainLayout>
      <p onClick={logout} className={styles.logout}>logout</p>
      {currentUser && <h3 className={cx(styles.greeting)}>
        Hi, {currentUser.first_name} {currentUser.last_name}!
      </h3>}
      {currentUser && <table className={cx(styles.table, styles.currentUser)}>
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{capitalize(currentUser.first_name + ' ' + currentUser.last_name)}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{currentUser.email}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>:</td>
            <td>{currentUser.phone}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>:</td>
            <td>{currentUser.gender ? capitalize(currentUser.gender) : '--'}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>:</td>
            <td>{currentUser.date_of_birth ? (new Date(currentUser.date_of_birth).toDateString()) : '--'}</td>
          </tr>
        </tbody>
      </table>}

      <hr />

      <h2 className={cx(styles.title)}>All Active Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>MOBILE NUMBER</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return <tr key={user.id} className={styles.user}>
              <td>{user.id}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          })}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default Index;