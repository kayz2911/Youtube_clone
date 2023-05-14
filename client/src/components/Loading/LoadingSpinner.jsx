import React from 'react';
import ReactLoading from 'react-loading';
import {Container} from './LoadingSpinnerStyled';

const SpinnerOverlay = () => {
  return (
    <Container>
      <ReactLoading type={'spinningBubbles'} color={'#ffffff'} height={100} width={100} />
    </Container>
  );
}

export default SpinnerOverlay;
