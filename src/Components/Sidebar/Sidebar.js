import React from 'react'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import * as actions from '../../Store/Actions/index'
import classes from './Sidebar.module.css'
import { connect } from 'react-redux';
const sidebar = (props) => {
    const loginHandler = () => {
        props.history.push('/auth')
        props.sidebarClose()
    }

    const logoutHandler = () => {
        props.logout()
        props.sidebarClose()
        props.history.push('/')
    }

    const authButton = props.isAuthenticated ?
        <Button
            className={classes.SidebarButton}
            color='primary' 
            onClick={logoutHandler}>LOGOUT</Button> :
        <Button
            className = {classes.SidebarButton}
            color = 'primary'
            onClick = {loginHandler}>LOGIN</Button>

    
    let sidebarAttachedClasses = [classes.Sidebar, classes.Close]
    if (props.sidebarOpen) {
        sidebarAttachedClasses = [classes.Sidebar, classes.Open]
    }
    return(
        <div className={sidebarAttachedClasses.join(' ')}>
            <div className={classes.BrandName}>
                <h2 style={{margin: 'auto'}}>React_Map</h2>
            </div>

            <NavLink style = {{textDecoration : 'none', }} to='/'>
                <Button
                className={classes.SidebarButton}
                color='primary' 
                onClick={props.sidebarClose}>HOME</Button>
            </NavLink>

            {authButton}

            {props.isAuthenticated && 
                <NavLink style = {{textDecoration : 'none', }} to='/users'>
                    <Button
                    className={classes.SidebarButton}
                    color='primary' 
                    onClick={props.sidebarClose}>USERS LIST</Button>
                </NavLink>}
        </div>
    )
}

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

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(sidebar))