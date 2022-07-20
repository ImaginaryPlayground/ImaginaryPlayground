import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .cover-avatar {
    min-height: 150px;
    min-width: 150px;
  }
  .dropzone {
    margin: 0 auto;
  }
  .section-title {
    width: 100%;
    padding: 0 0 32px 8px;
    font-size: 16px;
    color: #000;
    text-align: left;
  }
  .title {
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
  .up-cancel-fab {
    margin: 10px 5px;
    color: white;
  }
  .upload-fab {
    margin: 10px 5px;
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 16px;
    box-shadow: none;
  }
  .cancel-fab {
    margin: 10px 5px;
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    font-size: 16px;
    box-shadow: none;
  }
  .input-component-text-field {
    width: 80%;
    & label {
      font-size: 14px;
    }
  }
  .input-component-icon-button {
    margin: 3px 0 0 16px;
  }
  .input-component-vi-icon {
    color: #696969;
  }
  .my-info-button-group-component-grid {
    margin-top: 32px;
  }
  .my-info-button-group-component-grid-fab1 {
    color: #fff;
    background: #e0e0e0;
  }
  .my-info-button-group-component-grid-fab2 {
    background: #4248b5;
  }
  .text-component-typography {
    font-size: 14px;
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
    color: #4248b5;
  }
  .change-password-component-grid-item {
    padding-bottom: 40px;
  }
`;

export default Wrapper;
