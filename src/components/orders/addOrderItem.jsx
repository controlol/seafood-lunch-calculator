import { Component } from 'react'
import createPriceString from '../../functions/price'

import { Input, Label } from '../../styled/Form'
import { UserContainer } from './styled'

class AddOrderItem extends Component {
  render() {
    const { amount, id, price, name, takeaway_name } = this.props.info

    return (
      <UserContainer>
        <Label htmlFor={"selectedItem_" + id}> Selected item </Label>
        <Input id={"selectedItem_" + id} list="product-list" onChange={this.props.changeItem} value={name} />

        <Label htmlFor={"selectedAmount_" + id}> Amount </Label>
        <Input id={"selectedAmount_" + id} type="number" onChange={this.props.changeAmount} value={amount} />

        <p> { takeaway_name } </p>
        <p> { createPriceString(price * amount) } </p>

      </UserContainer>
    )
  }
}

export default AddOrderItem