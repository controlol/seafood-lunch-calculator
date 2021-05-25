import { Component, createRef, Fragment } from 'react'
import XHR from '../../functions/XHR'
import createPriceString from '../../functions/price'

import { Button, Input, Label } from '../../styled/Form'

import { Header } from '../../styled/General'
import { ListContainer } from '../../styled/List'
import AddOrderUser from './addOrderUser'
import { SimpleFormGridResponsive } from '../../styled/Grid'
import { AddUserWrapper, TotalText } from './styled'

class AddOrder extends Component {
  constructor() {
    super()
    this.state = {
      order: {}
    }

    this.newUserRef = createRef()
  }

  componentDidMount = () => {
    // let order = this.state.order
    // order[1] = {}
    // order[1][1] = 3
    // this.setState({ order })
  }

  addOrderUser = () => {
    const username = this.newUserRef.current.value,
          uid = Object.keys(this.props.friends).filter(k => this.props.friends[k].username === username)[0]
          // uid = this.props.friends.filter(v => v.username === username)[0]?.id

    if (!uid) return;

    let order = this.state.order
    order[uid] = {}
    this.setState({ order })
    this.newUserRef.current.value = ""
  }

  changeUser = (olduid, {target}) => {
    const username = target.value,
          newuid = Object.keys(this.props.friends).filter(k => this.props.friends[k] === username)[0]
          // newuid = this.props.friends.filter(v => v.username === username)[0]?.id
    if (!newuid || olduid === newuid) return;
    let order = this.state.order
    delete Object.assign(order, {[newuid]: order[olduid] })[olduid]
    this.setState({ order })
  }

  deleteUser = uid => {
    let order = this.state.order
    delete order[uid]
    this.setState({ order })
  }

  addItem = (uid, {target}) => {
    const itemName = target.value,
          item = this.props.products.filter(v => v.name === itemName)[0]
    if (!item) return false
    let order = this.state.order
    // Object.assign(order[uid], { [item.id]: 1 })
    order[uid] = { ...order[uid], [item.id]: 1 }
    // order[uid][item.id] = 1
    console.log(order)
    this.setState({ order })
    return true
  }

  // this function is totally not working as of now, typing in the item box wont allow you to change anything
  changeItem = (uid, oldid, {target}) => {
    const itemName = target.value,
          newItem = this.props.products.filter(v => v.name === itemName)[0]
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

  saveOrder = () => {
    return XHR({
      method: "PUT",
      url: "order/index.php",
      data: this.state.order
    })
    .then(response => {
      if (response.data.order_id) {
        this.props.addOrder({
          created_by: this.props.user_id,
          created_by: this.props.user_id,
          // paid_by: this.props.friends[this.props.friends.length - 1].id,
          // paid_by: this.props.friends[this.props.friends.length - 1].id,
          paid_amount: 0,
          date: new Date().toLocaleString(),
          items: this.state.order
        }, response.data.order_id)
        this.setState({ order: {} })
      }
    })
    .catch(err => {})
  }

  // renderFriendsOptionList = () => this.props.friends.filter(v => Object.keys(this.state.order).filter(o => (Number)(v.id) === (Number)(o)).length === 0 && !v.pending).map(v => <option key={"friend_" + v.id} value={v.username}> { v.username } </option>)
  renderFriendsOptionList = () => 
    Object.keys(this.props.friends)
    .filter(uid => 
      Object.keys(this.state.order)
      .filter(o => (Number)(uid) === (Number)(o)).length === 0)
    .map(uid => {
      const { username } = this.props.friends[uid]

      return <option key={"friend_" + uid} value={username}> { username } </option>
    })

  render() {
    const { order } = this.state
    const { products, friends } = this.props

    let totalOrderPrice = 0
    Object.values(order).forEach(u => {
      Object.keys(u).forEach(v => {
        const amount = u[v],
              price = products.filter(p => (Number)(p.id) === (Number)(v))[0].price

        totalOrderPrice += amount * price
      })
    })

    return (
      <ListContainer>
        <Header> Add order </Header>

        {
          Object.keys(this.props.friends)
          .filter(uid => 
            Object.keys(this.state.order)
            .filter(o => (Number)(uid) === (Number)(o)).length === 0).length > 0 &&
          <Fragment>
            {
              Object.keys(friends).length > 1 &&
                <SimpleFormGridResponsive>
                  <Label htmlFor="newUser" style={{ fontSize: "1.2rem" }}> Add user </Label>
                  <Input ref={this.newUserRef} id="newUser" autoComplete="off" onChange={this.addOrderUser} list="friend-list" />
                </SimpleFormGridResponsive>
            }

            {
              Object.keys(friends).length === 1 &&
              <h3 style={{ textAlign: "center", padding: "1rem" }}> To create an order you need to add friends first </h3>
            }
          </Fragment>
        }

        {
          Object.keys(order).map(uid => {
            const v = order[uid]
            const username = friends[uid].username
            // const username = friends.filter(v => (Number)(v.id) === (Number)(uid))[0].username

            return <AddOrderUser
              key={"order" + uid}
              items={v}
              products={products}
              username={username}
              uid={uid}
              renderFriendsOptionList={this.renderFriendsOptionList}
              changeUser={e => this.changeUser(uid, e)}
              deleteUser={() => this.deleteUser(uid)}
              addItem={e => this.addItem(uid, e)}
              changeItem={(id, e) => this.changeItem(uid, id, e)}
              deleteItem={id => this.deleteItem(uid, id)}
              changeAmount={(id, e) => this.changeAmount(uid, id, e)}
            />
          })
        }

        <div style={{
          display: "grid",
          gridTemplateRows: "auto",
          gridTemplateColumns: "1fr 1fr",
          justifyContent: "flex-end",
          alignItems: "center"
        }}>
          {
            totalOrderPrice > 0 ?
            // <AddUserWrapper>
              <Button style={{ transform: "translateX(50%)", margin: "0 0 0 auto" }} onClick={this.saveOrder}> Save order </Button>
              :
              <span/>
            // </AddUserWrapper>
          }

          <TotalText> Estimated order total: { createPriceString(totalOrderPrice) } </TotalText>
        </div>


        <datalist id="friend-list">
          { this.renderFriendsOptionList() }
        </datalist>
      </ListContainer>
    )
  }
}

export default AddOrder