import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import { Grid, Typography, Avatar, Badge } from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import MessageIcon from '@material-ui/icons/Message';
import CheckIcon from '@material-ui/icons/Check';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { withStyles } from '@material-ui/core/styles';
import Wrapper from './styles';

import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';

import voteDetailData from './dump.json';

export default function VoteGridItem(props) {
  const { itemData, itemType } = props;
  const { isVoteEditable } = useContext(ViewContext);

  // `${serverUrl}/voting/my/vote/${itemData.vote_no}`,

  const [sw, setSw] = useState(itemData.vote_state === 'Y' ? true : false);

  let history = useHistory();

  const {
    user,
    serverUrl,
    serverImgUrl,
    setInfoData,
    setInfoDetailDialogOpen,
    setUser,
  } = useContext(CommonContext);

  const infoOpenHandler = async event => {
    let respone = [];

    setInfoData(voteDetailData);
    setInfoDetailDialogOpen(true);
  };

  const handleVoteState = async () => {
    setSw(!sw);
    const voteState = sw ? 'N' : 'Y';

    alert('Not implemented yet.');
  };

  const displayEndTime = dt => {
    console.log('VoteGridItem -> dt', dt);
    return '14:00:00';
  };

  return (
    <Wrapper className="root">
      <Grid container className="info-open-handler-grid">
        <Grid item xs={12}>
          {itemType === 'my' ? (
            <Grid className="img-box">
              <Avatar
                onClick={infoOpenHandler}
                variant="square"
                src={`${serverImgUrl}${itemData.vote_img_url}`}
                className={'large'}
                imgProps={{
                  className: sw ? 'img' : 'img deactivated',
                }}
              />
              <span className="date on">{displayEndTime(itemData.end_dt)}</span>
              {itemType === 'my' && isVoteEditable && (
                <button
                  type="button"
                  onClick={handleVoteState}
                  className={sw ? 'btn-check on' : 'btn-check'}
                >
                  <CheckIcon className="check" />
                </button>
              )}
            </Grid>
          ) : (
            <Grid className="img-box">
              <Avatar
                variant="square"
                src={`${serverImgUrl}${itemData.vote_img_url}`}
                className={'large'}
                onClick={infoOpenHandler}
                imgProps={{
                  className: sw ? 'img' : 'img deactivated',
                }}
              />
              <span className="date on">{displayEndTime(itemData.end_dt)}</span>
              {itemType === 'my' && isVoteEditable && (
                <button
                  type="button"
                  onClick={handleVoteState}
                  className={sw ? 'btn-check on' : 'btn-check'}
                >
                  <CheckIcon className="check" />
                </button>
              )}
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} container>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={
              sw
                ? 'info-open-handler-grid-item-bottom'
                : ' info-open-handler-grid-item-bottom deactivated'
            }
          >
            <Grid item xs={7}>
              <Typography
                className="info-open-handler-grid-item-typography1"
                variant="subtitle1"
              >
                {itemData.vote_title}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                className="info-open-handler-grid-item-grid"
              >
                <HowToVoteIcon className="info-open-handler-grid-item-fa-icon" />
                <Typography
                  variant="subtitle1"
                  component="span"
                  className="info-open-handler-grid-item-typography2"
                >
                  {itemData.voting_count}
                </Typography>
                <MessageIcon className="info-open-handler-grid-item-vi-icon" />
                <Typography
                  variant="subtitle1"
                  component="span"
                  className="info-open-handler-grid-item-typography3"
                >
                  {itemData.feed_count}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
