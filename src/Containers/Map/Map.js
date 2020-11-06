import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import classes from './Map.module.css'
import ReactMapGL from 'react-map-gl';
 
class Map extends Component {
 
  state = {
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 13
    }
  };
  
  render(){
    const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXNrZXllcyIsImEiOiJja2g0eWcwZm8wZGU1MnNvOW45OTNrMTN3In0.cVLvH703us3Dnkfp1QUz2A'

    const authRedirect = !this.props.isAuthenticated ? <Redirect to='/auth'/> : null
    return(
      <div className={classes.Map}>
        {authRedirect}
        <ReactMapGL
          className={classes.MapBox}
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle = 'mapbox://styles/eskeyes/ckh502vwa037f19od7l6ext9u'
          onViewportChange={(viewport) => this.setState({viewport:viewport})}
        />
        <ZoomInIcon className={classes.ZoomInIcon}/>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated
  })
}
export default connect(mapStatetoProps, null)(Map)