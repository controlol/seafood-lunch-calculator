import { Component } from 'react'
import createPriceString from '../../functions/price'

import { Label } from '../../styled/Form'
import { AmountInput, AmountWrapper, ItemGrid } from './styled'

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
    const { info, changeAmount, deleteItem } = this.props
    const { amount, id, price, name } = info

    return (
      <ItemGrid>
        <Label htmlFor={"selectedItem_" + id}> Selected item </Label>
        <span />
        <Label htmlFor={"selectedAmount_" + id}> Amount </Label>
        <span />

        <h4> { name } </h4>
        {/* <Input id={"selectedItem_" + id} list={"addItemList_" + uid} autoComplete="off" onChange={changeItem} defaultValue={name} /> */}

        <p> { createPriceString(price * amount) } </p>

        <AmountWrapper>
          <span onClick={this.decrementAmount}> - </span>
          <AmountInput id={"selectedAmount_" + id} pattern="[0-9]+" autoComplete="off" onChange={changeAmount} value={amount} />
          <span onClick={this.incrementAmount}> + </span>
        </AmountWrapper>

        <img
          onClick={deleteItem}
          onMouseLeave={() => this.setState({ deleteImg: GarbageBin })}
          onMouseEnter={() => this.setState({ deleteImg: GarbageBinRed })}
          src={this.state.deleteImg}
          alt="delete"
          width="24"
          height="24"
          style={{ cursor: "pointer" }}
        />
      </ItemGrid>
    )
  }
}

export default AddOrderItem