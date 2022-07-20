import React, { useContext, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import crypto from 'crypto';
import { ViewContext } from '../../../context/ViewContext';
import { CommonContext } from '../../../context/CommonContext';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Grid,
  IconButton,
  Typography,
  Divider,
  TextField,
} from '@material-ui/core';
import Wrapper from './styles';

import userData from './dump.json';

const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const DialogTitleComponent = () => {
  return (
    <Wrapper>
      <h1 className="dialog-title-component">{'Logo'}</h1>
    </Wrapper>
  );
};

const SignInSection01 = () => {
  let history = useHistory();

  const [disabled, setDisabled] = useState(true);
  const { signInUserData, setSignInUserData, setIsSignUp } = useContext(
    ViewContext,
  );

  const {
    user,
    setUser,
    setSignDialogOpen,
    serverUrl,
    setIsShowKeyborad,
  } = useContext(CommonContext);

  const OnChangeHandler = name => e => {
    setSignInUserData({ ...signInUserData, [name]: e.target.value });
  };

  const onClickHandler = () => {
    setIsSignUp('ForgotPw');
  };

  const onSignInHandler = async e => {
    var { id, password } = signInUserData;

    console.log('TCL: onSignInHandler -> id, password', id, password);

    if (!password || !id) {
      alert('You need both email and password.');
      return;
    }

    if (!regExp.test(id)) {
      alert('The email format is invalid.');
      return;
    }

    let respone = [];
    let hashPassword = '';
    try {
      hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
    } catch (error) {
      return;
    }

    setUser({ ...userData });
    setSignDialogOpen(false);
    setIsSignUp('SignIn');

    history.goBack();
  };

  useEffect(() => {
    console.log({ user });

    if (signInUserData.id !== '' && signInUserData.email !== '') {
      setDisabled(false);
    }

    if (signInUserData.id === '' || signInUserData.email === '') {
      setDisabled(true);
    }
  }, [signInUserData.id, signInUserData.email, user]);

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="grid"
      >
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            className="text-field"
            defaultValue={signInUserData.id}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('id')}
            onFocus={event => {
              setIsShowKeyborad(true);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            className="text-field"
            type="password"
            autoComplete="current-password"
            defaultValue={signInUserData.password}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('password')}
            onFocus={event => {
              setIsShowKeyborad(true);
            }}
          />
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Button
            variant="contained"
            disabled={disabled}
            // disabled={false}
            fullWidth={true}
            color="primary"
            onClick={onSignInHandler}
            className="grid-item-button"
          >
            login
          </Button>
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={5}>
              <Divider />
            </Grid>

            <Grid item xs={2}>
              <Typography align="center" className="grid-item-typography1">
                or
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <IconButton
              className="sign-in-butoon grid-item-icon-button"
              onClick={onClickHandler}
            >
              <Typography className="grid-item-typography3">
                {'Forgot Password?'}
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInSection02 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignUp');
  };
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="grid2"
      >
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="grid2-item-button"
          >
            {`Don't have an account?`}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignInSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignInSection02 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

const SignUpSection01 = () => {
  return (
    <Wrapper>
      <Typography align="center" className="sign-up1">
        Sign up to see friends' photos and videos.
      </Typography>
    </Wrapper>
  );
};

const SignUpSection02 = () => {
  const [disabled, setDisabled] = useState(true);
  const { signUpUserData, setSignUpUserData, setIsSignUp } = useContext(
    ViewContext,
  );
  const { serverUrl } = useContext(CommonContext);

  const OnChangeHandler = name => e => {
    if (
      signUpUserData.name !== '' &&
      signUpUserData.id !== '' &&
      signUpUserData.email !== ''
    ) {
      setDisabled(false);
    }

    if (
      signUpUserData.name === '' ||
      signUpUserData.id === '' ||
      signUpUserData.email === ''
    ) {
      setDisabled(true);
    }

    setSignUpUserData({ ...signUpUserData, [name]: e.target.value });
  };

  const onSignUpHandler = async () => {
    var { name, id, password } = signUpUserData;

    if (name === '' || id === '' || password === '') {
      alert('You need both email and password and username.');
      return;
    }

    if (!regExp.test(id)) {
      alert('The email format is invalid.');
      return;
    }

    let respone = [];
    let hashPassword = 'test2';
    try {
      hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
    } catch (error) {
      console.log('PPAP: signInHandler -> error', error);
    }

    var body = {
      id: id,
      name: name,
      pwd: hashPassword,
    };
    console.log('PPAP: signUpHandler -> body', body);

    //

    setIsSignUp('SignIn');
    setSignUpUserData({
      id: '',
      name: '',
      password: '',
    });
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{ marginLeft: 4 }}
      >
        <Grid item xs={12} className="sign-up-grid">
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue={signUpUserData.id}
            className="text-field"
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('id')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item1">
          <TextField
            required
            id="outlined-required"
            label="User Name"
            defaultValue={signUpUserData.name}
            className="text-field"
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('name')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            className="textField"
            type="password"
            autoComplete="current-password"
            defaultValue={signUpUserData.password}
            variant="outlined"
            placeholder="비밀번호"
            fullWidth={true}
            onChange={OnChangeHandler('password')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item3">
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth={true}
            color="primary"
            onClick={onSignUpHandler}
            style={{
              fontSize: 14,
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
            }}
          >
            Sign up
          </Button>
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item4">
          <Typography align="center" className="sign-up-grid-item4-typography">
            By signing up, you agree to ssafy's terms, <b>data policy</b> and{' '}
            <b>cookie policy.</b>
          </Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection03 = () => {
  return (
    <Wrapper>
      <Grid item xs={12} className="sign-up3-grid">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          className="sign-up3-grid-item"
        >
          <Grid item xs={5}>
            <Divider />
          </Grid>

          <Grid item xs={2}>
            <Typography
              align="center"
              className="sign-up3-grid-item-typography"
            >
              or
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection04 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignIn');
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className="sign-up4-grid"
      >
        <Grid item xs={2} />
        <Grid item xs={5}>
          <Typography align="center" className="sign-up4-grid-item-typography">
            {'Do you have an account?'}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="sign-up4-grid-item-button"
          >
            {'login'}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignUpSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection02 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection03 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection04 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

// ForgotPw
const ForgotPwGroupComponent = () => {
  const { serverUrl } = useContext(CommonContext);
  const { recoverPwUserData, setRecoverPwUserData } = useContext(ViewContext);
  const { setIsSignUp } = useContext(ViewContext);

  const inputRef = useRef('');

  const onClickHandler = whichGroup => {
    setIsSignUp(whichGroup);
  };
  const sendSearchWordHandler = async searchWord => {
    if (!regExp.test(searchWord)) {
      alert('The email format is invalid.');
      return;
    } else {
      alert('Not implemented yet.');

      // setRecoverPwUserData({ ...recoverPwUserData, email: searchWord });
      // alert('Authentication code has been sent to you by email');
      // setIsSignUp('RecoverPw');
    }
  };
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="forgot-pw"
      >
        <h2>Having trouble signing in?</h2>
        <h3>
          Enter the user ID and the verification code will be sent to the
          registered email.
        </h3>
        <input type="text" placeholder="User ID" ref={inputRef} />
        <button
          type="button"
          className="btn-link"
          onClick={() => {
            sendSearchWordHandler(inputRef.current.value);
          }}
        >
          Send Login Link
        </button>
        <h4 className="divider">
          <span>or</span>
        </h4>
        <h5
          className="btn-to-sign-up"
          onClick={() => {
            onClickHandler(`SignUp`);
          }}
        >
          Create new account
        </h5>
        <button
          type="button"
          className="btn-login"
          onClick={() => {
            onClickHandler(`SignIn`);
          }}
        >
          Back to login
        </button>
      </Grid>
    </Wrapper>
  );
};

// RecoverPw
const RecoverPwGroupComponent = () => {
  const { serverUrl } = useContext(CommonContext);
  const { recoverPwUserData, setRecoverPwUserData, setIsSignUp } = useContext(
    ViewContext,
  );
  const emailRef = useRef('');
  const verificationCodeRef = useRef('');
  const newPasswordRef = useRef('');

  const sendRecoverPw = async () => {
    const user_id = emailRef.current.value;
    const code = verificationCodeRef.current.value;
    const pwd = newPasswordRef.current.value;

    if (code === '') {
      alert('Please enter the verification code');
      return;
    } else if (pwd === '') {
      alert('Please enter a new password');
      return;
    } else {
      let hashedPassword = '';
      try {
        hashedPassword = crypto
          .createHash('sha512')
          .update(pwd)
          .digest('hex');
      } catch (error) {
        console.log('PPAP: signInHandler -> error', error);
      }

      alert('Not implemented yet.');
      // setIsSignUp('SignIn');
    }
  };

  const sendSearchWordHandler = async searchWord => {
    console.log({ searchWord });

    if (searchWord === '') {
      alert('Please enter your e-mail');
      return;
    } else {
      alert('Not implemented yet.');
      // setRecoverPwUserData({ ...recoverPwUserData, email: searchWord });
    }
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="recover-box-wrap"
      >
        <Grid item xs={12} className="recover-box">
          <h2>Reset your password</h2>
          <h3>
            Enter the code you received from Amazon and set a new password.
          </h3>
          <Grid className="input-box">
            <h2>E-mail</h2>
            <input
              type="text"
              value={recoverPwUserData.email}
              ref={emailRef}
              readOnly
            />
          </Grid>
          <Grid className="input-box">
            <h2>Verification Code</h2>
            <input
              type="text"
              placeholder="enter code"
              ref={verificationCodeRef}
            />
          </Grid>
          <Grid className="input-box">
            <h2>New Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              ref={newPasswordRef}
            />
          </Grid>
          <Grid className="btn_box">
            <Grid
              className="Text"
              onClick={() => {
                sendSearchWordHandler(emailRef.current.value);
              }}
            >
              Resend Code
            </Grid>
            <Grid className="btn">
              <button type="button" onClick={sendRecoverPw}>
                VERIFY
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const ResponsiveDialogSign = () => {
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));
  let history = useHistory();

  const { signDialogOpen, setSignDialogOpen, serverImgUrl } = useContext(
    CommonContext,
  );

  const handleClose = () => {
    setSignDialogOpen(false);

    history.goBack();
  };

  const [isSignUp, setIsSignUp] = useState('SignIn');
  const [signInUserData, setSignInUserData] = useState({
    id: '',
    password: '',
  });
  const [signUpUserData, setSignUpUserData] = useState({
    id: '',
    name: '',
    password: '',
  });
  const [recoverPwUserData, setRecoverPwUserData] = useState({
    email: '',
    code: '',
    pwd: '',
  });

  return (
    <ViewContext.Provider
      value={{
        signUpUserData,
        setSignUpUserData,
        signInUserData,
        setSignInUserData,
        isSignUp,
        setIsSignUp,
        recoverPwUserData,
        setRecoverPwUserData,
      }}
    >
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'xs'}
        open={signDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: 'none',
          },
        }}
        BackdropProps={{
          style: {
            boxShadow: 'none',
            backgroundImage: `url(${serverImgUrl}thumb-1920-731946.jpg)`,
            backgroundSize: 'cover',
            filter: 'brightness(0.4)',
          },
        }}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <DialogTitle id="responsive-dialog-title">
              <DialogTitleComponent />
            </DialogTitle>
            <DialogContent>
              {isSignUp === 'SignUp' && <SignUpGroupComponent />}
              {isSignUp === 'SignIn' && <SignInGroupComponent />}
              {isSignUp === 'ForgotPw' && <ForgotPwGroupComponent />}
              {isSignUp === 'RecoverPw' && <RecoverPwGroupComponent />}
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </ViewContext.Provider>
  );
};
export default ResponsiveDialogSign;
