import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ReactMapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';

// import ControlPanel from './control-panel';
import Pins from './pins';
import CityInfo from './city-info';
import Chart from './Chart/Chart'
import CITIES from './cities.json';

import 'mapbox-gl/dist/mapbox-gl.css'
import classes from './Map2.module.css'

// MAPBOX TOKEN FOR USING MAPS
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

class Map2 extends Component {
    state = {
      viewport: {
        latitude: 32.7757,
        longitude: -96.7967,
        zoom: 4.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      settings: {
        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 4.5,
        maxZoom: 5,
        minPitch: 0,
        maxPitch: 85
      }
    }

  _updateViewport = viewport => {
    this.setState({viewport});
  };
  
  _onClickMarker = city => {
    this.setState({popupInfo: city});
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && this.state.viewport.zoom === 4.5 &&(
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={true}
          onClose={() => this.setState({popupInfo: null})}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {

    const {viewport,settings} = this.state;

    // REDIRECTING IF NOT LOGGED IN
    const authRedirect = !this.props.isAuthenticated ? <Redirect to='/auth'/> : null
    
    return (
      <div className={classes.Map2}>
        
        {authRedirect}
        <ReactMapGL
          {...viewport}
          //SETTING OBJECT IS FOR RESTRICTING ZOOM TO ONLY 2 LEVELS
          {...settings}
          width="100%"
          height="98%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={TOKEN}
          >
          {/* SHOWING MARKERS ONLY AT ONE ZOOM LEVEL */}
          {this.state.viewport.zoom === 4.5? <Pins data={CITIES} onClick={this._onClickMarker} /> : null}

          {this._renderPopup()}

          <div style={geolocateStyle}>
            <GeolocateControl />
          </div>
          <div style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div style={navStyle}>
            <NavigationControl />
          </div>
          <div style={scaleControlStyle}>
            <ScaleControl />
          </div>

          {/* //SHOWING CHART AT ZOOM LEVEL 5 ONLY */}
          {this.state.viewport.zoom === 5 ? 
           <Chart className={classes.Chart} data = {CITIES}/> : null} 
 
        </ReactMapGL>
          </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated
  })
}
export default connect(mapStatetoProps, null)(Map2)