import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router';
import * as actions from '../../Store/Actions/index'

import { Input } from '@material-ui/core'
import Button from '@material-ui/core/Button';

import classes from './Auth.module.css'
import Spinner from '../../Components/UI/Spinner/Spinner';


class Auth extends Component{
  state = {
    email : {
      value : '',
      validation : {
          required : true,
          isEmail : true
      },
      valid : false,
      touched : false
    },
    password : {
      value : '',
      validation : {
          required : true,
          minLength : 6
      },
      valid : false,
      touched : false
    }
  }

  loginHandler = () => {
    this.props.login(this.state.email.value, this.state.password.value)
  }
  signupHandler = () => {
    this.props.signup(this.state.email.value, this.state.password.value)
  }

  // FIELD LEVEL VALIDATION
  checkValidity = (rules,value) => {
    let isValid = true
    if(rules.required){
        isValid = value.trim() !== '' && isValid ===true
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid ===true
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid ===true
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    return isValid
  }
  inputChangeHandler = (event,elementId) => {

    let updatedElement = {...this.state[elementId]}
    // let updatedElement = {...updatedControl[elementId]}
    updatedElement.value = event.target.value
    updatedElement.valid = this.checkValidity(updatedElement.validation , updatedElement.value )
    updatedElement.touched = true
    // updatedControl[elementId] = updatedElement
    // let formIsValid = true
    // for(let key in updatedControl){
    //     formIsValid = updatedControl[key].valid && formIsValid
    // }
    this.setState({[elementId] : updatedElement})
  }
  render(){

    //REDIRECTING FROM AUTHENTICATION PAGE IF AUTHENTICATED
    const authRedirect = this.props.isAuthenticated ? <Redirect to = '/'/> : null
    
    //SHOWING ERROR IF OCCURED
    const authError = this.props.authError ? <h4 style={{color : 'red'}}>{this.props.authError}</h4> : null

    // STYLES FOR EMAIL AND PASSWORD INPUT FIELD ON VALID AND NON VALID
    let emailInputClass = []
    if (!this.state.email.valid && this.state.email.touched) {
      emailInputClass = [classes.NonValid]
    }
    let passwordInputClass = []
    if (!this.state.password.valid && this.state.password.touched) {
      passwordInputClass = [classes.NonValid]
    }
    //CHECKING AUTH LOADING AND LOADER SHOWING
    const content = this.props.authLoading ?
    <Spinner /> : 
      <>
        <div>
          <h4 style={{width: '100%'}}>Authenticate</h4>
        </div>
        <form className={classes.AuthForm} >
          <Input 
            className={emailInputClass.join(' ')}
            type="text"
            placeholder="Email"
            value = {this.state.email.value}
            onChange={(event) => {this.inputChangeHandler(event, 'email')}} />
          <Input
            className={passwordInputClass.join(' ')}
            type='password' 
            placeholder="Password" 
            value = {this.state.password.value}
            onChange={(event) => {this.inputChangeHandler(event, 'password')}}/>
          <Button 
            color='primary'
            variant='contained'
            style={{width:'40%', alignSelf:'center'}}
            onClick = {this.loginHandler}>Login</Button>
          <Button 
            color='secondary'
            variant= 'contained'
            style={{width:'40%', alignSelf:'center'}}
            onClick = {this.signupHandler}>Signup</Button>
        </form>
      </>
    return(
      <div className={classes.Auth}>
        {authRedirect}
        {authError}
        {content}
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return({
    isAuthenticated : state.auth.isAuthenticated,
    authLoading : state.auth.loading,
    authError : state.auth.authError
  })
}

const mapDispatchtoProps = (dispatch) => {
  return({
    login : (email,password) => {dispatch(actions.login(email, password))},
    signup : (email,password) => {dispatch(actions.signup(email,password))}
  })
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth)
