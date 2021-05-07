import { Component } from 'react'
import { LoginContainer, LoginDevider, LoginForm } from '../login/styled'
import XHR from '../../functions/XHR'
import { stringify } from 'querystring'

import Meme from '../../assets/img/seafood-meme.jpg'
import { Button, Input, Label } from '../../styled/Form'
import Password from '../reusables/password'
import { ErrorBox } from '../../styled/General'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      fullname: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount = () => this.verifyJWT()

  verifyJWT = () => {
    if (!localStorage.getItem('token')) return this.setState({ loggedIn: false })

    const XHRconfig = {
      method: "GET",
      url: "/account/loginjwt"
    }

    return XHR(XHRconfig, "withBearer")
    .then(() => { this.setState({ loggedIn: true }); this.props.history.push("/site") })
    .catch(() => this.setState({ loggedIn: false }))
  }

  handleInputChange = ({target}) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  submitForm = e => {
    e.preventDefault()

    const data = {
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password
    }

    return XHR({
      method: "PUT",
      url: "user/index.php",
      data: stringify(data),
    }, "no Bearer")
    .then(() => this.props.history.push("/login"))
    .catch(err => this.setState({ error: err.response?.data?.error || "unknown error" }))
  }

  render() {
    const { username, fullname, password, error } = this.state

    return (
      <LoginContainer>
        <img src={Meme} alt="seafood meme" width="312" height="256" />

        <LoginDevider />

        <LoginForm onSubmit={this.submitForm}>
          <h1> Seafood Register </h1>

          { error && <ErrorBox> { error } </ErrorBox> }

          <Label htmlFor="username"> Username </Label>
          <Input name="username" id="username" placeholder="username" onChange={this.handleInputChange} value={username} />

          <Label htmlFor="fullname"> Full name </Label>
          <Input name="fullname" id="fullname" placeholder="fullname" onChange={this.handleInputChange} value={fullname} />

          <Label htmlFor="password"> Password </Label>
          <Password name="password" id="password" placeholder="password" onChange={this.handleInputChange} value={password} />

          <Button> Register </Button>
        </LoginForm>
      </LoginContainer>
    )
  }
}

export default Register