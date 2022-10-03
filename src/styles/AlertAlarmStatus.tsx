import styled from '@emotion/styled';

const AlertAlarmStatus = styled.div`
  position: absolute;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  text-align: center;
  background-color: ${({ theme }) => theme.warning};
  color: ${({ theme }) => theme.background};
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
`;

export default AlertAlarmStatus;
