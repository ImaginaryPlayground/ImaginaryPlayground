import { useMediaQuery } from '@material-ui/core';

export const useNowCols = () => {
  const isXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const isLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  return (
    (isXs && 1) || (isSm && 2) || (isMd && 3) || (isLg && 4) || (isXl && 5)
  );
};
