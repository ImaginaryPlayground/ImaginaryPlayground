import styled from 'styled-components';

const Wrapper = styled.div`
  .root {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
  }
  .grid-list {
    width: 100%;
  }
  .image-grid-filter-select {
    color: #5d5d5d;
    font-weight: bold;
  }
  .vote-grid-list-grid {
    margin-bottom: 10px;
  }
  .vote-grid-list-grid-item {
    padding: 5px 5px 0 10px;
    color: #5d5d5d;
  }
  .vote-grid-list-grid-item-typography {
    margin-left: 10px;
    font-weight: bold;
  }
`;
export default Wrapper;
