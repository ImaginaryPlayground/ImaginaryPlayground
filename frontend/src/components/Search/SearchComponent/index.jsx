import React, { useContext } from 'react';

import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';

import { ViewContext } from '../../../context/ViewContext';

const SearchComponent = () => {
  const { searchValue, setSearchValue } = useContext(ViewContext);

  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
  };

  const onChangeSearchValueHandler = e => {
    setSearchValue(e.target.value);
  };

  return (
    <Wrapper>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className="search-component-grid"
        onClick={TopSearchCloseHandler}
      >
        <Grid item>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={3}>
              <SearchIcon
                className="search-component-grid-item-se-icon"
                fontSize="large"
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                value={searchValue}
                placeholder="Search..."
                autoFocus={true}
                onChange={onChangeSearchValueHandler}
                className="input2"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SearchComponent;
