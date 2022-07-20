import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 120px 0 100px;
  text-align: center;
  box-sizing: border-box;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  * {
    word-break: keep-all;
  }
  & .about-me {
    width: 100%;
    & > h2 {
      font-size: 44px;
      font-weight: 500;
    }
    & .picture {
      overflow: hidden;
      width: 200px;
      height: 200px;
      line-height: 200px;
      margin: 80px auto 48px;
      border: 1px solid #e1e1e1;
      border-radius: 200px;
      background: url('/images/picture.png') no-repeat center center;
      box-sizing: border-box;
    }
    & > h3 {
      font-size: 36px;
      font-weight: 300;
    }
    & .info {
      padding: 40px 0 160px;
      & > div {
        font-size: 24px;
        font-weight: 500;
        padding: 0 80px 0 50px;
        &.phone {
          position: relative;
          background: url('/images/about_me_img_1.png') no-repeat left center;
          &::before {
            content: '';
            position: absolute;
            right: 37px;
            top: 7px;
            width: 3px;
            height: 20px;
            background: #979797;
          }
        }
        &.email {
          background: url('/images/about_me_img_2.png') no-repeat left center;
          padding-right: 0;
        }
      }
    }
    & .license {
      padding-top: 100px;
      text-align: left;
      & > div {
        padding-right: 60px;
        &:last-child {
          padding-right: 0;
        }
        & .license-img {
          padding-bottom: 30px;
        }
        & h2 {
          padding-bottom: 10px;
          font-size: 36px;
          font-weight: bold;
          color: #404eb5;
        }
        & p {
          font-weight: 400;
          font-size: 24px;
          color: #242424;
        }
      }
    }
  }
  @media (max-width: 960px) {
    & .license {
      & > div {
        margin-bottom: 40px;
        padding-right: 0 !important;
      }
    }
  }
  @media (max-width: 680px) {
    & .info {
      padding: 30px 0 120px;
      & > div {
        &.phone {
          padding-right: 0 !important;
        }
        &::before {
          display: none;
        }
      }
    }
  }
  @media (max-width: 600px) {
    padding: 80px 0 60px !important;
    & .info {
      & > div {
        &.phone {
          margin-bottom: 20px;
        }
        &::before {
        }
      }
    }
  }
`;

export default Wrapper;
