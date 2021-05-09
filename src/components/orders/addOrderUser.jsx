import { Component } from 'react'
import { Label, Select, Input } from '../../styled/Form'
import { SimpleFormGridResponsive } from '../../styled/Grid'
import AddOrderItem from './addOrderItem'
import { UserContainer } from './styled'

class AddOrderUser extends Component {
  constructor() {
    super()
    this.state = {
      newItem: ""
    }


  }

  itemInputChange = e => {
    if (this.props.addItem(e)) return this.setState({ newItem: "" })
    this.setState({ newItem: e.target.value })
  }

  render() {
    const { items, username, uid, renderFriendsOptionList, changeUser, changeItem, changeAmount } = this.props

    return (
      <UserContainer>
        <SimpleFormGridResponsive>
          <Label htmlFor={"selectedUser_" + uid}> Selected user </Label>
          <Select id={"selectedUser_" + uid} onChange={changeUser} value={username} >
            { renderFriendsOptionList() }
            <option value={username}> { username } </option>
          </Select>

          <Label htmlFor={"addItem_" + username}> Add Item </Label>
          <Input id={"addItem_" + username} onChange={this.itemInputChange} value={this.state.newItem} list="product-list" />
        </SimpleFormGridResponsive>

        {
          items.map(v => <AddOrderItem key={uid + v.id} info={v} changeItem={e => changeItem(v.id, e)} changeAmount={e => changeAmount(v.id, e)} />)
        }
      </UserContainer>
    )
  }
}

export default AddOrderUser