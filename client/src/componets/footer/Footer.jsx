import React from 'react';
import { 
    Container,
    Wapper,
    Center,
    Span,CenterBG
} from './style';

const Footer = ({map,mapCenter}) => {
  return (
    <Container>
      {<Wapper>
        <Center>
            <CenterBG>Center</CenterBG>
            <Span>{mapCenter}</Span><br />
            <CenterBG>Map</CenterBG>
            <Span>{map}</Span>
        </Center>
      </Wapper>}
    </Container>
  )
}

export default Footer
