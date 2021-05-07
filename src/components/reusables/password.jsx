import React, { Component } from 'react'
import styled from 'styled-components'

import copyToClipboard from '../../functions/copyToClipboard'

import Eye from '../../assets/img/eye.svg'
import EyeSlash from '../../assets/img/eye-slash.svg'
import Copy from '../../assets/img/thinOutline/copy.svg'
import { Input } from '../../styled/Form'

const HidePassword = styled(Input)`
  transition: background-color .2s, outline .2s;
`

const StyledEye = styled.img`
  position: absolute;
  top: .65em;
  right: .6em;
  height: 1.8em;
  border-radius: 2em;
  transition: background-color .4s;
  padding: .2em;
  cursor: pointer;

  &:hover {
    background-color: rgba(255,255,255,.1);
  }
`

const StyledCopy = styled(StyledEye)`
  right: 2.5em;
`

class Password extends Component {
  constructor() {
    super()
    this.state = {
      show: "password",
      imgSource: EyeSlash
    }

    this.inputRef = React.createRef()
  }

  toggleShowPassword = () => {
    if (this.state.show === "text") {
      this.setState({
        show: "password",
        imgSource: EyeSlash
      })
    } else {
      this.setState({
        show: "text",
        imgSource: Eye
      })
    }
  }

  renderCopy = () => {
    if (this.props.showCopy) return <StyledCopy src={Copy} alt="copy-password" onClick={() => copyToClipboard(this.inputRef.current.value)} />
  }

  render() {
    const { id, className, name, onChange, value, style } = this.props

    return (
      <div style={Object.assign({ position: "relative", userSelect: "none" }, style)}>
        <HidePassword ref={this.inputRef} id={id} className={className} type={this.state.show} name={name} autoComplete="off" onChange={typeof onChange === "function" ? onChange : () => {}} value={value} placeholder={this.props.placeholder || "password"} />
        <StyledEye src={this.state.imgSource} alt="view-password" onClick={this.toggleShowPassword} />
        { this.renderCopy() }
      </div>
    )
  }
}

export default Password