import styled from 'styled-components'

export const ListContainer = styled.div`
  background-color: white;
  /* box-shadow: var(--simple-shadow); */
  padding: 1rem;

  @media only screen and (max-width: 600px) {
    padding: 1rem 0;
  }
`

export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: .25rem;
  box-shadow: var(--simple-shadow);
  padding: .5rem;
  background-color: white;

`

export const ListItemTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const TitleText = styled.h2`
  font-weight: 500;
  font-size: 1.25rem;
`

export const SubscriptText = styled.h3`
  font-weight: 300;
  font-size: 1.1rem;
  color: rgba(0,0,0,.6);
`

export const RightText = styled.p`
  color: rgba(0,0,0,.5);
`