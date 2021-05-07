import { Component, createRef } from 'react'
import XHR from '../../functions/XHR'
import { Button, Input, Label } from '../../styled/Form'
import { Header } from '../../styled/General'
import { SimpleFormGridResponsive } from '../../styled/Grid'
import { ListContainer } from '../../styled/List'
import { stringify } from 'querystring'

class AddTakeaway extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      website: "",
      telephone: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)

    this.firstFormItem = createRef()
  }

  handleInputChange = ({target}) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  submitForm = e => {
    e.preventDefault()

    const { name, address, city, postalCode, website, telephone } = this.state
    const data = {
      name,
      address,
      city,
      postalcode: postalCode,
      website,
      telephone
    }

    return XHR({
      method: "PUT",
      url: "takeaway/index.php",
      data: stringify(data)
    })
    .then(() => {
      this.props.addTakeaway({
        name: data.name,
        address: data.address,
        city: data.city
      })
      this.setState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        website: "",
        telephone: ""
      })
      this.firstFormItem.current.focus()
    })
    .catch(err => {})
  }

  render() {
    const { name, address, city, postalCode, website, telephone } = this.state

    return (
      <ListContainer style={{ padding: "1rem" }}>
        <form onSubmit={this.submitForm}>
          <Header> Add takeaway </Header>

          <SimpleFormGridResponsive>
            <Label htmlFor="name"> Takeaway name </Label>
            <Input ref={this.firstFormItem} id="name" name="name" placeholder="Sakaya" required value={name} onChange={this.handleInputChange} />

            <Label htmlFor="address"> Address </Label>
            <Input id="address" name="address" placeholder="Lindengracht 13" required value={address} onChange={this.handleInputChange} />

            <Label htmlFor="city"> City </Label>
            <Input id="city" name="city" placeholder="Opmeer" required value={city} onChange={this.handleInputChange} />

            <Label htmlFor="postalCode"> Postal code </Label>
            <Input id="postalCode" name="postalCode" placeholder="1716 DD" required value={postalCode} onChange={this.handleInputChange} />

            <Label htmlFor="website"> Website </Label>
            <Input id="website" name="website" placeholder="restaurantsakaya.nl" required value={website} onChange={this.handleInputChange} />

            <Label htmlFor="telephone"> Telephone </Label>
            <Input id="telephone" name="telephone" placeholder="0226-352969" required value={telephone} onChange={this.handleInputChange} />
          </SimpleFormGridResponsive>

          <Button> Add takeaway </Button>
        </form>
      </ListContainer>
    )
  }
}

export default AddTakeaway