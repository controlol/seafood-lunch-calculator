import styled from 'styled-components'
import { Input } from '../../styled/Form'
import { ListItemWrapper } from '../../styled/List'

export const UserContainer = styled(ListItemWrapper)`
  justify-content: unset;
  flex-direction: column;
  border-radius: .25rem;
  background: var(--background-gradient-medium);
  margin-bottom: 1rem;
  box-shadow: unset;
`

export const AddUserWrapper = styled.div`
  background: var(--background-gradient-light);
  padding: 0.1rem .5rem;
  margin-top: 2rem;
  border-radius: .25rem;
  position: sticky;
  top: 4rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  box-shadow: var(--simple-shadow);
`

export const ItemGrid = styled(ListItemWrapper)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto max-content max-content 1.5rem;
  gap: .5rem 1.25rem;
  align-items: center;
  justify-content: unset;
  padding: .5rem 1rem;

  * {
    margin: 0;
  }

  label:nth-child(3) {
    text-align: center;
    margin: 0;
  }
`

export const AmountWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1.5rem 3rem 1.5rem;
  gap: .5rem;
  align-items: center;

  span {
    line-height: 0;
    text-align: center;
    font-size: 2rem;
    padding-bottom: .25em;
    cursor: pointer;
  }
`

export const AmountInput = styled(Input)`
  padding: .2rem .5rem;
  border: unset;
  text-align: center;
`

export const TotalText = styled.strong`
  margin: .5rem;
  text-align: end;
  display: block;
`

export const OrderItemList = styled(ListItemWrapper)`
  cursor: pointer;
`

export const OrderUserGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: max-content auto;
  gap: .5rem 1rem;
`

export const OrderInfoGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: auto;
  grid-template-columns: max-content 6rem;
`

export const OrderPaymentGrid = styled(OrderUserGrid)`
  grid-template-columns: max-content 5rem;
`

export const OrderSummaryItem = styled(ItemGrid)`
  grid-template-columns: auto 10rem 5rem;
`

export const OrderTitleAmount = styled.div`
  display: flex;
  gap: .5rem;
`

export const OrderSummaryHeader = styled.div`
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  padding: 1rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`
