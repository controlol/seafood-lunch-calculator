import React, { Component, createRef } from 'react'
import { Link } from'react-router-dom'

import { NavLogo, HeaderStyle, HeaderTextBox, HeaderText, NavStyle, NavToggleLabel, NavToggleInput, HeaderItems, HeaderAccountName, HeaderAccountText } from './styled'

import Logo from '../../assets/img/favicon.png';
import AccountOptions from './accountOptions';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      navStyle: {},
      headerTextStyle: {},
      headerStyle: {},
      showAccountOptions: false
    }

    this.oldScroll = 0
    this.toggleRef = createRef()
    this.scrollEventTimeout = undefined
  }

  toggleShow = e => {
    if (e?.target?.checked || this.toggleRef.current.checked) {
      this.setState({
        navStyle: {
          transform: "scale(1,1)",
          backgroundColor: "rgba(0,0,0,.87)",
          borderBottom: "3px solid var(--primary-color)",
          paddingTop: "1em"
        },
        headerTextStyle: {
          opacity: "1",
          transition: "opacity 250ms ease-in-out 250ms"
        }
      })
      if (window.scrollY <= 50) this.setState({ headerStyle: { backgroundColor: "white" } })
    } else {
      this.setState({
        navStyle: {},
        headerTextStyle: {},
        headerStyle: {}
      })
      if (window.scrollY > 50) this.setState({ headerStyle: { backgroundColor: "white" } })
    }
  }

  hideDropdown = () => {
    this.toggleRef.current.checked = false
    this.toggleShow()
  }

  render() {
    const pathname = this.props.history.location.pathname,
          { headerTextStyle, headerStyle, navStyle } = this.state

    return (
      <HeaderStyle style={headerStyle}>
        <Link to="/orders">
          <NavLogo src={localStorage.getItem('logo') ? localStorage.getItem('logo') : Logo} alt="Web-Fuse Logo" width="48" height="48" />
        </Link>

        <NavStyle style={navStyle}>
          <HeaderItems>
            <Link to="/orders" onClick={this.hideDropdown}>
              <HeaderTextBox>
                <HeaderText style={Object.assign({ color: /^\/orders.*/.test(pathname) ? "var(--secondary-color)" : "var(--primary-color)"}, headerTextStyle)}>
                  Orders
                </HeaderText>
              </HeaderTextBox>
            </Link>

            <Link to="/products" onClick={this.hideDropdown}>
              <HeaderTextBox>
                <HeaderText style={Object.assign({ color: /^\/products.*/.test(pathname) ? "var(--secondary-color)" : "var(--primary-color)"}, headerTextStyle)}>
                  Products
                </HeaderText>
              </HeaderTextBox>
            </Link>

            <Link to="/takeaways" onClick={this.hideDropdown}>
              <HeaderTextBox>
                <HeaderText style={Object.assign({ color: /^\/takeaways.*/.test(pathname) ? "var(--secondary-color)" : "var(--primary-color)"}, headerTextStyle)}>
                  Takeaways
                </HeaderText>
              </HeaderTextBox>
            </Link>

              <HeaderTextBox
                onClick={() => this.setState({ showAccountOptions: !this.state.showAccountOptions })}
                onMouseEnter={() => this.setState({ showAccountOptions: true })}
                onMouseLeave={e => { if (e.pageY < 45) this.setState({ showAccountOptions: false })}}
              >
                <HeaderAccountText style={Object.assign({ color: /^\/account.*/.test(pathname) ? "var(--secondary-color)" : "var(--primary-color)"}, headerTextStyle)}>
                  Account
                  <HeaderAccountName style={headerTextStyle}>
                    { localStorage.getItem('username') }
                  </HeaderAccountName>
                </HeaderAccountText>
                {
                  this.state.showAccountOptions &&
                  <AccountOptions hideOptions={() => this.setState({ showAccountOptions: false })} />
                }
              </HeaderTextBox>
          </HeaderItems>
        </NavStyle>

        <NavToggleLabel htmlFor="nav-toggle">
          <NavToggleInput ref={this.toggleRef} onChange={this.toggleShow} type="checkbox" id="nav-toggle" aria-label="show navigation bar" />
        </NavToggleLabel>

      </HeaderStyle>
    )
  }
}

export default Navbar;