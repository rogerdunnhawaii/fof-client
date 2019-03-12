import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, destroyPost } from '../api'
import messages from '../form-component/messages'

import './Feed.scss'

class Feed extends Component {
  constructor () {
    super()

    this.state = {
      posts: null,
      deleted: false
    }
  }

  componentWillMount () {
    this.getFeed()
  }

  getFeed = () => {
    getAllPosts()
      .then(res => this.setState({ posts: res.data.posts.reverse() }))
      .catch(console.error)
  }

  handleDelete = e => {
    const id = e.target.id
    destroyPost(id, this.props.user)
      .then(() => { this.getFeed() })
      .then(() => this.props.alert(messages.deleteSuccess, 'success'))
      .catch(() => this.props.alert(messages.deleteFail, 'danger'))
  }

  render () {
    const { posts } = this.state
    const { handleDelete } = this
    const { user } = this.props

    if (!posts) {
      return (
        <div className='feed'>
          <h3 className='loading'>Loading...</h3>
        </div>
      )
    }

    return (
      <div className='feed'>
        <h3>Free Food in Boston</h3>
        {posts.map(post => {
          return (
            <div key={post.id} className='post'>
              <p><em>User ID: {post.user_id}</em></p>
              <hr/>
              <p><strong>{post.title}</strong></p>
              <p>{post.body}</p>
              <hr/>
              <p>{post.address}</p>
              <hr/>
              {post['image_1'] && <a href={post['image_1']} className="picture-link" target="_blank" rel="noopener noreferrer">See picture</a>}
              {post['image_2'] && <a className="picture-link" href={post['image_2']} target="_blank" rel="noopener noreferrer">See picture2</a>}
              {post['image_3'] && <a className="picture-link" href={post['image_3']} target="_blank" rel="noopener noreferrer">See picture3</a>}
              { user && post.user_id === user.id && <button onClick={handleDelete} id={post.id} >Delete</button> }
              { user && post.user_id === user.id && <Link to={`/posts/${post.id}/edit`} post={post}><button>Edit</button></Link> }
            </div>
          )
        })}
      </div>
    )
  }
}

export default Feed