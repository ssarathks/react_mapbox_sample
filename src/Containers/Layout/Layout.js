import React, { Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import { connect } from 'react-redux'

import SidebarToggler from '../../Components/SidebarToggler/SidebarToggler'
import Navbar from '../../Components/Navbar/Navbar'
import Auth from '../../Containers/Auth/Auth'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import Map2 from '../Map2/Map2'
import Spinner from '../../Components/UI/Spinner/Spinner'

import classes from './Layout.module.css'
import UsersList from '../UsersList/UsersList'
class Layout extends Component{

  state = {
    sidebarOpen : false
  }

  sidebartoggleClickHandler = () => {
    this.setState({sidebarOpen : !this.state.sidebarOpen})
  }

  render(){
    const layout = this.props.authLoading ? <Spinner /> :
    <>
      <Navbar />
      <SidebarToggler 
        toggleClicked={this.sidebartoggleClickHandler}/>
      <Sidebar 
        sidebarOpen = {this.state.sidebarOpen} 
        sidebarClose = {this.sidebartoggleClickHandler}/>
      <Backdrop 
        show={this.state.sidebarOpen} 
        backdropClicked = {this.sidebartoggleClickHandler}/>
      <Switch>
        <Route exact path='/' component={Map2}/>
        <Route exact path='/auth' component={Auth}/>
        {this.props.isAuthenticated && <Route exact path='/users' component={UsersList}/>}
      </Switch>
    </>
    return(
      <div className ={classes.Layout}>
        {layout}
      </div>
      )
  }
}

const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated,
    authLoading : state.auth.loading
  })
}


export default connect(mapStatetoProps,null)(Layout)