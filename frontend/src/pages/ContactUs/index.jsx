import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from './../../layout/';
import Wrapper from './styles';
const ContactUs = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid className="subject">Contact Us</Grid>
        <Grid container className="info">
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_1.png" alt="" />
            </Grid>
            <Grid className="title">CALL</Grid>
            <Grid className="text">02-6622-3300</Grid>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_2.png" alt="" />
            </Grid>
            <Grid className="title">E-MAIL</Grid>
            <Grid className="text">help@samsungsupport.com</Grid>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_3.png" alt="" />
            </Grid>
            <Grid className="title">FAX</Grid>
            <Grid className="text">02-6622-3300</Grid>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_4.png" alt="" />
            </Grid>
            <Grid className="title">ADDRESS</Grid>
            <Grid className="text">
              212 Tehran-Ro, Gangnam-Gu, Seoul
              <br />
              (Yeoksam-Dong 718-5 Address)
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default ContactUs;
