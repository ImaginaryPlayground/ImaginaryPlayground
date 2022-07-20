import React, { Fragment, useCallback, useEffect, useContext } from 'react';
import {
  useMediaQuery,
  createMuiTheme,
  ThemeProvider,
  Radio,
  Grid,
  Input,
  IconButton,
  TextField,
  Badge,
  Fab,
  Avatar,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import ImageOutlinedIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Wrapper from './styles';

import { ViewContext } from '../../../context/ViewContext';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
const theme = createMuiTheme({
  overrides: {
    SwitchBase: {
      root: {
        padding: '9px 0',
      },
    },
  },
});

const VoteInputRadioComponent = props => {
  const { index } = props;

  const { nowSelectedIndex } = useContext(ViewContext);

  return (
    <Radio
      checked={nowSelectedIndex === index}
      value={index}
      name="radio-button-demo"
      inputProps={{ 'aria-label': index }}
      color="primary"
    />
  );
};

const VoteOptionSubjectInputComponent = props => {
  const { data, setData, nowSelectedIndex } = useContext(ViewContext);
  const { index } = props;

  const onChangeHandler = e => {
    var tempData = data.map((x, i) => {
      if (i === index) {
        x.optionTitle = e.target.value;
      }
      return x;
    });
    setData(tempData);
  };

  return (
    <Input
      placeholder={`option ${index + 1}`}
      autoFocus={nowSelectedIndex === index}
      className="input"
      inputProps={{
        'aria-label': 'description',
      }}
      fullWidth={true}
      value={data[index].optionTitle}
      onChange={onChangeHandler}
    />
  );
};

const UploadFileComponentGroup = props => {
  const { index } = props;

  const { data, setData } = useContext(ViewContext);

  const imageButtonClickHandler = () => {
    var tempData = data.map((x, i) => {
      if (i === index) {
        if (x.targetUploadType === 'image') {
          x.targetUploadType = '';
        } else {
          x.targetUploadType = 'image';
        }
      }

      return x;
    });

    setData(tempData);
  };

  const movieButtonClickHandler = () => {
    var tempData = data.map((x, i) => {
      if (i === index) {
        if (x.targetUploadType === 'movie') {
          x.targetUploadType = '';
        } else {
          x.targetUploadType = 'movie';
        }
      }
      return x;
    });
    setData(tempData);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="delete"
        onClick={imageButtonClickHandler}
        className="option-file-upload-icon"
      >
        <ImageOutlinedIcon
          fontSize="large"
          color="inherit"
          htmlColor="#ababab"
        />
      </IconButton>

      <IconButton
        aria-label="delete"
        onClick={movieButtonClickHandler}
        className="option-file-upload-icon"
      >
        <VideoLibraryIcon
          fontSize="large"
          color="inherit"
          htmlColor="#ababab"
        />
      </IconButton>
    </Fragment>
  );
};

const DeleteOptionComponent = props => {
  const { index } = props;

  const { data, setData, setNowSelectedIndex } = useContext(ViewContext);

  const DeleteButtonOnClickHandler = () => {
    var targetIndex = index;

    var dataTemp = [];

    for (var i = 0; i < data.length; i++) {
      if (i !== targetIndex) {
        dataTemp.push(data[i]);
      }
    }

    setData(dataTemp);

    setNowSelectedIndex(0);
  };

  return (
    <IconButton
      aria-label="delete"
      onClick={DeleteButtonOnClickHandler}
      className="option-file-upload-icon"
    >
      <CloseIcon fontSize="large" color="inherit" htmlColor="#ababab" />
    </IconButton>
  );
};

const ImageComponent = props => {
  const { index } = props;

  const { data, setData } = useContext(ViewContext);

  const onDrop = useCallback(acceptedFiles => {
    console.log('PPAP: Basic -> acceptedFiles', acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone(onDrop);

  useEffect(() => {
    for (const file of acceptedFiles) {
      var tempData = data.map((x, i) => {
        if (i === index) {
          x.uploadTarget = file;
          x.uploadTargetPath = URL.createObjectURL(file);
        }
        return x;
      });

      setData(tempData);
    }
  }, [acceptedFiles]);

  return (
    <Wrapper>
      <section className="option-image-upload-section">
        <div {...getRootProps({ className: 'dropzone' })}>
          {!data[index].uploadTargetPath && (
            <Typography variant="body2" className="image-component-typography">
              Image Requirement
            </Typography>
          )}
          {data[index].uploadTargetPath && (
            <Avatar
              variant="square"
              src={data[index].uploadTargetPath}
              className="option-image-upload-avatar"
            />
          )}

          <input {...getInputProps()} />
        </div>
      </section>
    </Wrapper>
  );
};

const OptionMovieInputComponet = props => {
  const { data, setData, nowSelectedIndex } = useContext(ViewContext);
  const { index } = props;

  const onChangeHandler = e => {
    var inputValue = e.target.value;
    var tempData = data.map((x, i) => {
      if (i === index) {
        x.uploadTarget = inputValue;
      }
      return x;
    });
    setData(tempData);
  };
  return (
    <Wrapper>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            autoFocus={nowSelectedIndex === index}
            id="outlined-search"
            label="Paste YouTube URL here"
            type="search"
            margin="normal"
            variant="outlined"
            fullWidth={true}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid item xs={12} className="option-movie-input-componet-grid-item">
          {data[index].uploadTarget !== '' && (
            <ReactPlayer
              url={data[index].uploadTarget}
              playing
              width={'100%'}
              height={'100%'}
            />
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const OptionMovieComponet = props => {
  const { index } = props;
  const { data, setData } = useContext(ViewContext);

  return (
    <Badge
      className="badge-margin"
      badgeContent={
        <IconButton
          color="inherit"
          size="medium"
          onClick={e => {
            var tempData = data.map((x, i) => {
              if (i === index) {
                x.targetUploadType = '';
                x.uploadTarget = '';
              }
              return x;
            });
            setData(tempData);
          }}
        >
          <HighlightOffTwoToneIcon
            fontSize="large"
            color="inherit"
            htmlColor="#ababab"
          />
        </IconButton>
      }
      component={'h1'}
    >
      <OptionMovieInputComponet index={index} />
    </Badge>
  );
};

const OptionImageComponent = props => {
  const { index } = props;
  const { data, setData } = useContext(ViewContext);

  return (
    <Badge
      className="margin"
      badgeContent={
        <IconButton
          color="inherit"
          size="medium"
          onClick={e => {
            var tempData = data.map((x, i) => {
              if (i === index) {
                x.targetUploadType = '';
                x.uploadTarget = '';
              }
              return x;
            });
            setData(tempData);
          }}
        >
          <HighlightOffTwoToneIcon
            fontSize="large"
            color="inherit"
            htmlColor="#ababab"
          />
        </IconButton>
      }
    >
      <ImageComponent index={index} />
    </Badge>
  );
};

const VoteInputComponent = props => {
  const { index } = props;

  const { data, nowSelectedIndex, setNowSelectedIndex } = useContext(
    ViewContext,
  );

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        onClick={() => {
          setNowSelectedIndex(index);
        }}
      >
        <Grid item xs={12}>
          <Grid>
            <VoteInputRadioComponent index={index} />
            <VoteOptionSubjectInputComponent index={index} />
          </Grid>
          <Grid>
            <Grid>
              <UploadFileComponentGroup index={index} />
              {nowSelectedIndex === index && (
                <DeleteOptionComponent index={index} />
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1} />
        <Grid item xs={11} style={{ marginTop: 20 }}>
          {data[index].targetUploadType === 'image' && (
            <OptionImageComponent index={index} />
          )}
          {data[index].targetUploadType === 'movie' && (
            <OptionMovieComponet index={index} />
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const OptionButtonComponet = () => {
  const underIpadPro = useMediaQuery('(min-width:1025px)');

  const { data, setData, setNowSelectedIndex } = useContext(ViewContext);

  const OptionButtonOnClickHandler = () => {
    setNowSelectedIndex(data.length);

    setData([
      ...data,
      {
        optionTitle: '',
        targetUploadType: '',
        uploadTarget: '',
      },
    ]);
  };

  return (
    <Wrapper>
      {underIpadPro ? (
        <Fab
          variant="extended"
          onClick={OptionButtonOnClickHandler}
          className="option-button-componet-fab"
        >
          <AddIcon />
          Add more options...
        </Fab>
      ) : (
        <Fab size="small" aria-label="add" color="primary">
          <AddIcon />
        </Fab>
      )}
    </Wrapper>
  );
};

const RadioButtonsGroup = () => {
  const { data } = useContext(ViewContext);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Grid>
          {data.map((x, key) => {
            return <VoteInputComponent index={key} key={key} />;
          })}
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item className="radio-button-group-grid-item">
            <OptionButtonComponet />
          </Grid>
        </Grid>
      </Wrapper>
    </ThemeProvider>
  );
};

export default RadioButtonsGroup;
