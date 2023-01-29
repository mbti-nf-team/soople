import {
  CSSProperties, ReactElement, useCallback, useEffect, useRef,
} from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

import { useRecoilValue } from 'recoil';

import { recruitCompleteModalVisibleState } from '@/recoil/modal/atom';
import zIndexes from '@/styles/zIndexes';

const canvasStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: zIndexes.ConfirmModal,
};

function RecruitCompleteCanvasConfetti(): ReactElement {
  const refAnimationInstance = useRef<any>(null);
  const isVisible = useRecoilValue(recruitCompleteModalVisibleState);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: any, opts: any) => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(300 * particleRatio),
      });
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      makeShot(0.25, {
        spread: 120,
        startVelocity: 60,
      });

      makeShot(0.2, {
        spread: 110,
        startVelocity: 70,
      });

      makeShot(0.35, {
        spread: 120,
        decay: 0.91,
        scalar: 0.8,
      });

      makeShot(0.1, {
        spread: 140,
        startVelocity: 50,
        decay: 0.92,
        scalar: 1.2,
      });

      makeShot(0.1, {
        spread: 130,
        startVelocity: 40,
      });
    }
  }, [isVisible, makeShot]);

  return (
    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
  );
}

export default RecruitCompleteCanvasConfetti;
