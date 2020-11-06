import React, { Component } from 'react'
import firebase from '../../fbConfig'
import UserTable from '../../Components/UserTable/UserTable'

import classes from './UsersList.module.css'
import Spinner from '../../Components/UI/Spinner/Spinner'
class UsersList extends Component{
  state = {
    users : [],
    loading : true
  }

  //NETWORK CALL FOR FETCHING FIREBASE USERS COLLECTION
  componentDidMount = () => {
    const db = firebase.firestore()
    db.collection("users")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
          this.setState({users : [...this.state.users, doc.data()]})
      });
      this.setState({loading : false})
    })
  }

  render(){
    return(
      <div className={classes.UsersList}>
        {this.state.loading ? <Spinner /> : <UserTable users = {this.state.users}/>}
      </div>
    )
  }
}


export default UsersList