import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import {
  Grid,
  Typography,
  TextField,
  Avatar,
  Button,
  SvgIcon,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import Wrapper from './styles';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import feedComments from './dump.json';

const FeedStatusButton = props => {
  const [flag, setflag] = useState(false);
  const { serverUrl, user, setUser } = useContext(CommonContext);
  const { feed_no, count, feed_type, setCount, is_self } = props;
  let history = useHistory();

  const onChangeHandler = async () => {
    if (is_self && flag) {
      alert('You have already voted.');
      return;
    }

    let nowFlag = !flag;
    let body = {
      user_id: user.user_id,
    };

    let respone = [];

    alert('Not implemented yet.');

    setflag(nowFlag);
    setCount(nowFlag === true ? count + 1 : count - 1);
  };

  return (
    <IconButton
      className="button"
      onClick={onChangeHandler}
      // fullWidth={true}
      size="small"
      style={{ borderRadius: 0, marginRight: 16 }}
    >
      <SvgIcon
        fontSize="inherit"
        style={{
          marginRight: 5,
          color: is_self || flag ? 'blue' : '',
        }}
      >
        {feed_type === 'good' ? (
          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
        ) : (
          <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
        )}
      </SvgIcon>
      <div>&nbsp;</div>
      <Typography
        style={{ fontSize: 14, color: '#606060', marginRight: 16 }}
      >{` ${count} `}</Typography>
    </IconButton>
  );
};

const MoreIconButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const options = ['Edit', 'Delete'];
  const ITEM_HEIGHT = 48;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = option => e => {
    setAnchorEl(null);

    if (option === '') {
    }

    alert('Not implemented yet.');
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 2,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={handleClose(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const CommentCard = props => {
  const { serverUrl, serverImgUrl, user, setUser } = useContext(CommonContext);

  const { setDataCount } = useContext(ViewContext);

  const {
    feed_no,
    user_nm,
    user_id,
    user_img_url,
    feed_comment,
    feed_good_cnt,
    last_min,
    feed_bad_cnt,
    is_self_good,
    is_self_bad,
  } = props.comments;

  const [goodCount, setGoodCount] = useState(feed_good_cnt);
  const [badCount, setBadCount] = useState(feed_bad_cnt);
  let history = useHistory();

  useEffect(() => {
    setGoodCount(feed_good_cnt);
    setBadCount(feed_bad_cnt);
  }, [feed_good_cnt, feed_bad_cnt]);

  const fn_dateTimeToFormatted = minsAgo => {
    let formatted = 0;

    if (minsAgo < 60) {
      // 1시간 이내
      formatted = minsAgo + '   minute ago';
    } else if (minsAgo < 60 * 24) {
      // 하루 이내
      formatted = Math.floor(minsAgo / 60) + '   hours ago';
    } else if (minsAgo < 60 * 24 * 7) {
      // 한 주 이내
      formatted = Math.floor(minsAgo / 60 / 24) + '   day ago';
    } else if (minsAgo < 60 * 24 * 30) {
      // 한 달 이내
      formatted = Math.floor(minsAgo / 60 / 24 / 7) + '   week ago';
    } else if (minsAgo < 60 * 24 * 365) {
      // 1년 이내
      formatted = Math.floor(minsAgo / 60 / 24 / 30) + '   month ago';
    } else {
      //1년 이상
      formatted = Math.floor(minsAgo / 60 / 24 / 365) + '   year ago';
    }

    return formatted;
  };

  const onDeleteButtonHandler = async () => {
    alert('Not implemented yet.');
    setDataCount(x => x - 1);
  };

  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={2} sm={1}>
          <Avatar
            alt="Remy Sharp"
            variant="circle"
            src={`${serverImgUrl}${user_img_url}`}
            className="big-avatar"
          />
        </Grid>
        <Grid item xs={10} sm={11}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{ marginLeft: 8 }}
          >
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container>
                    <Typography
                      variant="body2"
                      style={{ fontWeight: 500, margin: '0 16px 8px 0' }}
                    >{`${user_nm ? user_nm : 'guest'}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{
                        fontWeight: 500,
                        margin: '0 16px 8px 0',
                        color: '#606060',
                      }}
                    >
                      {fn_dateTimeToFormatted(last_min)}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <MoreIconButton
                    onDeleteButtonHandler={onDeleteButtonHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" className="comment-typography">
                    {feed_comment}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              style={{ marginLeft: 14 }}
            >
              <Grid item>
                <FeedStatusButton
                  count={goodCount}
                  feed_type="good"
                  feed_no={feed_no}
                  is_self={is_self_good}
                  setCount={setGoodCount}
                />
              </Grid>
              <Grid item>
                <FeedStatusButton
                  count={badCount}
                  feed_type="bad"
                  feed_no={feed_no}
                  is_self={is_self_bad}
                  setCount={setBadCount}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const FeedComments = () => {
  const [data, setData] = useState([]);

  const { dataCount, setDataCount, sortType } = useContext(ViewContext);
  const { serverUrl, infoData, user, setUser } = useContext(CommonContext);
  let history = useHistory();

  const fetchMoreData = () => {
    getFeedInfo();
  };

  let getFeedInfo = async () => {
    setData(feedComments.comments);
    setDataCount(feedComments.total_count);
  };

  useEffect(() => {
    getFeedInfo();
  }, [dataCount, sortType]);

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={4}
    >
      <Grid item xs={12}>
        <InfiniteScroll
          dataLength={dataCount}
          next={fetchMoreData}
          hasMore={true}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p style={{ textAlign: 'left' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.map((x, index) => {
            return <CommentCard key={index} comments={x} index={index} />;
          })}
        </InfiniteScroll>
      </Grid>
    </Grid>
  );
};

const CommnetInfoComponet = () => {
  const { dataCount, sortType, setSortType } = useContext(ViewContext);

  const onClickHandler = () => {
    let sortTypeToChange = 'asc';

    if (sortType === 'asc') {
      sortTypeToChange = 'desc';
    } else if (sortType === 'desc') {
      sortTypeToChange = 'asc';
    }

    setSortType(sortTypeToChange);
  };

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item>
        <Typography
          style={{ fontWeight: 500, marginRight: 20 }}
        >{`${dataCount} comment`}</Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={onClickHandler} style={{ borderRadius: 0 }}>
          {sortType === 'asc' && <FormatAlignRightIcon fontSize="small" />}
          {sortType === 'desc' && <FormatAlignLeftIcon fontSize="small" />}
          <div>&nbsp;</div>
          <Typography>{`SORT BY`}</Typography>
        </IconButton>
      </Grid>
    </Grid>
  );
};

const CommnetWritingComponet = () => {
  const {
    setDataCount,
    setSortType,
    setSignOpen,
    comment,
    setComment,
  } = useContext(ViewContext);
  const { user, serverUrl, serverImgUrl, infoData, setUser } = useContext(
    CommonContext,
  );
  let history = useHistory();

  const CreateCommentHandler = async () => {
    if (user.email === '') {
      alert('Please log in.');
      setSignOpen(true);
      return;
    }

    let body = {
      user_id: user.user_id ? user.user_id : '',
      comment: comment,
    };

    alert('Not implemented yet.');
    setComment('');
    setSortType('desc');
  };

  const onChangeHandler = e => {
    setComment(e.target.value);
  };

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={2} sm={1}>
            <Avatar
              alt="Remy Sharp"
              src={`${serverImgUrl}${user.user_img_url}`}
              className="big-avatar"
            />
          </Grid>
          <Grid item xs={10} sm={11}>
            <TextField
              id="outlined-multiline-static"
              placeholder="Add a public comment..."
              multiline
              rows="2"
              // defaultValue={comment}
              className="text-field"
              fullWidth={true}
              margin="normal"
              variant="outlined"
              onChange={onChangeHandler}
              value={comment}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Button
              size="small"
              variant={'contained'}
              onClick={CreateCommentHandler}
              fullWidth={true}
              color="primary"
              className="post-button"
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Feed = () => {
  const [dataCount, setDataCount] = useState(0);
  const [sortType, setSortType] = useState('desc');
  const [comment, setComment] = useState('');

  return (
    <ViewContext.Provider
      value={{
        dataCount,
        setDataCount,
        sortType,
        setSortType,
        comment,
        setComment,
      }}
    >
      <Wrapper>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <CommnetInfoComponet />
          </Grid>
          <Grid item xs={12}>
            <CommnetWritingComponet />
          </Grid>
          <Grid item xs={12}>
            <FeedComments />
          </Grid>
        </Grid>
      </Wrapper>
    </ViewContext.Provider>
  );
};

export default Feed;
