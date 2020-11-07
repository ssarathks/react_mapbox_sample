import { Component } from 'react';

import Layout from './Containers/Layout/Layout';
import * as actions from '../src/Store/Actions/index'
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import { connect } from 'react-redux';


class App extends Component{
  componentDidMount = () => {
    this.props.checkAuth()
  }
  render(){
    return(
      <div className="App">
        <Layout />
      </div>  
    )
  }
}
const mapDispatchtoProps = (dispatch) => {
  return({
    checkAuth : () => {dispatch(actions.checkAuth())}
  })
}

export default connect(null, mapDispatchtoProps)(App);