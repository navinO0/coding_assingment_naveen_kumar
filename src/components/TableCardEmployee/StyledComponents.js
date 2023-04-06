import styled from 'styled-components/macro'

export const ParaElement = styled.p`
  width: 190px;
  list-style: none;
  padding-left: 0px;
  border-color: ${props => (props.lessHours ? ' #FF0000' : '#00ff00')};
  border-style: solid;
  border-width: 3px;
  padding: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-bottom: 1px;
`

export const sampleHeadingElement = styled.h1`
  color: 'red';
`
