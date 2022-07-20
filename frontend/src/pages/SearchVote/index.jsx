import React from 'react';
import Layout from '../../layout/';
import VoteGridList from '../../components/Grid/VoteGridList/index';
import SearchComponent from '../../components/Search/SearchComponent';
import { useLocalStorageSetState } from '../../common/CommonHooks';
import { ViewContext } from '../../context/ViewContext';
import { Grid } from '@material-ui/core';

const SearchVote = () => {
  const [searchValue, setSearchValue] = useLocalStorageSetState('', 'search');

  return (
    <ViewContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      <Layout>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
          // !!
          style={{ paddingTop: '64px' }}
        >
          <Grid item xs={12}>
            <SearchComponent />
          </Grid>
          <Grid item xs={12}>
            <VoteGridList
              categoryData={[]}
              value={0}
              index={0}
              itemType={'search'}
              itemValue={searchValue}
            />
          </Grid>
        </Grid>
      </Layout>
    </ViewContext.Provider>
  );
};

export default SearchVote;
