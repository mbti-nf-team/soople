import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const blink = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const mobilePopInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const mobilePopOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const popInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px) scale(1.0);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const popOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1.0);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
`;

const transitions = {
  fadeIn,
  fadeOut,
  popInFromBottom,
  popOutToBottom,
  mobilePopInFromBottom,
  mobilePopOutToBottom,
  blink,
};

export default transitions;
