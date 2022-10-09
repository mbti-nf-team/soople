import { css, Theme } from '@emotion/react';

import mq from './responsive';
import transitions from './transitions';

const modalBackground = ({ isVisible }: { theme: Theme, isVisible: boolean; }) => css`
  visibility: ${(isVisible ? 'visible' : 'hidden')};

  ${!isVisible && css`
    animation: ${transitions.fadeOut} 0.2s forwards ease-in-out;
  `};

  ${isVisible && css`
    animation: ${transitions.fadeIn} 0.2s forwards ease-in-out;
  `};
`;

const modalBox = ({ isVisible }: { theme: Theme, isVisible: boolean; }) => css`
  ${mq({
    transition: ['visibility 0.4s ease-out', 'visibility 0.2s ease-out'],
  })}

  visibility: ${(isVisible ? 'visible' : 'hidden')};

  ${!isVisible && mq({
    animation: [
      `${transitions.mobilePopOutToBottom} 0.4s forwards ease-in-out`,
      `${transitions.zoomOut} 0.2s forwards ease-in-out`,
    ],
  })};

  ${isVisible && mq({
    animation: [
      `${transitions.mobilePopInFromBottom} 0.4s forwards ease-in-out`,
      `${transitions.zoomIn} 0.2s forwards ease-in-out`,
    ],
  })};
`;

export default {
  modalBackground,
  modalBox,
};
