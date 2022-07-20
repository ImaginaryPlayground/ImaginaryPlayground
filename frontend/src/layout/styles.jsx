import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  .content {
    transition: all 0.3s ease;
    padding-bottom: 287px;
    min-height: 1200px;
  }
  .content-shift {
    transition: all 0.3s ease;

    /* margin-left: 280px; */
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: #f2f3f4;
  }
  .container {
    margin-bottom: 30px;
  }
  @media (max-width: 960px) {
    padding-bottom: 377px;
  }
`;

export default Wrapper;
