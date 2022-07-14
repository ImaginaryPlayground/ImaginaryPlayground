import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  Checkbox,
  Typography,
  Avatar,
  useMediaQuery,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Wrapper from './styles';
import { CommonContext } from '../../../context/CommonContext';
import HorizontalBar from './../HorizontalBar/';
import ReactPlayer from 'react-player';

const VoteViewOptionCheckBoxComponent = props => {
  const { index } = props;
  const { infoData } = useContext(CommonContext);

  const handleChange = () => {};
  return (
    <Wrapper>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Checkbox
            icon={<CheckCircleIcon className="ch-icon" />}
            size="medium"
            checkedIcon={<CheckCircleIcon className="ch-icon" />}
            checked={infoData.vote_data[index].is_selected}
            color="primary"
            onChange={handleChange}
            value="a"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const VoteViewOptionImageComponent = props => {
  const { serverImgUrl } = useContext(CommonContext);

  return (
    <Wrapper>
      {props.optionData.targetUploadType === 'image' && (
        <Avatar
          alt="Remy Sharp"
          variant="square"
          src={`${serverImgUrl}${props.optionData.uploadTargetPath}`}
          className="vote-view-option-image-component-avatar"
          imgProps={{
            className: 'img',
          }}
        />
      )}
      {props.optionData.targetUploadType === 'movie' && (
        <ReactPlayer url={props.optionData.uploadTargetPath} playing />
      )}
    </Wrapper>
  );
};

const VoteViewOptionImageGroupComponent = props => {
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          className="vote-view-option-image-group-component-grid-item"
        >
          <VoteViewOptionImageComponent {...props} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const VoteViewOptionSubscriptionGroupComponent = props => {
  const { index } = props;
  const { infoData } = useContext(CommonContext);
  const [optionTotalCount, setOptionTotalCount] = useState(0);
  const [optionCount, setOptionCount] = useState(0);
  const mobileFont = useMediaQuery('(max-width:600px)');
  let descTypography = mobileFont ? 'h6' : 'h4';

  useEffect(() => {
    if (infoData && infoData.optionData) {
      setOptionTotalCount(infoData.optionData[`total_count`]);
      setOptionCount(infoData.optionData[`option_${index}`]);
    }
  }, [infoData]);

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
        className="vote-view-option-subscription-group-component-grid"
      >
        <Grid item xs={12}>
          <Typography variant={descTypography} className="subtitle">
            {props.optionData.optionTitle}
          </Typography>
        </Grid>
        {infoData.is_voting && (
          <Grid
            item
            xs={10}
            className="vote-view-option-subscription-group-component-grid-item"
          >
            <HorizontalBar
              percentage={(optionCount / optionTotalCount) * 100}
            />
          </Grid>
        )}

        {infoData.is_voting && (
          <Grid
            item
            xs={2}
            className="vote-view-option-subscription-group-component-grid-item"
          >
            <Typography variant="h6" align="center" color="primary">
              {((optionCount / optionTotalCount) * 100).toFixed(2)}%
            </Typography>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
};

const VoteViewComponent = props => {
  const { index } = props;
  const { infoData, setInfoData } = useContext(CommonContext);

  const handleChange = () => {
    var temp_vote_data = infoData.vote_data.map((x, i) => {
      if (i === index) {
        x.is_selected = !infoData.vote_data[index].is_selected;
      }
      return x;
    });

    setInfoData({ ...infoData }, { vote_data: temp_vote_data });
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        onClick={handleChange}
        className="vote-view-component"
      >
        <Grid item xs={2} md={1}>
          <VoteViewOptionCheckBoxComponent {...props} />
        </Grid>
        <Grid item xs={10} md={11}>
          <VoteViewOptionImageGroupComponent {...props} />
        </Grid>
        <Grid item xs={2} md={1}>
          <div>&nbsp;</div>
        </Grid>
        <Grid item xs={10} md={11}>
          <VoteViewOptionSubscriptionGroupComponent {...props} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default function RadioButtonsGroup() {
  const { infoData } = useContext(CommonContext);

  return (
    <Grid style={{ paddingTop: -4 }}>
      {infoData.vote_data.map((x, index) => {
        console.log(x);
        return <VoteViewComponent key={index} optionData={x} index={index} />;
      })}
    </Grid>
  );
}
