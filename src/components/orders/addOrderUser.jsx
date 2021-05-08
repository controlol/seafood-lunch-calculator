import { Component } from 'react'
import { Label, Select, Input } from '../../styled/Form'
import AddOrderItem from './addOrderItem'
import { UserContainer } from './styled'

class AddOrderUser extends Component {
  render() {
    const { items, username, uid, renderFriendsOptionList, changeUser, addItem, changeItem, changeAmount } = this.props

    return (
      <UserContainer>
        <Label htmlFor={"selectedUser_" + uid}> Selected user </Label>
        <Select id={"selectedUser_" + uid} onChange={changeUser} value={username} >
          { renderFriendsOptionList() }
          {/* <option value={username}> { username } </option> */}
        </Select>

        {
          items.map(v => <AddOrderItem key={uid + v.id} info={v} changeItem={e => changeItem(v.id, e)} changeAmount={e => changeAmount(v.id, e)} />)
        }

        <Label htmlFor={"addItem_" + username}> Add Item </Label>
        <Input ref={this.newUserRef} id={"addItem_" + username} onChange={addItem} list="product-list" />
      </UserContainer>
    )
  }
}

export default AddOrderUser