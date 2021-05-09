import styled from 'styled-components'
import { ListItemWrapper } from '../../styled/List'

export const UserContainer = styled(ListItemWrapper)`
  justify-content: unset;
  flex-direction: column;
`

export const ItemGrid = styled(ListItemWrapper)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto max-content max-content 1.5rem;
  gap: .25rem 1.25rem;
  align-items: center;
  justify-content: unset;
  padding: .25rem 1rem;

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