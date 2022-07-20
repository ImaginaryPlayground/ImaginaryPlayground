import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  * {
    transition: all 0.4s;
  }
  & .subject {
    width: 100%;
    padding: 120px 0;
    font-size: 44px;
    font-weight: 500;
    text-align: center;
  }
  & .info {
    padding-bottom: 60px;
    & > div {
      text-align: center;
      & .title {
        padding: 24px 0;
        font-size: 36px;
        font-weight: 300;
        color: #242424;
      }
      & .text {
        font-size: 18px;
        font-weight: 500;
        color: #242424;
      }
    }
  }
  @media (max-width: 960px) {
    & .subject {
      padding: 100px 0 !important;
    }
    & .info {
      & > div {
        padding-bottom: 24px;
      }
    }
  }
  @media (max-width: 600px) {
    & .subject {
      padding: 60px 0 !important;
      font-size: 32px;
    }
    & .info {
      & > div {
        padding-bottom: 24px;
        & .title {
          padding: 12px 0 !important;
          font-size: 24px;
        }
        & .text {
          font-size: 16px;
        }
      }
    }
  }
`;

export default Wrapper;
