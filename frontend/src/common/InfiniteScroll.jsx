import { useState, useEffect } from 'react';

export const useInfiniteScroll = () => {
  const [state, setState] = useState(false);
  const onScroll = () => {
    let scrollheight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    let scrollTop = Math.floor(
      Math.max(document.documentElement.scrollTop, document.body.scrollTop),
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight > scrollheight - 10) {
      setState(true);
    } else {
      setState(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
};
