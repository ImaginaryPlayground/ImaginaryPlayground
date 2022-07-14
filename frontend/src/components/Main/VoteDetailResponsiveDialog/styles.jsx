import styled from 'styled-components';

export const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const Date = styled.span`
  position: absolute;
  right: 44px;
  top: -2px;
  z-index: 99999;
  & > span {
    display: block;
    padding: 0 10px 0 40px;
    height: 30px;
    line-height: 30px;
    background: url('/images/timer_icon_w.png') no-repeat left 3px center;
    background-size: 24px;
    color: #fff;
    font-size: 14px;
  }
`;

export const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    font-family: 'Noto sans KR', sans-serif;
    & > p {
      font-size: 1rem;
    }
    & > em {
      font-size: 0.8rem;
    }
  }
  .dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #eeeeee;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    &:focus {
      border: #2196f3;
    }
    &.disabled {
      opacity: 0.6;
    }
  }
  .cancel-fab {
    margin: 10px 5px;
    color: white;
    font-weight: 600;
  }
  .feed-container {
    overflow: hidden;
    padding: 32px;
  }
  .view-vote-subject-component-grid-item1 {
    padding: 48px 16px 16px 48px !important;
  }
  .view-vote-subject-component-grid-item2 {
    padding: 16px 16px 16px 64px !important;
  }
  .view-vote-subject-component-grid-item3 {
    padding-top: 50px;
  }
  .view-vote-subject-component-grid-item-typography1 {
    font-weight: 900;
    font-size: 50px;
  }
  .view-vote-subject-component-grid-item-typography2 {
    font-weight: 500;
  }
  .dialog-actions-componet-grid-item {
    margin: 44px 0 80px;
  }
  .dialog-actions-componet-grid-item-button {
    width: 180px;
    height: 60px;
    font-size: 22px;
  }
  .go-back-btn {
    border: 1px solid #fafafa;
    width: 16px;
    height: 16px;
  }
  @media (max-width: 600px) {
    .feed-container {
      padding: 16px;
    }
  }
`;
