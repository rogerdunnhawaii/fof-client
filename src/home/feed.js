import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Feed.scss'

class Feed extends Component {
  constructor () {
    super()

    this.state = {
    }
  }

  // hidePosts () {
  //   this.setState({ class: 'hidden' })
  //   console.log('i')
  // }

  render () {
    const { posts, handleDelete, user } = this.props

    if (!posts) {
      return (
        <div className='feed'>
          <h3 className='loading'>Loading...</h3>
        </div>
      )
    }

    return (
      <React.Fragment>
        <button className='close-posts'></button>
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
      </React.Fragment>
    )
  }
}

export default Feed
