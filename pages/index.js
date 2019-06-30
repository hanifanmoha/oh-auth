import styles from './index.scss'
import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import fetch from 'isomorphic-unfetch';

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
    localStorage.setItem('accessToken', null)
    nextRedirect({}, '/login')
  }

  return (
    <MainLayout>
      <p onClick={logout} className={styles.logout}>logout</p>
      {currentUser && <h3 className={cx(styles.greeting)}>
        Hi, {currentUser.first_name} {currentUser.last_name}!
      </h3>}
      {currentUser && <pre className={styles.currentUser}>
        {JSON.stringify(currentUser, null, 2)}
      </pre>}
      <hr />
      <h2 className={cx(styles.title)}>All Active Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>PHONE</th>
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