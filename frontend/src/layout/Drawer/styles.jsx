import styled from 'styled-components';
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background: #fff;
  & .drawer {
    display: none;
    width: 280px;
    & > div {
      width: 280px;
    }
    & .drawer-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      & > div {
        overflow: hidden;
        padding: 4px 0;
        box-sizing: border-box;
        & > div {
          width: 100%;
          & > button {
            float: right;
          }
        }
      }
    }
  }
  & .up-cancel-fab {
    border-radius: 30px;
    margin-right: 12px;
  }
  & .bg-unset {
    &:hover {
      background: unset;
    }
  }
  & .drawer-list-group-list {
    color: #a4a4a4;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    & .panel {
      box-shadow: none;
      width: 100%;
      & .panel-summary {
        padding: 0;
        & .list-item {
          color: #a4a4a4;
          margin-top: 8;
        }
        & .avatar {
          margin-right: 10px;
        }
      }
    }
    & .expansion-panel {
      color: #a4a4a4;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: 0.00938em;
      width: 100%;
      & .list-item {
        color: #3f51b5;
      }
    }
  }
  @media (max-width: 960px) {
    & .drawer {
      display: block;
    }
  }
`;
export default Wrapper;
