import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  .image {
    position: relative;
    height: 200px;
    &:hover,
    & .focus-visible {
      z-index: 1;
      & .image-backdrop {
        opacity: 1;
        background: #4248b5;
      }
    }
  }
  .focus-visible {
  }
  .image-button {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-src {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-position: center top 30%;
  }
  .image-backdrop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    opacity: 0.4;
    transition: all 0.2s ease;
    &:hover {
      background: none;
    }
  }
  .image-title {
    position: relative;
    padding: 16px 32px 14px;
    line-height: 26px;
    color: #fff;
  }
  .selected-tab {
    opacity: 1;
    background: #4248b5;
  }
  .button-base {
    width: 100%;
    height: 80px;
  }
  @media (max-width: 600px) {
    width: 100% !important;
    height: 100px;
  }
`;

export default Wrapper;
