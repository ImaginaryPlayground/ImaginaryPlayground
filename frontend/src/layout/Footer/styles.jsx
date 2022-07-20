import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 227px;
  background: #f2f3f4;
  & .footer {
    overflow: hidden;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    padding: 40px 20px;
    word-break: keep-all;
    box-sizing: border-box;
    & .left-box {
      float: left;
      & .page {
        padding-bottom: 20px;
        & li {
          display: inline-block;
          margin-right: 10px;
          &:nth-child(1) {
            font-weight: bold;
          }
          & span {
            color: #242424;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      & .info {
        & li {
          margin-bottom: 5px;
          color: #242424;
        }
      }
      & p {
        padding-top: 10px;
        font-size: 16px;
        color: #242424;
        font-weight: 200;
      }
    }
    & .right-box {
      overflow: hidden;
      float: right;
      & .text-box {
        float: left;
        width: 260px;
        & h2 {
          padding-bottom: 20px;
          font-size: 16px;
          color: #242424;
        }
        & h3 {
          padding-bottom: 10px;
          color: #3f51b5;
          text-decoration: underline;
        }
        & h4 {
          font-size: 12px;
          color: #777;
        }
      }
    }
  }
  @media (max-width: 960px) {
    height: 317px;
    & .footer {
      padding: 24px;
      text-align: center;
      & .left-box {
        margin: 0 auto;
        padding-bottom: 10px;
      }
      & .right-box {
        padding-top: 20px;
        margin: 0 auto;
        & .text-box {
          margin: 0 auto;
          float: inherit;
        }
      }
    }
  }
`;

export default Wrapper;
