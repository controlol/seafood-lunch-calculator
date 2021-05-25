import { Component, createRef, Fragment } from 'react'
import createPriceString from '../../functions/price'

import { Label, Select, Input } from '../../styled/Form'
import { SimpleFormGridResponsiveWithButton } from '../../styled/Grid'
import AddOrderItem from './addOrderItem'
import { TotalText, UserContainer } from './styled'

import GarbageBin from '../../assets/img/thinOutline/garbageBin.svg'
import GarbageBinRed from '../../assets/img/thinOutline/garbageBinRed.svg'

class AddOrderUser extends Component {
  constructor() {
    super()
    this.state = {
      newItem: ""
    }

    this.addItemRef = createRef()
  }

  componentDidMount = () => this.addItemRef.current.focus()

  itemInputChange = e => {
    if (this.props.addItem(e)) return this.setState({ newItem: "" })
    this.setState({ newItem: e.target.value })
  }

  render() {
    const { items, products, username, uid, renderFriendsOptionList, changeUser, deleteUser, changeItem, deleteItem, changeAmount } = this.props

    const filteredProudcts = products.filter(v => Object.keys(items).filter(o => (Number)(v.id) === (Number)(o)).length === 0)

    let userPrice = 0;
    Object.keys(items).forEach(v => {
      const amount = items[v],
            price = products.filter(p => (Number)(p.id) === (Number)(v))[0].price

      userPrice += amount * price
    })

    return (
      <UserContainer>
        <SimpleFormGridResponsiveWithButton>
          <Label htmlFor={"selectedUser_" + uid}> Selected user </Label>
          <Select id={"selectedUser_" + uid} onChange={changeUser} value={username} >
            { renderFriendsOptionList() }
            <option value={username}> { username } </option>
          </Select>
          <img
          onClick={deleteUser}
          onMouseLeave={() => this.setState({ deleteImg: GarbageBin })}
          onMouseEnter={() => this.setState({ deleteImg: GarbageBinRed })}
          src={this.state.deleteImg}
          alt="delete"
          width="26"
          height="26"
          style={{ cursor: "pointer" }}
        />

          {
            filteredProudcts.length > 0 &&
            <Fragment>
              <Label htmlFor={"addItem_" + uid}> Add Item </Label>
              <Input ref={this.addItemRef} id={"addItem_" + uid} autoComplete="off" onChange={this.itemInputChange} value={this.state.newItem} list={"addItemList_" + uid} />
            </Fragment>
          }
        </SimpleFormGridResponsiveWithButton>

        {
          Object.keys(items)
          .map(v => {
            const amount = items[v],
                  item = products.filter(p => (Number)(p.id) === (Number)(v))[0],
                  itemInfo = Object.assign({ amount }, item)

            return <AddOrderItem key={uid + v} info={itemInfo} uid={uid} changeItem={e => changeItem(v, e)} deleteItem={() => deleteItem(v)} changeAmount={e => changeAmount(v, e)} />
          })
        }

        <TotalText> Total: { createPriceString(userPrice) } </TotalText>

        <datalist id={"addItemList_" + uid}>
          { filteredProudcts.map(v => <option key={"product_" + v.id} value={v.name}> { v.takeaway_name + " - " + createPriceString(v.price) } </option>) }
        </datalist>
      </UserContainer>
    )
  }
}

export default AddOrderUser