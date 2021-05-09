import { Component, createRef } from 'react'
import XHR from '../../functions/XHR'

import { Input, Label } from '../../styled/Form'

import { Header } from '../../styled/General'
import { ListContainer } from '../../styled/List'
import AddOrderUser from './addOrderUser'
import { SimpleFormGridResponsive } from '../../styled/Grid'
import { AddUserWrapper } from './styled'

class AddOrder extends Component {
  constructor() {
    super()
    this.state = {
      products: [
        // {
        //   id: 1,
        //   name: "pizza",
        //   takeaway_name: "adam",
        //   takeaway_id: 2,
        //   price: 1000
        // },
        // {
        //   id: 2,
        //   name: "kapsalon",
        //   takeaway_name: "adam",
        //   takeaway_id: 2,
        //   price: 900
        // },
        // {
        //   id: 3,
        //   name: "pasta",
        //   takeaway_name: "adam",
        //   takeaway_id: 2,
        //   price: 1150
        // }
      ],
      friends: [
        // {
        //   id: 1,
        //   username: "dikzak",
        //   pending: false,
        //   avatar: ""
        // },
        // {
        //   id: 2,
        //   username: "nietdik",
        //   pending: false,
        //   avatar: ""
        // },
        // {
        //   id: 3,
        //   username: "koosje",
        //   pending: false,
        //   avatar: ""
        // }
      ],
      order: {}
    }

    this.newUserRef = createRef()
  }

  componentDidMount = () => {
    // let order = this.state.order
    // order[1] = {}
    // order[1][1] = 3
    // this.setState({ order })

    XHR({
      method: "GET",
      url: "friend.php"
    })
    .then(response => {
      if (typeof response.data === "object") this.setState({ friends: response.data })
    })
    .catch(err => {})

    XHR({
      method: "GET",
      url: "product/list.php"
    })
    .then(response => {
      if (typeof response.data === "object") this.setState({ products: response.data })
    })
    .catch(err => {})
  }

  addOrderUser = () => {
    const username = this.newUserRef.current.value,
          uid = this.state.friends.filter(v => v.username === username)[0].id

    if (!uid) return;

    let order = this.state.order
    order[uid] = []
    this.setState({ order })
  }

  changeUser = (olduid, {target}) => {
    const username = target.value,
          newuid = this.state.friends.filter(v => v.username === username)[0].id
    if (!newuid || olduid === newuid) return;
    let order = this.state.order
    delete Object.assign(order, {[newuid]: order[olduid] })[olduid]
    this.setState({ order })
  }

  addItem = (uid, {target}) => {
    const itemName = target.value,
          item = this.state.products.filter(v => v.name === itemName)[0]
    if (!item) return false
    let order = this.state.order
    order[uid][item.id] = 1
    // order[uid].push(Object.assign({ amount: 1 }, item))
    this.setState({ order })
    return true
  }

  // this function is totally not working as of now, typing in the item box wont allow you to change anything
  changeItem = (uid, oldid, {target}) => {
    const itemName = target.value,
          newItem = this.state.products.filter(v => v.name === itemName)[0]
    if (!newItem || newItem.id === oldid) return;
    let order = this.state.order
    let oldItem = order[uid].filter(v => v.id === oldid)[0]
    if (!oldItem) return;
    oldItem = Object.assign({ amount: oldItem.amount }, newItem)
    this.setState({ order })
  }

  deleteItem = (uid, id) => {
    let order = this.state.order
    delete order[uid][id]
    this.setState({ order })
  }

  changeAmount = (uid, id, {target}) => {
    const amount = target.value === 0 ? 0 : Number.parseInt(target.value) || ""
    if ((amount < 1 || amount > 99) && amount !== "") return;
    let order = this.state.order
    if (order[uid][id] || order[uid][id] === "") order[uid][id] = amount
    this.setState({ order })
  }

  renderFriendsOptionList = () => this.state.friends.filter(v => Object.keys(this.state.order).filter(o => (Number)(v.id) === (Number)(o)).length === 0 && v.pending === false).map(v => <option key={"friend_" + v.id} value={v.username}> { v.username } </option>)

  render() {
    const { products, friends, order } = this.state

    return (
      <ListContainer>
        <Header> Add order </Header>

        {
          Object.keys(order).map(k => {
            const v = order[k]
            const username = friends.filter(v => (Number)(v.id) === (Number)(k))[0].username

            return <AddOrderUser
              key={"order" + k}
              items={v}
              products={products}
              username={username}
              uid={k}
              renderFriendsOptionList={this.renderFriendsOptionList}
              changeUser={e => this.changeUser(k, e)}
              addItem={e => this.addItem(k, e)}
              changeItem={(id, e) => this.changeItem(k, id, e)}
              deleteItem={id => this.deleteItem(k, id)}
              changeAmount={(id, e) => this.changeAmount(k, id, e)}
            />
          })
        }

        {
          friends.filter(v => Object.keys(this.state.order).filter(o => (Number)(v.id) === (Number)(o)).length === 0 && v.pending === false).length > 0 &&
          <AddUserWrapper>
            <SimpleFormGridResponsive>
              <Label htmlFor="newUser" style={{ fontSize: "1.2rem" }}> Add user </Label>
              <Input ref={this.newUserRef} id="newUser" autoComplete="off" onChange={this.addOrderUser} list="friend-list" />
            </SimpleFormGridResponsive>
          </AddUserWrapper>
        }

        <datalist id="friend-list">
          { this.renderFriendsOptionList() }
        </datalist>
      </ListContainer>
    )
  }
}

export default AddOrder