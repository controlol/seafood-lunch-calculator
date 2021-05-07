import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  padding: .6em 1em;
  margin: .5em 0;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--primary-color);
  background-color: var(--background-color);
  color: var(--form-text);
  transition: border .3s ease-in-out;
  font-size: .9rem;

  &:focus {
    outline: none;
    background-color: var(--focus-input);
  }
`

export const SmallInput = styled(Input)`
  max-width: 60%;
`

export const HidePassword = styled(Input)`
  transition: background-color .2s, outline .2s;
  user-select: none;
`

export const NoStyleInput = styled(Input)`
  border: unset;
  padding: 0.5em;
  margin: 0;
  background-color: unset;
  width: 100%;
  color: var(--form-text);
  transition: background-color .3s;
  background: linear-gradient(transparent, rgba(255,255,255,0.03));

  &:hover {
    background: linear-gradient(transparent, rgba(255,255,255,0.05));
  }
`

export const Select = styled.select`
  width: 100%;
  padding: .5em 1em;
  margin: .5em 0;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--primary-color);
  background-color: var(--background-color);
  color: var(--form-text);
  transition: border .3s ease-in-out;

  &:focus {
    outline: none;
    background-color: var(--focus-input);
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  min-height: 6em;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
  border: 2px solid var(--primary-color);
  background-color: var(--background-color);
  color: var(--form-text);
  resize: vertical;
  transition: background-color .3s;

  &:focus {
    outline: none;
    background-color: var(--focus-input);
  }
`

export const Alink = styled.a`
  color: var(--form-text);
  text-decoration: none;
  transition: background-color .4s;

  &:focus {
    outline: none;
    background-color: #282828;
  }
`

export const Label = styled.label`
  margin-right: .7vw;
`

// export const Button = styled.button`
//   color: white;
//   padding: 1vh 2vh;
//   text-align: center;
//   text-decoration: none;
//   display: block;
//   font-size: 16px;
//   transition-duration: 0.4s;
//   cursor: pointer;
//   background-color: #232323; 
//   border: 2px solid var(--primary-color);
//   border-radius: 4px;
//   margin: 1rem auto;
//   transform: scale(0.94);
//   transition: 
//     transform .2s ease-in-out,
//     background-color .2s linear;

//   &:hover {
//     background-color: var(--primary-color);
//     transform: scale(1);
//   }

//   &:focus {
//     outline: none;
//     background-color: #282828;
//   }
// `

export const Button = styled.button`
  padding: .4em .8em;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 1rem;
  cursor: pointer;
  background-color: var(--background-color);
  border: 2px solid var(--primary-color);
  border-radius: .2em;
  margin: .5rem auto .75rem auto;
  box-shadow: .3em .3em var(--primary-color);
  transition:
    background-color .2s linear,
    box-shadow .2s ease-in-out; 

  &:focus {
    background-color: var(--primary-color);
    box-shadow: .3em .3em var(--primary-color);
  }

  &:hover {
    background-color: var(--primary-color);
    box-shadow: 0 0 var(--primary-color);
  }

  @media screen and (max-width: 800px) {
    font-size: .9rem;
    padding: .4em .8em;
  }
`

export const SmallButton = styled(Button)`
  margin: 0 .25em .25em 0;
  padding: .25em .5em;
  border: 1px solid var(--primary-color);
  box-shadow: .15em .15em var(--primary-color);
  width: max-content;

  &:focus {
    background-color: var(--primary-color);
    box-shadow: .15em .15em var(--primary-color);
  }
`

export const ExtraSmallButton = styled(SmallButton)`
  padding: .2em .4em;
  margin: 0;
  background-color: rgba(255,255,255,.05);
  border: unset;
  box-shadow: unset;
`

export const SecondaryButton = styled(Button)`
  border: 2px solid var(--secondary-color);
  box-shadow: .3em .3em var(--secondary-color);

  &:focus {
    background-color: var(--secondary-color);
    box-shadow: .3em .3em var(--secondary-color);
  }

  &:hover {
    background-color: var(--secondary-color);
    box-shadow: 0 0 var(--secondary-color);
  }
`

export const LeftButton = styled(Button)`
  margin: 1rem 0;
`

export const RightButton = styled(Button)`
  margin: 1rem 0 1rem auto;
`

export const WarningButton = styled(Button)`
  background-color: black;
  border-color: red;
  box-shadow: .3em .3em red;

  &:focus {
    background-color: red;
    box-shadow: .3em .3em red;
  }

  &:hover {
    background-color: red;
    box-shadow: 0 0 red;
  }
`