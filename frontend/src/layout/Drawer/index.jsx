import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { CommonContext } from '../../context/CommonContext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  Button,
  Grid,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Wrapper from './styles';

const DrawerHeaderGroup = () => {
  let history = useHistory();
  const { setDrawerOpen, user, setUser } = useContext(CommonContext);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onClickRedirectPathHandler = name => () => {
    setDrawerOpen(false);
    history.push(name);
  };

  const handleSignInDialogOpen = () => {
    setUser({
      user_no: 0,
      user_id: '',
      user_nm: '',
      user_pwd: '',
      user_img_url: '',
      status: '',
      web_site: '',
      token: '',
    });

    history.push('/Auth');
  };

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        {user.status ? (
          <Button
            variant="contained"
            color="primary"
            className="up-cancel-fab"
            onClick={onClickRedirectPathHandler('/CreateVote')}
          >
            Create a Vote
          </Button>
        ) : (
          <Fragment>
            <Button
              variant="outlined"
              className="up-cancel-fab"
              onClick={handleSignInDialogOpen}
            >
              Sign In
            </Button>
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
};

const DrawerListGroup = () => {
  let history = useHistory();
  const {
    user,
    setUser,
    setUserDetailDialogOpen,
    setUserDialogIndex,
    setDrawerOpen,
  } = useContext(CommonContext);

  const onClickEditProfileOpenHandler = () => {
    setDrawerOpen(false);
    setUserDialogIndex(0);
    setUserDetailDialogOpen(true);
  };

  const onClickChangePasswordOpenHandler = () => {
    setDrawerOpen(false);
    setUserDialogIndex(1);
    setUserDetailDialogOpen(true);
  };

  const onClickSignOutOpenHandler = () => {
    setDrawerOpen(false);
    setUser({
      user_no: 0,
      user_id: '',
      user_nm: '',
      user_pwd: '',
      user_img_url: '',
      status: '',
      web_site: '',
      token: '',
    });

    alert('You are logged out.');

    history.push('/');
  };

  const onClickRedirectPathHandler = name => () => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
    history.push(name);
  };

  return (
    <>
      <List className="drawer-list-group-list">
        <ListItem
          button
          key={'Vote'}
          onClick={onClickRedirectPathHandler('/MainVote')}
        >
          <ListItemText primary={'Vote'} disableTypography />
        </ListItem>
        {user.status && (
          <Fragment>
            <ListItem
              button
              key={'My Vote'}
              onClick={onClickRedirectPathHandler('/MyVote')}
            >
              <ListItemText primary={'My Vote'} disableTypography />
            </ListItem>
            <ListItem button key={'Me'} className="bg-unset">
              <Accordion className="panel">
                <AccordionSummary
                  className="panel-summary"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Avatar
                    alt="profile picture"
                    src={`https://picsum.photos/id/82/200/300.webp`}
                    className="avatar"
                  />
                  <ListItemText
                    primary={'Me'}
                    disableTypography
                    className="list-item"
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <List className="expansion-panel">
                    <ListItem
                      button
                      key={'Edit Profile '}
                      onClick={onClickEditProfileOpenHandler}
                    >
                      <ListItemText
                        primary={'Edit Profile'}
                        disableTypography
                      />
                    </ListItem>
                    <ListItem
                      button
                      key={'Change Password'}
                      onClick={onClickChangePasswordOpenHandler}
                    >
                      <ListItemText
                        primary={'Change Password'}
                        disableTypography
                      />
                    </ListItem>
                    <ListItem button key={'Sign Out'}>
                      <ListItemText
                        primary={'Sign Out'}
                        disableTypography
                        className="list-item"
                        onClick={onClickSignOutOpenHandler}
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          </Fragment>
        )}
        <ListItem
          button
          key={'AboutMe'}
          onClick={onClickRedirectPathHandler('/AboutMe')}
        >
          <ListItemText primary={'About Me'} disableTypography />
        </ListItem>
        <ListItem
          button
          key={'ContactUs'}
          onClick={onClickRedirectPathHandler('/ContactUs')}
        >
          <ListItemText primary={'Contact Us'} disableTypography />
        </ListItem>
        <ListItem
          button
          key={'Terms'}
          onClick={onClickRedirectPathHandler('/Terms')}
        >
          <ListItemText primary={'Terms'} disableTypography />
        </ListItem>
      </List>
    </>
  );
};

const DrawerFooterGroup = () => {
  const { user } = useContext(CommonContext);

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={6}>
        {!user.status && <Fragment></Fragment>}
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default function PersistentDrawerLeft(props) {
  const { drawerOpen } = useContext(CommonContext);

  return (
    <Wrapper>
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div className="drawer-header">
          <DrawerHeaderGroup />
        </div>
        <Divider />
        <DrawerListGroup />
        <div className="drawer-header">
          <DrawerFooterGroup />
        </div>
      </Drawer>
    </Wrapper>
  );
}
