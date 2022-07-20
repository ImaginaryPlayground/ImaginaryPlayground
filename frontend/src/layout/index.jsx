import React, { useContext } from 'react';
import Header from './Header/';
import Footer from './Footer/';
import Drawer from './Drawer/';
import { CommonContext } from '../context/CommonContext';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import Wrapper from './styles';

const Layout = props => {
  const { drawerOpen } = useContext(CommonContext);
  const { wannaHide, children } = props;

  return (
    <Wrapper>
      <CssBaseline />
      <Drawer />
      {!wannaHide && <Header />}
      <Container
        open={drawerOpen}
        className={drawerOpen ? 'content' : 'content content-shift'}
        maxWidth="xl"
      >
        <div className="container">{children}</div>
      </Container>
      <Grid className="footer">{!wannaHide && <Footer />}</Grid>
    </Wrapper>
  );
};

export default Layout;
