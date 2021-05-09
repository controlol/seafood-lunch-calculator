import { Component } from 'react'
import createPriceString from '../../functions/price'

import { Input, Label } from '../../styled/Form'
import { AmountWrapper, ItemGrid, UserContainer } from './styled'

import GarbageBin from '../../assets/img/thinOutline/garbageBin.svg'
import GarbageBinRed from '../../assets/img/thinOutline/garbageBinRed.svg'

class AddOrderItem extends Component {
  constructor() {
    super()
    this.state = {
      deleteImg: GarbageBin
    }
  }

  incrementAmount = () => this.props.changeAmount({ target: { value: this.props.info.amount + 1 } })

  decrementAmount = () => this.props.changeAmount({ target: { value: this.props.info.amount - 1 } })

  render() {
    const { amount, id, price, name, takeaway_name } = this.props.info

    return (
      <ItemGrid>
        <Label htmlFor={"selectedItem_" + id}> Selected item </Label>
        <span />
        <Label htmlFor={"selectedAmount_" + id}> Amount </Label>
        <span />

        <Input id={"selectedItem_" + id} list="product-list" onChange={this.props.changeItem} value={name} />

        <p> { createPriceString(price * amount) } </p>

        <AmountWrapper>
          <span onClick={this.decrementAmount}> - </span>
          <Input id={"selectedAmount_" + id} pattern="[0-9]+" onChange={this.props.changeAmount} value={amount} />
          <span onClick={this.incrementAmount}> + </span>
        </AmountWrapper>

        <img
          src={this.state.deleteImg}
          onMouseLeave={() => this.setState({ deleteImg: GarbageBin })}
          onMouseEnter={() => this.setState({ deleteImg: GarbageBinRed })}
          alt="delete"
          width="24"
          height="24"
        />
      </ItemGrid>
    )
  }
}

export default AddOrderItem