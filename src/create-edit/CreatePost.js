import React, { Component } from 'react'
import PostForm from '../form-component/Form'
import { Redirect } from 'react-router'
import { createPost, getGeocode } from '../api'
import messages from '../form-component/messages'
import Map from '../home/Map'

class CreatePost extends Component {
  constructor () {
    super()

    this.state = {
      post: {
        title: '',
        body: '',
        address: '',
        lat: '',
        lng: '',
        image_1: '',
        image_2: '',
        image_3: ''
      }
    }
  }

  handleChange = e => {
    const changes = { [e.target.name]: e.target.value }
    this.setState({ post: { ...this.state.post, ...changes } })
  }

  handleSubmit = e => {
    e.preventDefault()
    createPost(this.props.user, this.state)
      .then(() => this.setState({ shouldRedirect: true }))
      .then(() => this.props.alert(messages.createSuccess, 'success'))
      .catch(() => this.props.alert(messages.createFail, 'danger'))
  }

  showAddressOnMap = e => {
    e.preventDefault()
    getGeocode(this.state.post.address)
      .then(res => {
        const latLng = res.data.results[0].geometry.location
        console.log(latLng)
        this.setState({ post: { ...this.state.post, ...latLng } })
        return latLng
      })
      .then(latLng => {
        this.setState({ latLng: latLng })
        this.setState({ activateSubmit: true })
      })
      // TODO: Add error message
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit, state, showAddressOnMap } = this
    // const { lat, lng } = this.state.post

    if (state.shouldRedirect) {
      return <Redirect to='/' />
    }

    return (
      <React.Fragment>
        <h1> Create a Post </h1>
        <PostForm activateSubmit={state.activateSubmit} post={state.post} showAddressOnMap={showAddressOnMap} handleChange={handleChange} handleSubmit={handleSubmit} user={this.props.user} alert={this.props.alert}/>
        { state.latLng && <Map latLng={state.latLng} classType='map-create-post'/> }
      </React.Fragment>
    )
  }
}

export default CreatePost
