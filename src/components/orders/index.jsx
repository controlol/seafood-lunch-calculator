import { Component, Fragment } from 'react'
import XHR from '../../functions/XHR'
import AddOrder from './addOrder'

class Orders extends Component {
  constructor() {
    super()
    this.state = {
      orders: [],
      order: []
    }
  }

  componentDidMount = () => {
    return XHR({
      method: "GET",
      url: "order/list.php"
    })
    .then(response => {
      if (typeof response.data === "object") this.setState({ orders: response.data })
    })
    .catch(err => {})
  }

  addOrder = order => {
    let orders = this.state.orders
    orders.unshift(Object.assign({ id: this.state.orders[0]?.id + 1 || 1 }, order))
    this.setState({ orders })
  }

  render() {
    return (
      <Fragment>
        <AddOrder addOrder={this.addOrder} />
      </Fragment>
    )
  }
}

export default Orders