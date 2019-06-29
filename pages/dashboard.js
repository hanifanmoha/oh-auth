import styles from './dashboard.scss'
import React from 'react'
import cx from 'classnames'
import fetch from 'isomorphic-unfetch';

import MainLayout from '../components/MainLayout/MainLayout';

const Dashboard = ({ users }) => {
  return (
    <MainLayout>
      <h1 className={cx(styles.title)}>Users</h1>
      {users.data.map(user => {
        return <pre key={user.id} className={styles.user}>
          {JSON.stringify(user, null, 2)}
        </pre>
      })}
    </MainLayout>
  );
}

Dashboard.getInitialProps = async function() {
  let usersReponse = await fetch('https://oh-auth-api.herokuapp.com/users')
  let users = await usersReponse.json()
  return {
    users
  }
}

export default Dashboard;