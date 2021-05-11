import { Component } from 'react'
import XHR from '../../functions/XHR'
import createPriceString from '../../functions/price'

import { ListContainer, RightText } from '../../styled/List'
import { ItemGrid, OrderSummaryHeader, OrderSummaryItem, OrderTitleAmount, TotalText, UserContainer } from './styled'

class OrderInfo extends Component {
  constructor() {
    super()
    this.state = {
      info: {}
    }
  }

  componentDidMount = () => {
    return XHR({
      method: "GET",
      url: "order/index.php",
      params: { order_id: this.props.orderId }
    })
    .then(response => {
      console.log(response.data)
      if (typeof response.data === "object") this.setState({ info: response.data })
    })
    .catch(err => {})
  }

  render() {
    const { created_by, date, paid_by, paid_amount, order } = this.state.info
    const { friends } = this.props

    if (Object.keys(this.state.info).length > 0) {
      let totalOrderPrice = 0
      Object.values(order).forEach(v => {
        Object.keys(v).forEach(k => {
          const amount = v[k].amount,
                price = v[k].price

          totalOrderPrice += amount * price
        })
      })

      return (
        <ListContainer>
          <OrderSummaryHeader>
            <OrderTitleAmount>
              <p> Created by: </p>
              <strong> { friends.filter(v => (Number)(v.id) === (Number)(created_by))[0]?.username || `unknown (${created_by})` } </strong>
            </OrderTitleAmount>
            <OrderTitleAmount>
              <p> Paid by: </p>
              <strong> { friends.filter(v => (Number)(v.id) === (Number)(paid_by))[0]?.username || `unknown (${created_by})` } </strong>
            </OrderTitleAmount>
            <OrderTitleAmount>
              <p> Paid amount: </p>
              <strong> { createPriceString(paid_amount > 0 ? paid_amount : totalOrderPrice) } </strong>
            </OrderTitleAmount>
            <p> { new Date(date).toLocaleString() } </p>
          </OrderSummaryHeader>

          {
            order &&
            Object.keys(order).map(uid => {
              const items = order[uid]

              let userPrice = 0;
              Object.keys(items).forEach(v => {
                const amount = items[v].amount,
                      price = items[v].price

                userPrice += amount * price
              })

              return (
                <UserContainer>
                  <h3> { friends.filter(v => (Number)(v.id) === (Number)(uid))[0]?.username || `unknown (${created_by})` } </h3>

                  {
                    Object.keys(items).map(k => {
                      const { product_name, amount, price, takeaway_name } = items[k]

                      return (
                        <OrderSummaryItem>
                          <OrderTitleAmount>
                            <h4> { product_name } </h4>
                            <i> x{ amount } </i>
                          </OrderTitleAmount>
                          <p> { takeaway_name } </p>
                          <p> { createPriceString(price * amount) } </p>
                        </OrderSummaryItem>
                      )
                    })
                  }

                  <TotalText> Total: { createPriceString(userPrice) } </TotalText>
                </UserContainer>
              )
            })

          }

          <TotalText> Estimated order total: { createPriceString(totalOrderPrice) } </TotalText>
        </ListContainer>
      )
    }

    return (
      <ListContainer />
    )
  }
}

export default OrderInfo