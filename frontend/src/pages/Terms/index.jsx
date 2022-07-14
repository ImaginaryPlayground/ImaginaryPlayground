import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from './../../layout/';
import Wrapper from './styles';
const Terms = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid container direction="column">
          <Grid item className="title">
            Privacy Policy
          </Grid>
          <Grid item className="text">
            <Grid>
              <h2>1. Acceptance of Terms of Use Agreement.</h2>
              <p>
                By creating an SSAFY account, whether through a mobile device,
                mobile application or computer (collectively, the “Service”) you
                agree to be bound by (i) these Terms of Use, (ii) our Privacy
                Policy and Safety Tips, each of which is incorporated by
                reference into this Agreement, and (iii) any terms disclosed and
                agreed to by you if you purchase additional features, products
                or services we offer on the Service (collectively, this
                “Agreement”). If you do not accept and agree to be bound by all
                of the terms of this Agreement, please do not use the Service.
              </p>
              <p>
                We may make changes to this Agreement and to the Service from
                time to time. We may do this for a variety of reasons including
                to reflect changes in or requirements of the law, new features,
                or changes in business practices. The most recent version of
                this Agreement will be posted on the Service under Settings, and
                you should regularly check for the most recent version. The most
                recent version is the version that applies. If the changes
                include material changes that affect your rights or obligations,
                we will notify you in advance of the changes by reasonable
                means, which could include notification through the Service or
                via email. If you continue to use the Service after the changes
                become effective, then you agree to the revised Agreement.
              </p>
            </Grid>
            <Grid>
              <h2>2. Your Account.</h2>
              <p>
                In order to use SSAFY, you may sign in using your Facebook,
                Instagram and Google (“Social Media”) login. If you do so, you
                authorize us to access and use certain Social Media account
                information, including but not limited to your public Social
                Media profile and information about Social Media friends you
                share in common with other SSAFY users who have given Social
                Media or SSAFY permission to use their personal information. For
                more information regarding the information we collect from you
                and how we use it, please consult our Privacy Policy.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your
                login credentials you use to sign up for SSAFY, and you are
                solely responsible for all activities that occur under those
                credentials. If you think someone has gained access to your
                account, please immediately contact us.
              </p>
            </Grid>
            <Grid>
              <h2>3. Third Party Services.</h2>
              <p>
                The Service may contain advertisements and promotions offered by
                third parties and links to other web sites or resources. SSAFY
                is not responsible for the availability (or lack of
                availability) of such external websites or resources. If you
                choose to interact with the third parties made available through
                our Service, such party’s terms will govern their relationship
                with you. SSAFY is not responsible or liable for such third
                parties’ terms or actions.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default Terms;
