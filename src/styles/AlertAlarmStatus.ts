import styled from '@emotion/styled';

import palette from '@/styles/palette';

const AlertAlarmStatus = styled.div`
  position: absolute;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  text-align: center;
  background-color: ${palette.warning};
  color: ${palette.background};
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
`;

export default AlertAlarmStatus;
