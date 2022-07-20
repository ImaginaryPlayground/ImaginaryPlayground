import styled from 'styled-components';

const Wrapper = styled.div`
  .bigIndicator {
    background: #3f51b5;
  }
  .root {
    overflow: hidden;
    flex-grow: 1;
    display: flex;
  }
  .info {
    padding: 28px 0 16px;
    float: left;
    width: calc(100% - 196px);
    & > div {
      padding-left: 40px;
    }
  }
  .password {
  }
  .tabs {
    float: left;
    overflow: visible;
    & button {
      padding-right: 20px;
      padding-left: 20px;
    }
  }
  .big-indicator {
    background: #1890ff;
  }
  .sign-out-btn {
    width: 90%;
  }
  @media (max-width: 960px) {
    .info {
      padding: 28px 0 16px;
      float: left;
      width: 100%;
      margin: 0 auto;
      & > div {
      }
    }
  }
`;

export default Wrapper;
