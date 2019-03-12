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
import CreatePost from './create-post/CreatePost'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state
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
            <Feed user={user} />
            // <CreatePost alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/create-post' render={() => (
            <CreatePost alert={this.alert} user={user} />
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
