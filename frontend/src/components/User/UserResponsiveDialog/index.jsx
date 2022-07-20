import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';
import VerticalTabs from './../VerticalTabs/';

import { Dialog, useMediaQuery } from '@material-ui/core';

const User = () => {
  const { userDialogOpen, setUserDetailDialogOpen } = useContext(CommonContext);
  let history = useHistory();
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleClose = () => {
    setUserDetailDialogOpen(false);
    history.goBack();
  };

  return (
    <ViewContext.Provider value={{}}>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'md'}
        open={userDialogOpen}
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
            backgroundColor: 'rgba(0,0,0,0.7)',
            boxShadow: 'none',
          },
        }}
      >
        <VerticalTabs />
      </Dialog>
    </ViewContext.Provider>
  );
};

export default User;
