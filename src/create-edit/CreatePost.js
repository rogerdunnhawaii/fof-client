import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import PostForm from '../form-component/Form'
import { Redirect } from 'react-router'
import { createPost, getGeocode } from '../api'
import messages from '../form-component/messages'
import Map from '../home/Map'

class CreatePost extends Component {
  constructor () {
    super()

    this.state = {
      data: {
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
      },
      latLng: null,
      activateSubmit: false,
      shouldRedirect: false
    }
  }

  handleChange = e => {
    const changes = { [e.target.name]: e.target.value }
    this.setState({
      data: {
        post: {
          ...this.state.data.post, ...changes
        }
      }
    })

    if (e.target.name === 'address') {
      this.setState({ latLng: null, activateSubmit: false })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    createPost(this.props.user, this.state.data)
      .then(() => this.props.getFeed())
      .then(() => {
        this.setState({ shouldRedirect: true })
      })
      .then(() => this.props.alert(messages.createSuccess, 'success'))
      .catch(() => this.props.alert(messages.createFail, 'danger'))
  }

  showAddressOnMap = e => {
    e.preventDefault()
    getGeocode(this.state.data.post.address)
      .then(res => {
        const latLng = res.data.results[0].geometry.location
        this.setState({
          data: {
            post: {
              ...this.state.data.post, ...latLng
            }
          }
        })
        return latLng
      })
      .then(latLng => {
        this.setState({ latLng: latLng })
        this.setState({ activateSubmit: true })
      })
      // TODO: Add error message
      .catch(() => messages.createFail, 'danger')
  }

  render () {
    const { handleChange, handleSubmit, state, showAddressOnMap } = this

    if (state.shouldRedirect) {
      return <Redirect to='/' />
    }

    return (
      <React.Fragment>
        <h1> Create a Post </h1>
        <PostForm key='form'
          activateSubmit={state.activateSubmit}
          post={state.data.post}
          showAddressOnMap={showAddressOnMap}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          user={this.props.user}
          alert={this.props.alert}
        />
        { state.latLng && <Map key='map' latLng={state.latLng} classType='map-create-post'/> }
      </React.Fragment>
    )
  }
}

export default CreatePost
