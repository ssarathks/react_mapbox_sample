import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import classes from './SidebarToggler.module.css'
const sidebarToggler = (props) => {
  return(
    <div className={classes.SidebarToggler} onClick={props.toggleClicked}>
      <MenuIcon fontSize='large'/>
    </div>
  )
}

export default sidebarToggler