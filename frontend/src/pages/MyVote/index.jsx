import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../layout/';
import VoteGridList from '../../components/Grid/VoteGridList/';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import { Grid, Avatar, Button, Badge } from '@material-ui/core';
import Wrapper from './styles';

const MyVote = () => {
  let history = useHistory();

  const [isVoteEditable, setIsVoteEditable] = useState(true);

  const { user, serverImgUrl } = useContext(CommonContext);

  const onSignDialogOpenHandler = () => {
    history.push('/Auth');
  };

  const onsetUserDetailDialogOpenHandler = () => {
    history.push('/Auth');
  };

  return (
    <Layout>
      <Wrapper>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
          className="my-vote"
        >
          <Grid item xs={4} sm={2}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Grid className="badge" variant="dot">
                  <Grid className="badge-icon"></Grid>
                  <Avatar
                    alt="Remy Sharp"
                    className="option-image-upload-avatar"
                    src={`${serverImgUrl}${user.user_img_url}`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} sm={2} className="btn-left">
            <h2>{user.user_id ? user.user_id : 'Guest'}</h2>
            {user.status === 'login' ? (
              <Button
                variant="contained"
                fullWidth={true}
                color="primary"
                onClick={onsetUserDetailDialogOpenHandler}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth={true}
                color="primary"
                onClick={onSignDialogOpenHandler}
              >
                Sign In
              </Button>
            )}
          </Grid>
          <Grid item xs={4} sm={2} className="btn-right">
            <h2>&nbsp;</h2>
            <Button
              variant="contained"
              fullWidth={true}
              color="primary"
              className="btn-full"
              onClick={() => {
                setIsVoteEditable(!isVoteEditable);
              }}
            >
              CHECK
            </Button>
          </Grid>
          <Grid item xs={8} />

          <Grid item xs={12}>
            <ViewContext.Provider value={{ isVoteEditable }}>
              <VoteGridList
                categoryData={[]}
                value={0}
                index={0}
                itemType={'my'}
              />
            </ViewContext.Provider>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default MyVote;
