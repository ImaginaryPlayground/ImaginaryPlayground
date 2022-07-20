import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }
  & > div {
    & > div {
      &:last-child {
        & > div {
          & > div {
            & > div {
              & > div {
                overflow: hidden !important;
              }
            }
          }
        }
      }
    }
  }
  .big-avatar {
    margin: 0 auto;
  }
  .text-field {
    margin-top: 0;
    padding-left: 8px;
    box-sizing: border-box;
  }
  button {
    margin: 8px;
    margin-left: -8px;
  }
  .post-button {
    width: 18vw;
    max-width: 70px;
    height: 40px;
  }
  .comment-typography {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    padding-right: 10px;
  }
`;
export default Wrapper;
