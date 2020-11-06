import firebase from '../../fbConfig'
import * as actionTypes from './actionTypes'

const db = firebase.firestore()


const authStart = () => {
  return({
    type : actionTypes.AUTH_START
  })
}

const setAuth = (user = null) => {
  return({
    type : actionTypes.SET_AUTH,
    user : user
  })
}

const authFinish = () => {
  return({
    type : actionTypes.AUTH_FINISH
  })
}

const authFail = (error) => {
  return({
    type : actionTypes.AUTH_FAIL,
    error : error
  })
}

export const checkAuth = () => {
  return( dispatch => {
    dispatch(authStart())
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setAuth(user))
        dispatch(authFinish())
        // ...
      } else {
        dispatch(setAuth())
        dispatch(authFinish())
      }
    });
  })
}

const addFirestoreUser = (userId, userEmail, creationTime) => {
  return(dispatch => {
    db.collection("users").doc(userId).set({
      user : userEmail,
      creationTime : creationTime,
      loginCount : 1
    })
    .then(function() {
        console.log("Document successfully written!");
        dispatch(authFinish())
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  })
  
}
export const signup = (email, password) => {
  return(dispatch => {
    dispatch(authStart())

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user =>{
      const creationTime = user.user.metadata.creationTime
      const userId = user.user.uid
      const userEmail = user.user.email
      dispatch(addFirestoreUser(userId, userEmail, creationTime))
    })
    .catch(function(error) {
      dispatch(authFail(error))
    });
  })
}

export const login = (email, password) => {
  return(dispatch => {
    dispatch(authStart())
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      db.collection('users').doc(user.user.uid).update({
          loginCount: firebase.firestore.FieldValue.increment(1)
      })
      dispatch(setAuth(user.user))
      dispatch(authFinish())
    })
    .catch(function(error) {
      console.log("error");
      dispatch(setAuth())
      dispatch(authFail(error))
    });
  })
}

export const logout = () => {
  console.log("auth logour called");
  return(dispatch => {
    firebase.auth()
      .signOut()
      .then(() => {
        console.log("logged out");
        dispatch(setAuth())
    }).catch((error) => {
      console.log("logout error");
    });
  })
}