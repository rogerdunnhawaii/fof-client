import React, { Component } from 'react'
import PostForm from '../forms/Form'
import { Redirect } from 'react-router'
import { createPost } from '../api'
import messages from '../forms/messages'

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

  render () {
    const { handleChange, handleSubmit, state } = this

    if (state.shouldRedirect) {
      return <Redirect to='/' />
    }

    return (
      <React.Fragment>
        <h1> Create a Post </h1>
        <PostForm post={state.post} handleChange={handleChange} handleSubmit={handleSubmit} user={this.props.user} alert={this.props.alert}/>
      </React.Fragment>
    )
  }
}

export default CreatePost
