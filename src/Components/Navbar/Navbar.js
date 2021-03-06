import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as actions from '../../Store/Actions/index'
import classes from './Navbar.module.css'

const navbar = (props) => {
  
  const logoutHandler = () => {
    props.logout()
    props.history.replace('/auth')
  }
  
  return(
    <div className={classes.Navbar}>
      <div>
        <h3>React_Map</h3>
      </div>
      <div className={classes.NavbarButtons}>
        {props.isAuthenticated &&
        <NavLink 
          style = {{textDecoration : 'none', }} to='/'>
            <Button
              className={classes.NavbarButton}
              color='secondary'>HOME</Button>
        </NavLink>}
        {!props.isAuthenticated &&
          <NavLink style = {{textDecoration : 'none', }} to='/auth'>
            <Button
              className={classes.NavbarButton}
              color='secondary'>LOGIN</Button>
          </NavLink>}
        {props.isAuthenticated && 
          <Button
            className={classes.NavbarButton}
            color='secondary'
            onClick={logoutHandler}>LOGOUT</Button>
        }
        {props.isAuthenticated &&
          <NavLink style = {{textDecoration : 'none', }} to='/users'>
            <Button
              className={classes.NavbarButton}
              color='secondary'>USERS LIST</Button>
          </NavLink>
        }
      </div>
    </div>
  )
}

// ACCESSING REDUX STATES
const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated
  })
}

const mapDispatchtoProps = (dispatch) => {
  return({
    logout : () => {dispatch(actions.logout())}
  })
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(navbar))