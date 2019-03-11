import React, { Component } from 'react'
import { getAllPosts } from '../api'

import './feed.scss'

class Feed extends Component {
  constructor () {
    super()

    this.state = {
      posts: null
    }
  }

  componentWillMount () {
    this.getFeed()
  }

  getFeed = () => {
    getAllPosts()
    // TODO: add messaging
      .then(res => this.setState({ posts: res.data.posts }))
      .catch(console.error)
  }

  render () {
    const { posts } = this.state

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
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>{post.address}</p>
              <a href={post['image_1']} target="_blank" rel="noopener noreferrer">See picture</a>
              {post['image_2'] && <a href={post['image_2']} target="_blank" rel="noopener noreferrer">See picture2</a>}
              {post['image_3'] && <a href={post['image_3']} target="_blank" rel="noopener noreferrer">See picture3</a>}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Feed
