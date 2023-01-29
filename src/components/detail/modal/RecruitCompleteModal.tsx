import { ReactElement, useRef } from 'react';
import { X as CloseIcon } from 'react-feather';
import { useClickAway } from 'react-use';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import { recruitCompleteModalVisibleState } from '@/recoil/modal/atom';
import { body1Font } from '@/styles/fontStyles';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

import SuccessIcon from '../../../assets/icons/img_success.svg';

function RecruitCompleteModal(): ReactElement | null {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useRecoilState(recruitCompleteModalVisibleState);

  const onClose = () => setIsVisible(false);

  useClickAway(ref, onClose);

  if (!isVisible) {
    return null;
  }

  return (
    <RecruitCompleteModalWrapper>
      <RecruitCompleteModalBox isVisible={isVisible} ref={ref}>
        <HeaderWrapper>
          <CloseIcon
            size={24}
            cursor="pointer"
            onClick={onClose}
            color={theme.accent6}
            data-testid="close-icon"
          />
        </HeaderWrapper>
        <Contents>
          <SuccessIcon />
          <h3>팀원 모집 완료</h3>
          <p>
            팀원 모집이 완료되었어요!
            <br />
            지금 바로 팀원들과 프로젝트를 시작해보세요.
          </p>
        </Contents>
        <FooterWrapper>
          <Button
            type="button"
            size="small"
            color="primary"
            onClick={onClose}
          >
            확인
          </Button>
        </FooterWrapper>
      </RecruitCompleteModalBox>
    </RecruitCompleteModalWrapper>
  );
}

export default RecruitCompleteModal;

const RecruitCompleteModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.ConfirmModal};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 20px;
`;

const RecruitCompleteModalBox = styled.div<{ isVisible: boolean }>`
  width: 400px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme.background};
  border-radius: 8px;

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  `)};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  & h3 {
    color: ${({ theme }) => theme.foreground};
    margin: 0px;
  }

  & > svg {
    margin-bottom: 16px;
  }

  & > p {
    ${body1Font()}
    color: ${({ theme }) => theme.accent7};
    margin: 4px 0 0 0;
    text-align: center;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 12px 12px 16px;
  box-shadow: inset 0px 1px 0px ${({ theme }) => theme.accent2};

  & > button:first-of-type {
    margin-right: 8px;
  }
`;
