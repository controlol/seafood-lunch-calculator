import styled from 'styled-components'

export const SimpleFormGridResponsive = styled.div`
  margin: 1em 0;
  display: grid;
  grid-template-columns: max-content auto;
  gap: .8rem 1.5rem;
  align-items: flex-start;

  * {
    margin: 0;
  }

  /* @media screen and (max-width: 1000px) { grid-template-columns: auto; }
  @media screen and (max-width: 800px) { grid-template-columns: max-content auto; } */
  @media screen and (max-width: 600px) { grid-template-columns: auto; }
`

export const SimpleFormGridResponsiveWithButton = styled(SimpleFormGridResponsive)`
  grid-template-columns: max-content auto max-content;

  /* @media screen and (max-width: 1000px) { grid-template-columns: auto; }
  @media screen and (max-width: 800px) { grid-template-columns: max-content auto max-content; } */
  @media screen and (max-width: 600px) { grid-template-columns: auto; }
`