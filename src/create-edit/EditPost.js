import React, { Component } from 'react'
import PostForm from '../form-component/Form'
import { Redirect } from 'react-router'
import { updatePost, showPost, getGeocode } from '../api'
import Map from '../home/Map'
import messages from '../form-component/messages'

class EditPost extends Component {
  constructor () {
    super()

    this.state = {
      data: {
        post: null
      },
      latLng: null,
      activateSubmit: false,
      shouldRedirect: false
    }
  }

  componentDidMount () {
    showPost(this.props.user, this.props.match.params.id)
      .then(res => this.setState({
        data: {
          post: res.data.post
        }
      }))
      .catch(console.error)
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
    const { match, user } = this.props
    e.preventDefault()
    updatePost(user, match.params.id, this.state.data)
      .then(() => this.props.getFeed())
      .then(() => this.setState({ shouldRedirect: true }))
      .then(() => this.props.alert(messages.editSuccess, 'success'))
      .catch(() => this.props.alert(messages.editFail, 'danger'))
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
      .catch(() => this.props.alert(messages.editFail, 'danger'))
  }

  render () {
    const { handleChange, handleSubmit, state, showAddressOnMap } = this

    if (state.shouldRedirect) {
      return <Redirect to='/' />
    }

    if (!state.data.post) {
      return <h3 className='loading'>Loading...</h3>
    }

    return (
      <React.Fragment>
        <h1> Edit & Update This Post </h1>
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

export default EditPost
