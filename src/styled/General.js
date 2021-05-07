import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  background: var(--background-gradient-light);
  padding: 2rem;
  border-radius: .2rem;

  @media only screen and (max-width: 600px) {
    padding: unset;
  }
`

export const LightBox = styled.div`
  margin: 1em 0.4em;
  background: linear-gradient(60deg,rgba(75,80,85,.5),rgba(125,123,120,.5));
  padding: 1.5em;
  border-radius: .3rem;
  box-shadow: 0 .1em .3em rgba(0,0,0,.4);
  
  @media screen and (max-width: 800px) {
    margin: 1em 0;
    padding: .75em 1em;
  }
`

export const InfoBox = styled.div`
  margin: 0.4em;
  color: rgb(167 215 230);
  background-color: rgba(94,144,191,.15);
  padding: .7em 1.2em;
  border-radius: 1em;
  border: 1px solid rgb(94 144 191);
`

export const ErrorBox = styled(InfoBox)`
  color: rgb(132 5 5);
  background-color: rgba(191,94,94,.15);
  border: 1px solid rgb(173 54 54);
`

export const Header = styled.h1`
  padding: .4em .6em;
  margin: 0;
  font-weight: 300;
  color: var(--primary-color);
  font-size: 2rem;
  border-bottom: 2px solid var(--primary-color);
  align-items: center;
  margin-bottom: 1vh;
`

export const SmallHeader = styled.h2`
  padding: .4em .6em;
  margin: 0;
  font-weight: 300;
  color: var(--secondary-color);
  font-size: 1.5rem;
  border-bottom: 1px solid var(--secondary-color);
  align-items: center;
  margin-bottom: 1vh;
`