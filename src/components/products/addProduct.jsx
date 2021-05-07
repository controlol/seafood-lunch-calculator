import { Component, createRef } from 'react'
import XHR from '../../functions/XHR'
import { Button, Input, Label } from '../../styled/Form'
import { Header } from '../../styled/General'
import { SimpleFormGridResponsiveWithButton } from '../../styled/Grid'
import { stringify } from 'querystring'
import { ListContainer } from '../../styled/List'
import createPriceString from '../../functions/price'

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      takeaway: "",
      price: "",
      priceStr: createPriceString(0),
      takeaways: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)

    this.firstFormItem = createRef()
  }

  handleInputChange = ({target}) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({ [name]: value })

    if (name === "takeaway") {
      return XHR({
        method: "GET",
        url: "takeaway/search.php",
        params: { takeaway_name: value }
      })
      .then(response => {
        if (typeof response.data === "object") this.setState({ takeaways: response.data || [] })
      })
      .catch(err => {})
    }
    if (name === "price") {
      let priceStr = createPriceString(value)
      this.setState({ priceStr })
    }
  }

  submitForm = e => {
    e.preventDefault()

    const { name, takeaway, price, takeaways } = this.state
    const data = {
      name,
      takeaway_id: takeaways.filter(v => v.name === takeaway)[0]?.id || undefined,
      price
    }

    return XHR({
      method: "PUT",
      url: "product/index.php",
      data: stringify(data)
    })
    .then(() => {
      console.log("got into .then on add product")
      this.props.addProduct({
        name: data.name,
        takeaway_id: data.takeaway_id,
        takeaway_name: takeaway,
        price: data.price.replace(/\D/g,'')
      })
      this.setState({
        name: "",
        price: "",
        priceStr: createPriceString(0)
      })
      this.firstFormItem.current.focus()
    })
    .catch(err => {})
  }

  render() {
    const { name, takeaway, price, priceStr, takeaways } = this.state

    return (
      <ListContainer style={{ padding: "1rem" }}>
        <form onSubmit={this.submitForm}>
          <Header> Add product </Header>

          <SimpleFormGridResponsiveWithButton>
            <Label htmlFor="name"> Product name </Label>
            <Input ref={this.firstFormItem} id="name" name="name" placeholder="Fries" required value={name} onChange={this.handleInputChange} />
            <span />

            <Label htmlFor="takeaway"> Takeaway </Label>
            <Input id="takeaway" name="takeaway" list="takeaway-list" placeholder="Mac Donalds" required value={takeaway} onChange={this.handleInputChange} />
            <Button type="button" tabIndex="-1"> Add takeaway </Button>

            <Label htmlFor="price"> Price </Label>
            <Input id="price" name="price" placeholder="2,00" rquired value={price} onChange={this.handleInputChange} />
            <span> ({ priceStr }) </span>
          </SimpleFormGridResponsiveWithButton>

          <Button> Add Product </Button>
        </form>

        <datalist id="takeaway-list">
          {
            takeaways &&
            takeaways.map(v => <option key={"takeaway_" + v.id} value={v.name}> { v.address + ", " + v.city } </option>)
          }
        </datalist>

      </ListContainer>
    )
  }
}

export default AddProduct