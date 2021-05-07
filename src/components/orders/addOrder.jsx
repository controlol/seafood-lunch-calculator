import { Component, createRef, Fragment } from 'react'
import XHR from '../../functions/XHR'
import { Input, Label } from '../../styled/Form'

import { Header } from '../../styled/General'
import { ListContainer } from '../../styled/List'

class AddOrder extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      friends: [],
      order: [{}]
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

    let order = this.state.order
    order[uid] = [{}]
    this.setState({ order })
  }

  render() {
    const { products, friends, order } = this.state

    return (
      <ListContainer>
        <Header> Add order </Header>

        {
          Object.keys(order).map(k => {
            const v = order[k]

            
          })
        }

        {
          // order.length === order.filter(v => v.length > 0).length &&
          <Fragment>
            <Label htmlFor="newUser"> Add user </Label>
            <Input ref={this.newUserRef} id="newUser" onChange={this.addOrderUser} list="friend-list" />
          </Fragment>
        }

        <datalist id="friend-list">
          { friends.filter(v => Object.keys(order).filter(o => v.id === o).length === 0).map(v => <option value={v.username} />) }
        </datalist>

        <datalist id="products-list">
          { products.filter(v => <option value={v.name}> { v.takeaway_name + " - " + v.takeaway_id } </option>) }
        </datalist>
      </ListContainer>
    )
  }
}

export default AddOrder