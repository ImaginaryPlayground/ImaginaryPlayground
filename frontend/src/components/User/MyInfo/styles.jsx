import styled from 'styled-components';

const Wrapper = styled.div`
  textarea {
    font-size: 14px;
  }
  .title {
    width: 100%;
    text-align: left;
  }
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
  .my-info-upload-image-component-button {
    color: #4248b5;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
  }
  .on-my-info-save-handelr-grid {
    margin-top: 24px;
  }
  .on-my-info-save-handelr-fab1 {
    background: #fff;
    color: #696969;
  }
  @media (max-width: 960px) {
    padding: 0 20px;
    box-sizing: border-box;
    & form {
      margin: 0 auto;
    }
  }
`;

export default Wrapper;
