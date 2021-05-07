import { Component } from 'react'

class Orders extends Component {
  constructor() {
    super()
    this.state = {
      orders: []
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
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Orders