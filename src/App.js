import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PageRouter from './components'
import Login from './components/login'
import Register from './components/register'

class App extends Component {
  constructor() {
    super()
    this.history = undefined;
  }

  render() {
    return (
      <BrowserRouter history={this.history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={PageRouter} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
