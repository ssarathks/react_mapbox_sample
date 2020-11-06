import React from 'react'
import classes from './UserTable.module.css'
const userTable = (props) => {
  const users = props.users.map(user => {
    return(
      <tr>
        <td>{user.user}</td>
        <td>{user.creationTime.slice(0,17)}</td>
        <td>{user.loginCount}</td>
      </tr>
    )
  })
  return(
    <div className={classes.UserTable}>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Creation Time</th>
            <th>Login Count</th>
          </tr>
        </thead>
        <tbody>
          {users}          
        </tbody>
      </table>
    </div>
  )
}

export default userTable