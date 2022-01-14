import styled from '@emotion/styled';

import palette from './palette';

const Divider = styled.div`
  position: static;
  width: 10px;
  height: 0px;
  left: 51px;
  top: 15px;
  border: 1px solid ${palette.accent3};
  transform: rotate(-90deg);
  margin: 0px 2px;
`;

export default Divider;
