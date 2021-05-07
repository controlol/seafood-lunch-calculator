import { Component } from 'react'
import { ListItemTitleWrapper, ListItemWrapper, RightText, SubscriptText, TitleText } from '../../styled/List'

import createPriceString from '../../functions/price'

class Product extends Component {
  render() {
    const { takeaway_name, name, price } = this.props.info

    return (
      <ListItemWrapper>
        <ListItemTitleWrapper>
          <TitleText> { name } </TitleText>
          <SubscriptText> { takeaway_name } </SubscriptText> { /* on click go to the product page where all info of the product is shown and can be edited */}
        </ListItemTitleWrapper>

        <RightText> { createPriceString(price) } </RightText>
      </ListItemWrapper>
    )
  }
}

export default Product