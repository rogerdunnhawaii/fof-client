import React, { Component } from 'react'
import PostForm from '../form-component/Form'
import { Redirect } from 'react-router'
import { updatePost, showPost } from '../api'
import messages from '../form-component/messages'

class EditPost extends Component {
  constructor () {
    super()

    this.state = {
      post: null
    }
  }

  componentDidMount () {
    showPost(this.props.user, this.props.match.params.id)
      .then(res => this.setState({ post: { ...res.data.post } }))
      .catch(console.error)
  }

  handleChange = e => {
    const changes = { [e.target.name]: e.target.value }
    this.setState({ post: { ...this.state.post, ...changes } })
  }

  handleSubmit = e => {
    const { match, user } = this.props
    e.preventDefault()
    updatePost(user, match.params.id, this.state)
      .then(() => this.setState({ shouldRedirect: true }))
      .then(() => this.props.alert(messages.editSuccess, 'success'))
      .catch(() => this.props.alert(messages.editFail, 'danger'))
  }

  render () {
    const { handleChange, handleSubmit, state } = this

    if (this.state.shouldRedirect) {
      return <Redirect to='/' />
    }

    if (!state.post) {
      return <h3 className='loading'>Loading...</h3>
    }

    return (
      <React.Fragment>
        <h1> Edit & Update This Post </h1>
        <PostForm post={this.state.post} handleChange={handleChange} handleSubmit={handleSubmit} user={this.props.user} alert={this.props.alert}/>
      </React.Fragment>
    )
  }
}

export default EditPost
