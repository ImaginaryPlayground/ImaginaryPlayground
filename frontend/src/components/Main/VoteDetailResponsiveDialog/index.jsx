import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { HowToVote } from '@material-ui/icons/';
import ClearIcon from '@material-ui/icons/Clear';
import { Wrapper, Close, Date } from './styles';
import Axios from 'axios';
import Feed from '../../Feed/index';
import CheckBoxButtonsGroup from './../CheckBoxButtonsGroup';
import { CommonContext } from '../../../context/CommonContext';
import { useHistory } from 'react-router-dom';

import optionData from './dump.json';

const ViewVoteSubjectComponent = () => {
  const { infoData } = useContext(CommonContext);
  const mobileFont = useMediaQuery('(max-width:600px)');
  let descTypography = mobileFont ? 'body1' : 'h5';
  let titleTypography = mobileFont ? 'h5' : 'h2';

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <Grid item xs={12} className="view-vote-subject-component-grid-item1">
          <Typography
            variant={titleTypography}
            className="view-vote-subject-component-grid-item-typography1"
          >
            {infoData.vote_title}
          </Typography>
        </Grid>

        <Grid item xs={12} className="view-vote-subject-component-grid-item2">
          <Typography
            variant={descTypography}
            className="view-vote-subject-component-grid-item-typography2"
          >
            {infoData.vote_desc}
          </Typography>
        </Grid>
        <Grid item xs={12} className="view-vote-subject-component-grid-item3">
          <CheckBoxButtonsGroup />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const DialogActionsComponet = () => {
  const {
    user,
    serverUrl,
    infoData,
    setInfoData,
    setInfoDetailDialogOpen,
    setSignDialogOpen,
    setUser,
  } = useContext(CommonContext);
  let history = useHistory();

  const votingHandler = async () => {
    var vhistory_sum = infoData.vote_data
      .map((x, index) => {
        return x.is_selected ? x.is_selected * Math.pow(2, index) : 0;
      })
      .reduce((a, b) => a + b, 0);

    var body = {
      vote_no: infoData.vote_no,
      user_id: user.user_id,
      vhistory_sum: vhistory_sum,
    };

    setInfoData({
      ...infoData,
      is_voting: true,
      optionData: optionData,
    });
    setInfoDetailDialogOpen(true);
  };

  return (
    <Wrapper>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className="dialog-actions-componet-grid-item">
          {!infoData.is_voting && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<HowToVote style={{ fontSize: 26 }} />}
              onClick={votingHandler}
              className="dialog-actions-componet-grid-item-button"
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const ViewVoteComponent = () => {
  const { infoData } = useContext(CommonContext);

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <ViewVoteSubjectComponent />
        </Grid>
        <Grid item xs={12}>
          <DialogActionsComponet />
        </Grid>
        <Grid item xs={12} className="feed-container">
          {infoData.is_voting && <Feed />}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const ResponsiveDialogSign = () => {
  const { infoDialogOpen, setInfoDetailDialogOpen } = useContext(CommonContext);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleClose = () => {
    setInfoDetailDialogOpen(false);
  };

  const displayEndTime = dt => {
    console.log('VoteGridItem -> dt', dt);
    return '14:00:00';
  };

  return (
    <Wrapper>
      <Dialog
        fullScreen={fullScreen}
        open={infoDialogOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: {
            height: '90vh',
            padding: '10px',
            width: '1280px',
            maxWidth: 'none',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'inherit',
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0.85)',
          },
        }}
      >
        <Close className="btn-close">
          <DialogActions style={{ padding: 0 }}>
            <Date>
              <span className="date on">{displayEndTime()}</span>
            </Date>
            <Grid className="go-back-btn" onClick={handleClose}>
              <ClearIcon
                size="medium"
                //!!
                style={{ color: '#fff', cursor: 'pointer' }}
              />
            </Grid>
          </DialogActions>
        </Close>
        <ViewVoteComponent />
      </Dialog>
    </Wrapper>
  );
};

export default ResponsiveDialogSign;
