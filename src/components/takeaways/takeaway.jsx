import { Component } from 'react'
import { ListItemTitleWrapper, ListItemWrapper, RightText, SubscriptText, TitleText } from '../../styled/List'

class Takeaway extends Component {
  render() {
    const { name, address, city } = this.props.info

    return (
      <ListItemWrapper>
        <ListItemTitleWrapper>
          <TitleText> { name } </TitleText>
          <SubscriptText> { address } </SubscriptText> { /* on click go to the product page where all info of the product is shown and can be edited */}
        </ListItemTitleWrapper>

        <RightText> { city } </RightText>
      </ListItemWrapper>
    )
  }
}

export default Takeaway