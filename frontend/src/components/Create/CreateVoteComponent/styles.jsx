import styled from 'styled-components';

const Wrapper = styled.div`
  & .container {
    display: flex;
    flex-direction: column;
    font-family: 'Noto sans KR', sans-serif;
    height: 330px;
  }
  & .dropzone {
    display: flex;
    height: 70%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #a2a2a2;
    border-style: dashed;
    background: #efefef;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    &:focus {
      border-color: #2196f3;
    }
    &:disabled {
      opacity: 0.6;
    }
  }
  & .up-cancel-fab {
    margin: 10px 5px;
    color: white;
  }
  & .cover-avatar {
    width: 100%;
    height: 100%;
  }
  & .form-control {
    padding-top: 8px;
    min-width: 200px;
  }
  & .input-title-component-input1 {
    font-size: 35px;
  }
  & .input-title-component-input2 {
    margin-top: 30px;
  }
  & .sub-title-group-component-divider {
    width: 100%;
  }
  & .create-vote-main-component {
    padding: 20px;
  }
  & .create-vote-main-component-grid-item {
    padding-top: 30px;
  }
  & .thumbnail-image-component-h4 {
    color: #939393;
  }
  & .thumbnail-image-component-aside {
    padding: 0 10px;
    color: #a2a2a2;
  }
  @media (max-width: 600px) {
    .container {
      height: 50vh;
      & > p {
        font-size: 1rem;
      }
      & > em {
        font-size: 0.8rem;
      }
    }
  }
`;
export default Wrapper;
