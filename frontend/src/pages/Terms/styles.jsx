import styled from 'styled-components';

const Wrapper = styled.div`
  word-break: keep-all;
  & > div {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    & .title {
      padding: 120px 0 100px;
      text-align: center;
      font-size: 44px;
      font-weight: 500;
      color: #242424;
      border-bottom: 1px solid #e1e1e1;
    }
    & .text {
      padding: 60px 0 70px;
      & > div {
        & h2 {
          padding-bottom: 30px;
          font-size: 30px;
          font-weight: bold;
          color: #242424;
        }
        & p {
          padding-bottom: 30px;
          font-size: 30px;
          font-weight: normal;
          color: #242424;
        }
      }
    }
  }
  @media (max-width: 600px) {
    & > div {
      & .title {
        padding: 60px 0 50px !important;
        font-size: 32px;
      }
      & .text {
        & > div {
          & h2 {
            font-size: 20px;
          }
          & p {
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export default Wrapper;
