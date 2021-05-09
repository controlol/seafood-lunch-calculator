import styled from 'styled-components'
import { Input } from '../../styled/Form'
import { ListItemWrapper } from '../../styled/List'

export const UserContainer = styled(ListItemWrapper)`
  justify-content: unset;
  flex-direction: column;
  border-radius: .25rem;
`

export const AddUserWrapper = styled.div`
  background: var(--background-gradient-medium);
  padding: 0.1rem .5rem;
  margin-top: 2rem;
  border-radius: .25rem;
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