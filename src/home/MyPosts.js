import React, { Component } from 'react'
import Feed from './Feed'
import { destroyPost } from '../api'
import messages from '../form-component/messages'
// import { Redirect } from 'react-router'

class MyPosts extends Component {
  constructor () {
    super()

    this.state = {
      posts: null
    }
  }

  componentDidMount () {
    const userPosts = this.props.posts.filter(post => post.user_id === this.props.user.id).reverse()
    this.setState({ posts: userPosts })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.posts !== this.props.posts) {
      const userPosts = this.props.posts.filter(post => post.user_id === this.props.user.id).reverse()
      this.setState({ posts: userPosts })
    }
  }

  handleDelete = e => {
    const id = e.target.id
    destroyPost(id, this.props.user)
      .then(() => this.props.getFeed())
      .then(() => this.props.alert(messages.deleteSuccess, 'success'))
      .catch(() => this.props.alert(messages.deleteFail, 'danger'))
  }

  render () {
    if (!this.state.posts) {
      return <h3>Loading...</h3>
    }

    return (
      <React.Fragment>
        <h3>My Posts</h3>
        <Feed classType='user-posts' posts={this.state.posts} handleDelete={this.handleDelete} user={this.props.user}/>
      </React.Fragment>
    )
  }
}

export default MyPosts
