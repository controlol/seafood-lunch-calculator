import { Component, Fragment } from 'react'
import XHR from '../functions/XHR'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Navbar from './navbar'

import Products from './products'
import Orders from './orders'
import Account from './account'
import Takeaways from './takeaways'
import { MainContainer } from '../styled/General'

const Main = styled.div`
  max-width: 1500px;
  margin: auto;
  padding: 0 1em;

  @media only screen and (max-width: 800px) {
    padding: unset;
  }

  @media only screen and (min-width: 1500px) {
    padding: 0 calc(calc(1532px - 100vw) / 2);
  }
  @media only screen and (min-width: 1532px) {
    padding: unset;
  }
`

class PageRouter extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: true
    }
  }

  // componentDidMount = () => this.verifyJWT()

  verifyJWT = () => {
    if (!localStorage.getItem('token')) return this.props.history.push("/login")

    const XHRconfig = {
      method: "GET",
      url: "user/logintoken.php",
    }

    return XHR(XHRconfig)
    .then(() => {
      this.setState({ loggedIn: true })
      if (this.props.history.location.pathname === "/") this.props.history.push("/orders")
    })
    .catch(err => console.warn("XHR failed", err))
  }

  render() {
    if (this.state.loggedIn) return (
      <Fragment>
      <Route path="/" component={Navbar} />
        <Main>
          <MainContainer>
            <Switch>
              <Route path="/orders/:orderId?/:edit?" component={Orders} />
              <Route path="/products" component={Products} />
              <Route path="/takeaways" component={Takeaways} />
              <Route path="/account" component={Account} />
            </Switch>
          </MainContainer>
        </Main>
      </Fragment>
    )

    return <Fragment />
  }
}

export default PageRouter