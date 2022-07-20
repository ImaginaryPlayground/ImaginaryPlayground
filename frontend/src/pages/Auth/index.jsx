import React, { useContext, useEffect } from 'react';

import Layout from '../../layout/';

import { CommonContext } from '../../context/CommonContext';

const Auth = () => {
  const { user, setSignDialogOpen, setUserDetailDialogOpen } = useContext(
    CommonContext,
  );

  useEffect(() => {
    if (user.status === '') {
      setSignDialogOpen(true);
    } else if (user.status === 'login') {
      setUserDetailDialogOpen(true);
    } else if (user.status === 'default') {
      setSignDialogOpen(false);
    } else {
      alert('More than');
    }
  }, []);

  return <Layout />;
};

export default Auth;
