import { Component, createRef, Fragment } from 'react'
import XHR from '../../functions/XHR'
import createPriceString from '../../functions/price'

import { Input, Label } from '../../styled/Form'

import { Header } from '../../styled/General'
import { ListContainer } from '../../styled/List'
import AddOrderUser from './addOrderUser'

class AddOrder extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      friends: [],
      order: []
    }

    this.newUserRef = createRef()
  }

  componentDidMount = () => {
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
          uid = this.state.friends.filter(v => v.username === username)[0]

    if (!uid) return;

    let order = this.state.order
    order[uid] = []
    this.setState({ order })
  }

  changeUser = (olduid, {target}) => {
    const username = target.value,
          newuid = this.state.friends.filter(v => v.username === username)[0]
    if (!newuid || olduid === newuid) return;
    let order = this.state.order
    delete Object.assign(order, {[newuid]: order[olduid] })[olduid]
    this.setState({ order })
  }

  addItem = (uid, {target}) => {
    const itemName = target.value,
          item = this.state.products.filter(v => v.name === itemName)[0]
    if (!item) return;
    let order = this.state.order
    order[uid].push(Object.assign({ amount: 1 }, item))
    this.setState({ order })
  }

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

  changeAmount = (uid, id, {target}) => {
    const amount = target.value
    if (amount < 1 && amount > 99) return;
    let order = this.state.order
    let item = order[uid].filter(v => v.id === id)[0]
    if (!item) return;
    item.amount = amount
    this.setState({ order })
  }

  renderFriendsOptionList = () => this.state.friends.filter(v => Object.keys(this.state.order).filter(o => v.id === o).length === 0).map(v => <option value={v.username}> { v.username } </option>)

  render() {
    const { products, friends, order } = this.state

    return (
      <ListContainer>
        <Header> Add order </Header>

        {
          Object.keys(order).map(k => {
            const v = order[k]
            const username = friends.filter(v => v.id === k)[0]

            return <AddOrderUser
              key={"order" + k}
              items={v}
              username={username}
              uid={k}
              renderFriendsOptionList={this.renderFriendsOptionList}
              changeUser={e => this.changeUser(k, e)}
              addItem={e => this.addItem(k, e)}
              changeItem={(id, e) => this.changeItem(k, id, e)}
              changeAmount={(id, e) => this.changeAmount(k, id, e)}
            />
          })
        }

        {
          (
            order.length === order.filter(v => v.length > 0).length ||
            !order.length
          ) &&
          <Fragment>
            <Label htmlFor="newUser"> Add user </Label>
            <Input ref={this.newUserRef} id="newUser" onChange={this.addOrderUser} list="friend-list" />
          </Fragment>
        }

        <datalist id="friend-list">
          { this.renderFriendsOptionList() }
        </datalist>

        <datalist id="product-list">
          { products.map(v => <option value={v.name}> { v.takeaway_name + " - " + createPriceString(v.price) } </option>) }
        </datalist>
      </ListContainer>
    )
  }
}

export default AddOrder