import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Feed from './home/Feed'
import { withRouter } from 'react-router'
import CreatePost from './create-edit/CreatePost'
import EditPost from './create-edit/EditPost'
// import Map from './home/Map'
import { getAllPosts, destroyPost } from './api'
import messages from './form-component/messages'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      posts: null,
      deleted: false
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  componentDidMount () {
    this.getFeed()
  }

  getFeed = () => {
    getAllPosts()
      .then(res => this.setState({ posts: res.data.posts.reverse() }))
      .catch(console.error)
  }

  handleDelete = e => {
    const id = e.target.id
    destroyPost(id, this.state.user)
      .then(() => { this.getFeed() })
      .then(() => this.alert(messages.deleteSuccess, 'success'))
      .catch(() => this.alert(messages.deleteFail, 'danger'))
  }

  render () {
    const { alerts, user, posts } = this.state
    const { handleDelete } = this
    const { location } = this.props

    return (
      <React.Fragment>
        <Header
          user={user}
          isHome={location.pathname === '/'}
          isNewPost={location.pathname !== '/create-post' && user}
        />
        <div className='user-message'>
          {alerts.map((alert, index) => (
            <Alert className='alert-itself' key={index} dismissible variant={alert.type}>
              {alert.message}
            </Alert>
          ))}
        </div>
        <main className="container">
          <Route exact path='/' render={() => (
            <React.Fragment>
              {/* <Map user={user} alert={this.alert} /> */}
              <Feed user={user} posts={posts} handleDelete={handleDelete} alert={this.alert} />
            </React.Fragment>
          )} />

          <AuthenticatedRoute user={user} path='/create-post' render={() => (
            <CreatePost alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/posts/:id/edit' render={({ match, post }) => (
            <EditPost match={match} post={post} alert={this.alert} user={user}/>
          )} />

          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default withRouter(App)
