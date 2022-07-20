import styled from 'styled-components';

const Wrapper = styled.div`
  .root {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    max-width: 1920px;
    margin: 0 auto;
  }
  .grid-list {
    transform: translateZ(0);
  }
  .title-bar {
    background: rgba(255, 255, 255, 1);
  }
  .icon {
    color: white;
  }
  .grid-list-title {
    max-width: 1200px;
  }
  .title {
    color: #383836;
  }
  .input1 {
    height: 50px;
  }
  .input2 {
    height: 40px;
    font-size: 2em;
  }
  .cover-grid {
  }
  .search-component-grid {
    padding: 32px 0 12px 0;
  }
  .search-component-grid-item-se-icon {
    color: #ccc;
  }
`;
export default Wrapper;
