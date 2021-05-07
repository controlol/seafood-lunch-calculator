import { Component } from 'react'
import { Link } from'react-router-dom'
import { Submenu, SubmenuItem } from './styled'

class AccountOptions extends Component {
  constructor() {
    super()
    this.state = {}
  }

  logOut() {
    localStorage.removeItem('logo')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    sessionStorage.removeItem('refreshToken')
    window.location.replace("/login");
  }

  render() {
    return (
      <Submenu onMouseLeave={e => { if (e.pageY > 55) this.props.hideOptions() }}>
        <Link to="/account/me">
          <SubmenuItem> { localStorage.getItem('username') } </SubmenuItem>
        </Link>
        <Link to="/account/usage">
          <SubmenuItem> Usage </SubmenuItem>
        </Link>
        <SubmenuItem onClick={this.logOut}> Log out </SubmenuItem>
      </Submenu>
    )
  }
}

export default AccountOptions