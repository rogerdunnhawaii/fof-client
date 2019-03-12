import React, { Component } from 'react'
import { getGeocode } from '../api'
import './Map.scss'

class Map extends Component {
  constructor () {
    super()

    this.state = {
      positions: null
    }
  }

  componentDidMount () {
    getGeocode()
      .then(res => this.setState({ positions: res.data.results[0].geometry.location }))
      .then(res => this.renderMap())
      .catch(console.error)
  }

  renderMap = () => {
    window.initMap = this.initMap
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBmRWdFdstCJl03UBNRzCJ9QKF5kV_R2CY&callback=initMap')
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 42.3601, lng: -71.0589 },
      zoom: 8
    })
    const markers = new window.google.maps.Marker({
      position: this.state.positions,
      map: map
    })
    return markers
  }

  render () {
    return (
      <div className='map' id='map'></div>
    )
  }
}
// this function loads the google maps api script tag to the html after render
function loadScript (url) {
  const index = window.document.getElementsByTagName('script')[0]
  const newScript = window.document.createElement('script')
  newScript.src = url
  newScript.async = true
  newScript.defer = true
  index.parentNode.insertBefore(newScript, index)
}

export default Map
