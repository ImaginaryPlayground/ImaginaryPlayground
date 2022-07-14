import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
      transform: scale(.8);
      opacity: 1;
    }
    to {
      transform: scale(2.4);
      opacity: 0;
    }
  `;

const Wrapper = styled.div`
  & .my-vote {
    position: relative;
    overflow: hidden;
    padding-top: 64px;
  }
  & .option-image-upload-avatar {
    width: 100px;
    height: 100px;
  }
  & .btn-position {
    position: absolute;
    right: 16px;
    top: 64px;
    width: 16.667%;
  }
  & .btn-full {
    width: 100%;
    display: none;
  }
  & .btn-left {
    & > button {
      margin-top: 20px;
    }
  }
  & .btn-right {
    & > button {
      margin-top: 20px;
    }
  }

  & .badge {
    position: relative;
    & .badge-icon {
      position: absolute;
      z-index: 999;
      right: 10px;
      bottom: 10px;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background: #44b700;
    }
    &::after {
      content: '';
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 8px;
      height: 8px;
      border: 1px solid #44b700;
      border-radius: 50%;
      animation: ${rotate} 1.2s infinite ease-in-out;
    }
  }
`;

export default Wrapper;
