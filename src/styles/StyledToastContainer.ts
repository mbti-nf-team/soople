import { ToastContainer } from 'react-toastify';

import styled from '@emotion/styled';

import { body2Font } from './fontStyles';
import palette from './palette';

const StyledToastContainer = styled(ToastContainer)`
  width: 328px;

  .Toastify__toast {
    ${body2Font()}
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    color: ${palette.accent7};
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 16px;
    border-radius: 8px;
    min-height: 56px;
  }

  .Toastify__toast-body {
    padding: 0px;
    margin: 0 10px 0 0;
  }

  .Toastify__toast-icon {
    width: auto;
  }
`;

export default StyledToastContainer;
