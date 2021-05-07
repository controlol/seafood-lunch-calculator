import { Component } from 'react'
import { LoginContainer, LoginDevider, LoginForm } from './styled'
import XHR from '../../functions/XHR'
import { stringify } from 'querystring'

import Meme from '../../assets/img/seafood-meme.jpg'
import { Button, Input, Label } from '../../styled/Form'
import Password from '../reusables/password'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      remember: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount = () => this.verifyJWT()

  verifyJWT = () => {
    if (!localStorage.getItem('token')) return;

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

  handleInputChange = ({target}) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  submitForm = e => {
    e.preventDefault()

    const XHRconfig = {
      method: "POST",
      url: "user/login.php",
      data: stringify({
        username: this.state.username,
        password: this.state.password
      })
    }

    return XHR(XHRconfig, "noBearer")
    .then(response => {
      if (!response.data.token || !response.data.refreshToken) return;
      // store token
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("username", this.state.username)

      if (this.state.remember) {
        localStorage.setItem("refreshToken", response.data.refreshToken)
      } else {
        sessionStorage.setItem("refreshToken", response.data.refreshToken)
      }

      this.props.history.push("/");
    })
    .catch(err => console.error({err}))
  }

  render() {
    return (
      <LoginContainer>
        <img src={Meme} alt="seafood meme" width="312" height="256" />

        <LoginDevider />

        <LoginForm onSubmit={this.submitForm}>
          <h1> Seafood Login </h1>

          <Label htmlFor="username"> Username </Label>
          <Input name="username" id="username" placeholder="username" onChange={this.handleInputChange} value={this.state.username} />

          <Label htmlFor="password"> Password </Label>
          <Password name="password" id="password" placeholder="password" onChange={this.handleInputChange} value={this.state.password} />

          <Button> Log in </Button>
        </LoginForm>
      </LoginContainer>
    )
  }
}

export default Login