import styled from 'styled-components'

export const ProductsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  background: var(--background-gradient-light);
  padding: 2rem;
  border-radius: .2rem;
`

export const ProductContainer = styled.div`
  background-color: white;
  box-shadow: var(--simple-shadow);
  padding: 1rem;
`

export const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: .25rem;
  box-shadow: var(--simple-shadow);
  padding: .5rem;
  background-color: white;
`

export const ProductTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const NameText = styled.h2`
  font-weight: 500;
  font-size: 1.25rem;
`

export const TakeawayText = styled.h3`
  font-weight: 300;
  font-size: 1.1rem;
  color: rgba(0,0,0,.6);
`

export const PriceText = styled.p`
  color: rgba(0,0,0,.5);
`