import styled from 'styled-components';

const Wrapper = styled.div`
  /* width: 'auto', */
  /* height: 'auto', */
  /* maxWidth: '100%', */
  /* maxHeight: '100%', */
  /* minWidth: '50%', */
  /* minHeight: '50%', */
  .btn-login {
    height: 40px;
    line-height: 40px;
    background: #fafafa;
    border: 1px solid #ccc;
    outline: none;
    cursor: pointer;
  }
  .divider {
    margin: 20px 0;
  }
  .forgot-pw {
    padding: 0 16px;
    word-break: keep-all;
    box-sizing: border-box;
    & h2 {
      font-size: 16px;
      margin: 0 0 10px 0;
      color: #262626;
    }
    & h3 {
      line-height: 22px;
      font-size: 14px;
      margin: 0 0 20px 0;
      text-align: center;
      color: #8e8e8e;
    }
    & input {
      display: block;
      width: 100%;
      height: 40px;
      padding: 0;
      line-height: 40px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #ccc;
      background: #fafafa;
      text-indent: 10px;
      outline: none;
      &::placeholder {
        color: #c7c7c7;
        font-size: 14px;
      }
    }
    & button {
      display: block;
      width: 100%;
      &.btn-link {
        height: 35px;
        line-height: 35px;
        margin-bottom: 10px;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        background: #b2dffc;
        border: none;
        cursor: pointer;
        outline: none;
        &.On {
          background: #0095f6;
        }
      }
    }
    & h4 {
      position: relative;
      width: 100%;
      height: 1px;
      background: #aaa;
      & span {
        position: absolute;
        left: 50%;
        top: -10px;
        margin-left: -22.5px;
        background: #fff;
        padding: 0 10px;
      }
    }
    & h5 {
      font-size: 14px;
      margin: 10px 0 80px 0;
      cursor: pointer;
    }
  }
  .recover-box-wrap {
    word-break: keep-all;
    .recover-box {
      padding: 0 30px;
      box-sizing: border-box;
      & > h2 {
        margin: 0 0 15px 0;
        font-size: 16px;
        color: #000f26;
      }
      & > h3 {
        line-height: 22px;
        font-size: 13px;
        color: #777;
        margin: 0 0 30px 0;
      }
      & .input-box {
        & h2 {
          margin: 0 0 10px 0;
          font-size: 13px;
        }
        & input {
          width: 100%;
          height: 45px;
          line-height: 45px;
          margin-bottom: 20px;
          border-radius: 5px;
          border: 1px solid #ccc;
          padding: 10px;
        }
      }
      & .btn-box {
        overflow: hidden;
        width: 100%;
        padding: 10px 0 32px;
        .text {
          float: left;
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          font-weight: bold;
          color: #000f26;
          cursor: pointer;
        }
        .btn {
          float: right;
          & button {
            width: 150px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: none;
            cursor: pointer;
            background: #000f26;
            color: #fff;
            font-size: 11px;
            letter-spacing: 1px;
            font-family: 'Noto Sans KR', sans-serif;
          }
        }
      }
    }
  }
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .dialog {
    background: url('https://i.imgur.com/HeGEEbu.jpg') no-repeat;
  }
  .sign-in-butoon {
    color: #385185;
    &:hover {
      background: none;
    }
  }
  .grid {
    padding: 14px;
    padding-right: 0;
  }
  .grid-item {
    margin: 8px 0;
  }
  .grid-item-button {
    font-weight: 500;
  }
  .grid-item-typography1 {
    font-size: 13px;
    color: #999;
    font-family: 'Noto Sans KR' sans-serif;
    font-weight: 500;
    letter-spacing: 1.5;
  }
  .grid-item-facebook-icon {
    color: #385185;
    margin-right: 4px;
  }
  .grid-item-typography2 {
    font-size: 14px;
    font-family: 'Noto Sans KR' sans-serif, color#385185;
    font-weight: 500;
  }
  .grid-item-typography3 {
    font-size: 12px;
    font-family: 'Noto Sans KR' sans-serif;
    color: #003569;
  }
  .grid2 {
    padding: 10px;
    padding-right: 0;
  }
  .grid2-item-button {
    border: 1px solid #e6e6e6;
    font-size: 14px;
    color: #262626;
  }
  .sign-up1-typography {
    font-size: 17px;
    color: #999;
    font-weight: 700;
    margin-bottom: 10px;
    padding: 0 0 0 14px;
  }
  .sign-up2-grid {
    padding: '0 0 0 8px';
  }
  .sign-up2-grid-button {
    font-size: 14px;
    font-weight: 700;
  }
  .sign-up2-grid-button-facebook-icon {
    font-size: 20px;
    color: #fff;
    margin-right: 8px;
  }
  .sign-up3-grid {
    padding: 0 0 0 14px;
  }
  .sign-up3-grid-item {
    padding: 14px 0 10px;
  }
  .sign-up3-grid-item-typography {
    color: #999;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1;
  }
  .sign-up4-grid {
    padding: 0 0 0 14px;
  }
  .sign-up4-grid-item-typography {
    font-size: 14px;
    color: #262626;
    font-weight: 500;
  }
  .sign-up4-grid-item-button {
    font-size: 14px;
    color: #3897f0;
    font-weight: 500;
  }
  .sign-up-grid {
    padding: 8px 0 8px 14px;
  }
  .sign-up-grid-item1 {
    padding: 8px 0 8px 14px;
  }
  .sign-up-grid-item2 {
    padding: 8px 0 16px 14px;
  }
  .sign-up-grid-item3 {
    padding: 0px 0px 16px 14px;
  }
  .sign-up-grid-item4 {
    padding: 0 0 26px 14px;
  }
  .sign-up-grid-item4-typography {
    color: #999;
    font-size: 14px;
    font-weight: 500;
  }
  .dialog-title-component {
    text-align: center;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 16px 0 8px;
    font-size: 50px;
    font-weight: 500;
  }
  .dialog-left-image-component {
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
  .grid-item-icon-button {
    padding: 0 0 12px 0;
  }
`;

export default Wrapper;
