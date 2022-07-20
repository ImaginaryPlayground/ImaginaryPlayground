import React, { useContext } from 'react';

import Grid from '@material-ui/core/Grid';

import { useHistory } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';

import Axios from 'axios';

import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';

import Wrapper from './styles';

const DialogActionsComponet = () => {
  const { serverUrl, user, setSignDialogOpen, setUser, setEndDt } = useContext(
    CommonContext,
  );

  let history = useHistory();

  const {
    data,
    title,
    thumbnailImageData,
    isMultipleChoice,
    isPowerVoteChoice,
    description,
    readyToUpload,
    category,
    endDt,
  } = useContext(ViewContext);

  const createVoteHandler = async () => {
    if (user.user_id === '') {
      alert('Pleae sign in to upload.');
      setSignDialogOpen(true);
      return;
    }

    if (title === '') {
      alert(`Please enter your vote title.`);
      return;
    }
    if (category === 0) {
      alert(`Please select your vote category.`);
      return;
    }

    if (thumbnailImageData.img === '') {
      alert(`Please register thumbnail image to upload your vote.`);
      return;
    }
    if (data[0].optionTitle === '' || data[1].optionTitle === '') {
      alert(`Option1 and option2 are mandatory.`);
      return;
    }

    const formData = new FormData();

    formData.append('files', thumbnailImageData.file);

    for (const optionData of data) {
      if (optionData.targetUploadType === 'image') {
        formData.append('files', optionData.uploadTarget);
      }
    }

    var optionData = {
      title: title,
      description: description,
      data: data.map(x => {
        return {
          optionTitle: x.optionTitle,
          targetUploadType: x.targetUploadType,
          uploadTargetPath:
            x.targetUploadType !== 'image'
              ? x.uploadTarget
              : x.uploadTarget.path,
        };
      }),
      isMultipleChoice,
      category,
      isPowerVoteChoice,
      thumbnailImage: thumbnailImageData.file.path,
      end_dt: endDt,
    };

    formData.append('optionData', JSON.stringify(optionData));

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        authorization: user.token,
      },
    };

    console.log({ user });
    console.log({ formData });
    console.log({ config });

    //
    alert('Registered.');
    history.push(`/MyVote`);
  };

  const handleClose = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className="dialog-actions-componet-grid"
      >
        <Fab
          variant="extended"
          aria-label="like"
          onClick={handleClose}
          className="up-cancel-fab dialog-actions-componet-fab1"
        >
          CANCEL
        </Fab>

        <Fab
          variant="extended"
          aria-label="like"
          color="inherit"
          onClick={readyToUpload && createVoteHandler}
          className="up-cancel-fab"
          style={{
            backgroundColor: readyToUpload ? '#1FA212' : '#E0E0E0',
          }}
        >
          UPLOAD
        </Fab>
      </Grid>
    </Wrapper>
  );
};

export default DialogActionsComponet;
