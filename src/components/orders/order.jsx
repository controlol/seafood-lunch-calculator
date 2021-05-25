import { Component } from 'react'
import createPriceString from '../../functions/price'

import { ListItemTitleWrapper, ListItemWrapper, RightText } from '../../styled/List'
import { OrderInfoGrid, OrderItemList, OrderPaymentGrid, OrderUserGrid } from './styled'

class Order extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const { products, friends, info, orderId, history } = this.props
    const { date, items, created_by, paid_by } = info

    let totalOrderPrice = 0
    Object.values(items).forEach(v => {
      Object.keys(v).forEach(k => {
        const amount = v[k],
              price = products.filter(p => (Number)(p.id) === (Number)(k))[0]?.price

        totalOrderPrice += amount * price
      })
    })

    return (
      <OrderItemList onClick={() => history.push("/orders/" + orderId)}>
        <OrderUserGrid>
          <p> Created by: </p>
          <strong> { friends[created_by]?.username || `unknown (${created_by})` } </strong>

          <p> Paid by: </p>
          <strong> { friends[paid_by]?.username || `unknown (${paid_by})` } </strong>
        </OrderUserGrid>

        <OrderInfoGrid>
          <OrderPaymentGrid>
            <p> Paid: </p>
            <strong> { createPriceString(info.paid_amount > 0 ? info.paid_amount : totalOrderPrice) } </strong>
            <p> Estimated: </p>
            <p> { createPriceString(totalOrderPrice) } </p>
          </OrderPaymentGrid>
          <p> { new Date(date).toLocaleString() } </p>
        </OrderInfoGrid>
      </OrderItemList>
    )
  }
}

export default Order