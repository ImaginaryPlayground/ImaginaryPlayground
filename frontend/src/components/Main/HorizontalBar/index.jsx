import React from 'react';
import { Grid } from '@material-ui/core';
import Wrapper from './styles';
const HorizontalBar = (props) => {
  return (
    <Wrapper container style={{ backgroundColor: '#F5F5F5' }}>
      <Grid
        item
        style={{
          width: `${props.percentage}%`,
        }}
      ></Grid>
    </Wrapper>
  );
};

export default HorizontalBar;
