import styled, { keyframes } from 'styled-components'

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  align-items: stretch;
  color: black;
  border-bottom: 3px solid var(--primary-color);
  margin-bottom: 2em;
  position: sticky;
  top: 0;
  z-index: 1000;

  &:focus {
    background-color: unset !important;
  }
`

export const NavbarItem = styled.div`
  font-size: 1.5em;
  font-family: 'Noto Sans JP', sans-serif;
  text-align: center;
  flex: 1 1 15em;
  cursor: pointer;
  transition: transform .3s ease-in-out;
  display: flex;
  justify-content: stretch;
  
  &:hover {
    transform: translateY(-.1em);
  }
`

export const SubNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  justify-items: center;
  color: black;
  border-bottom: 5px solid var(--primary-color);
  margin-bottom: 2em;
  position: sticky;
  top: 0;

  &:focus {
    background-color: unset !important;
  }
`

export const SubNavbarItem = styled.div`
  font-size: 140%;
  font-family: 'Noto Sans JP', sans-serif;
  text-align: center;
  padding-top: 1vh;
  margin: 0 1vw;

  cursor: pointer;
  color: var(--primary-color);
`

///////

export const HeaderStyle = styled.div`
  border-bottom: 3px solid var(--primary-color);
  background-color: rgb(255, 255, 255);
  margin-bottom: 2em;
  height: 4em;

  user-select: none;
  text-align: center;
  z-index: 999;
  width: 100%;
  position: sticky;
  top: 0;
  transition: background-color .3s;

  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: 21.5em auto 3fr 2rem;
  }

  @media screen and (min-width: 1532px) {
    display: grid;
    grid-template-columns: calc(calc(calc(100vw - 1500px) / 2) + 21.5em) auto 3fr .4fr;
  }

  @media screen and (min-width: 1596px) {
    display: grid;
    grid-template-columns: 1fr auto calc(1500px - 2em) 1fr;
  }
`

export const NavStyle = styled.div`
  position: absolute;
  text-align: left;
  top: 100%;
  left: 0;
  background: rgba(0,0,0,.87);
  width: 100%;
  transform: scale(1, 0);
  transform-origin: top;
  transition: transform 400ms ease-in-out;

  @media screen and (min-width: 800px) {
    /* the following lines are not from my video, but add Edge support */
    position: relative;
    text-align: left;
    transition: none;
    transform: scale(1,1);
    background: none;
    top: initial;
    left: initial;
    /* end Edge support stuff */

    grid-column: 3 / 4;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

export const HeaderItems = styled.div`
  @media screen and (min-width: 800px) {
    display: flex;
    gap: min(3em, 4vw);
  }
`

export const HeaderTextBox = styled.div`
  position: relative;
  margin-bottom: 1em;
  margin-left: 1em;
  text-decoration: none;

  @media screen and (min-width: 800px) {
    margin-left: unset;
    margin-bottom: unset;
  }
`

export const HeaderText = styled.h2`
  font-size: 1.5em;
  font-family: 'Noto Sans JP', sans-serif;
  text-align: center;
  flex: 1 1 15em;
  cursor: pointer;
  transition:
    transform .3s ease-in-out,
    opacity 150ms ease-in-out;
  
  &:hover {
    transform: translateY(-.1em);
  }

  width: max-content;
  /* text-transform: uppercase; */
  opacity: 0;

  @media screen and (min-width: 800px) {
    opacity: 1;
    position: relative;
  }
`

export const HeaderAccountText = styled(HeaderText)`
  position: relative;
`

export const HeaderAccountName = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 0;
  width: max-content;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: .9rem;
  text-align: center;
  color: var(--primary-color);
  opacity: 0;
  cursor: pointer;
  transition: opacity 150ms ease-in-out;

  @media screen and (min-width: 800px) {
    opacity: 1;
  }
  @media screen and (max-width: 800px) {
    top: unset;
    bottom: .1rem;
    right: -2.5rem;
  }
`

export const NavLogo = styled.img`
  margin: .3em auto;
`

export const NavToggleInput = styled.input`
  display: block;
  background-color: var(--primary-color);
  height: .2em;
  width: 2em;
  border-radius: 1em;
  position: relative;
  appearance: none;
  outline: unset;
  transition: transform .4s ease-in-out, background-color .5s;

  &::after,
  &::before {
    display: block;
    background-color: var(--primary-color);
    height: .2em;
    width: 2em;
    border-radius: 1em;
    position: relative;
    content: '';
    position: absolute;
    transition: transform .4s ease-in-out;
  }

  &::after {
    transform: translateY(-.6em)
  }

  &::before {
    transform: translateY(.6em)
  }

  &:checked {
    transform: translateX(-2em);
    background: transparent;
  }

  &:checked::after {
    transform: rotateZ(45deg) translate(1.4em, -1.4em);
  }

  &:checked::before {
    transform: rotateZ(-45deg) translate(1.4em, 1.4em);
  }
`

export const NavToggleLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 1em;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (min-width: 800px) {
    display: none;
  }
`

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, .5rem);
  } 100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`

export const Submenu = styled.div`
  position: absolute;
  top: 2.6rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: .4rem;
  background-color: white;
  color: black;
  animation: ${fadeInUp} .2s;
  box-shadow: 0 0 10px rgba(0,0,0,.5);
  padding: .5rem 0;

  @media screen and (max-width: 1532px) {
    left: 0;
  }

  @media screen and (max-width: 800px) {
    left: calc(50% - .5rem);
    width: 100vw;
    border-radius: unset;
    font-size: 1.25rem;
  }
`

export const SubmenuItem = styled.p`
  padding: .25rem .75rem;
  min-width: 12rem;
  cursor: pointer;
  font-weight: 600;
  transition: color .3s;

  &:hover {
    color: var(--dark-text);
    background: linear-gradient(rgba(0,0,0,.15) 2%, transparent 15%, transparent 85%, rgba(0,0,0,.15) 98%);
  }
`