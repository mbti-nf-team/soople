import { ToastContainer } from 'react-toastify';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font, body2Font } from './fontStyles';
import mq from './responsive';
import { lightTheme } from './theme';

const StyledToastContainer = styled(ToastContainer)<{ isMobile: boolean; }>`
  ${mq({
    width: [false, '328px'],
  })};

  &.Toastify__toast-container--top-center {
  ${mq({
    top: ['20px'],
    padding: ['0 20px', 0],
  })};

    & > div:not(div:last-of-type) {
      margin-bottom: 8px;
    }

    & > div:last-of-type {
      margin-bottom: 0;
    }
  }

  &.Toastify__toast-container--bottom-center {
  ${mq({
    bottom: ['80px', '0px'],
  })};
  }

  .Toastify__toast {
    ${({ isMobile }) => (isMobile ? css`
      ${body2Font(true)};
      padding: 13px 16px;
      ` : css`
      ${body1Font()};
      padding: 15px 16px;
    `)}

    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    background: rgba(35, 36, 38, 0.95);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    min-height: 56px;
  }

  .Toastify__toast-body {
    color: ${lightTheme.background};
    padding: 0px;
    margin: 0 10px 0 0;
  }

  .Toastify__toast-icon {
    width: auto;
  }
`;

export default StyledToastContainer;
