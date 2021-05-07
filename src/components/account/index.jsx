import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Me from './me'
import Friends from './friends'

class AccountRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/account/me" component={Me} />
        <Route path="/account/friends" component={Friends} />
      </Switch>
    )
  }
}

export default AccountRouter