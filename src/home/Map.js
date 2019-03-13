import React, { Component } from 'react'
import { getGeocode } from '../api'
import './Map.scss'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addresses: null,
      markers: null,
      createFormLatLng: props.latLng
    }
  }

  componentDidMount () {
    const address = this.state.addresses
    if (address) {
      getGeocode(address)
      // position gets set here
      // hardcoded address should be changed in api.js
        .then(res => this.setState({ markers: res.data.results[0].geometry.location }))
        .then(res => this.renderMap())
        .catch(console.error)
    } else {
      this.renderMap()
    }
  }

  renderMap = () => {
    window.initMap = this.initMap
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCiPH1VDIHhTQty2EfAUBMDXBKOagM6umo&callback=initMap')
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 42.3601, lng: -71.0589 },
      zoom: 13
    })
    const marker = new window.google.maps.Marker({
      position: this.props.latLng,
      map: map
    })
    return marker
    // const infoWindow = new window.google.maps.InfoWindow({
    //   content: '<h4>Hamburgerss</h4>'
    // })
    //
    // marker.addListener('click', () => {
    //   infoWindow.open(map, marker)
    // })
    // map.addListener('click', () => {
    //   infoWindow.close(map, marker)
    // })
  }

  // fetch the addresses, save them to send to the api
  // create array for marker infos (title, --lat, --lng)
  // setLocations = () => {
  //   const locations = []
  //   const markerTitles = []
  //   this.props.posts.forEach(post => {
  //     locations.push(post.address)
  //     markerTitles.push([post.title])
  //   })
  //   this.setState({ addresses: locations, markers: markerTitles })
  // }

  render () {
    return (
      <div id='map' className={this.props.classType}></div>
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
