import styled from 'styled-components';

const Wrapper = styled.div`
  input {
    margin: 8px;
  }
  img {
    width: 100%;
    border-radius: 5px;
  }
  .sub-title {
    transition: all 0.5s ease;
    margin: 0 auto;
    font-size: 28;
    color: #333;
    font-weight: 500;
  }
  .vote-view-component {
  }
  .ch-icon {
    font-size: 38px;
  }
  .vote-view-option-image-component-avatar {
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    height: 50%;
  }
  .vote-view-option-image-group-component-grid-item {
    border-radius: 5px;
  }
  .vote-view-option-subscription-group-component-grid {
    margin: 16px 0;
  }
`;

export default Wrapper;
