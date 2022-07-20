import styled from 'styled-components';

const Wrapper = styled.div`
  & .MuiIconButton-label {
    background: red;
  }
  input {
    width: calc(100% - 60px);
  }
  .dropzone {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #eeeeee;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
  }
  .badge-margin {
    width: 80%;
  }
  .option-file-upload-icon {
    &:hover {
      background-color: unset;
    }
    padding: 12px 0;
    margin: 0 5px;
  }
  .option-image-upload-section {
    display: flex;
    flex-direction: column;
    font-family: 'Noto sans KR', sans-serif;
    width: 150px;
    height: 150px;
  }
  .option-image-upload-avatar {
    width: 100%;
    height: 100%;
  }
  .image-component-typography {
    font-weight: 600;
  }
  .option-movie-input-componet-grid-item {
    height: 370px;
    max-height: 25.606vw;
    min-width: 200px;
    min-height: 130px;
  }
  .option-button-componet-fab {
    color: #3f51b5;
    background: rgb(250, 250, 250);
    font-weight: 600;
  }
  .radio-button-group-grid-item {
    padding-top: 50px;
  }
  @media (max-width: 600px) {
    .option-image-upload-section {
      width: 30vw;
      height: 30vw;
    }
  }
`;

export default Wrapper;
