import styled from 'styled-components'

export const LoginContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  display: flex;
  flex-wrap: wrap;
  border-radius: .3rem;
  box-shadow: 0 .3rem 1.5rem rgba(0,0,0,.3);
  background: linear-gradient(60deg, rgba(0,0,0,.25), rgba(0,0,0,.05) 50%);
  transform: translate(-50%, -50%);
  max-width: 1000px;
  width: max-content;
  padding: 1.5rem;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`

export const LoginDevider = styled.div`
  background-color: var(--off-white);
  width: 1px;
  height: 225px;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`

export const LoginForm = styled.form`
  max-width: 20rem;

  h1 {
    margin-bottom: 1rem;
  }
`