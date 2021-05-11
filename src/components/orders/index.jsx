import { Component, Fragment } from 'react'
import XHR from '../../functions/XHR'
import { ListContainer } from '../../styled/List'
import AddOrder from './addOrder'
import Order from './order'
import OrderInfo from './orderInfo'

class Orders extends Component {
  constructor() {
    super()
    this.state = {
      orders: {},
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
      user_id: 0
    }
  }

  componentDidMount = () => {
    XHR({
      method: "GET",
      url: "order/list.php"
    })
    .then(response => {
      if (typeof response.data === "object") this.setState({ orders: response.data })
    })
    .catch(err => {})

    XHR({
      method: "GET",
      url: "user/index.php"
    })
    .then(response => {
      if (typeof response.data === "object") {
        let { id, username, friends } = response.data
        friends[id] = {username, avatar: ""}
        // friends.push({ id, username, pending: false, avatar: "" })
        this.setState({ friends, user_id: id })
      }
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

  addOrder = (order, id) => {
    let orders = this.state.orders
    orders[id] = order
    this.setState({ orders })
  }

  render() {
    const { orders, friends, products, user_id } = this.state

    if (this.props.match.params.orderId) return (
      <OrderInfo orderId={this.props.match.params.orderId} history={this.props.history} friends={friends} />
    )



    return (
      <Fragment>
        <AddOrder addOrder={this.addOrder} friends={friends} user_id={user_id} products={products} />

        <ListContainer>
          {
            Object.keys(orders).length > 0 &&
            Object.keys(orders)
            .sort((a,b) => new Date(orders[b].date) - new Date(orders[a].date))
            .map(k => <Order key={"orders_" + k} info={orders[k]} orderId={k} friends={friends} products={products} history={this.props.history} />)
          }
        </ListContainer>
      </Fragment>
    )
  }
}

export default Orders