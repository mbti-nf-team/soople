import React, {
  ChangeEvent, FormEvent, memo, useEffect, useState,
} from 'react';
import { Info as InfoIcon } from 'react-feather';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import useResponsive from '@/hooks/useResponsive';
import { CompletedGroupForm } from '@/models/group';
import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import mq from '@/styles/responsive';
import { defaultToast } from '@/utils/toast';

import FormModal from '../common/FormModal';
import Textarea from '../common/Textarea';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (completedGroupForm: CompletedGroupForm) => void;
  numberApplicant: number;
  timeRemaining: string | null;
}

function CompleteApplyFormModal({
  numberApplicant, isVisible, onClose, onSubmit, timeRemaining,
}: Props) {
  const theme = useTheme();
  const { isClient, isMobile } = useResponsive();
  const [message, setMessage] = useState<string>('');

  const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

  const isClientDesktop = isClient && !isMobile;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      numberConfirmApplicants: numberApplicant,
      message,
    });
  };

  useEffect(() => {
    if (timeRemaining && isMobile && isVisible) {
      defaultToast(`아직 모집 마감시간이 ${timeRemaining} 남아있어요.`, {
        position: 'bottom-center',
        style: {
          margin: '0 20px 8px 20px',
        },
      });
    }
  }, [timeRemaining, isMobile, isVisible]);

  return (
    <FormModal
      isVisible={isVisible}
      title="모집 완료"
      confirmButtonColor="success"
      confirmText="완료하기"
      onClose={onClose}
      onSubmit={handleSubmit}
      size="540px"
    >
      <FormContentsWrapper>
        {timeRemaining && isClientDesktop && (
          <WarningRemainBlock>
            <StyledInfoIcon width="16px" height="16px" color={theme.background} fill={theme.accent6} />
            <span>{`아직 모집 마감시간이 ${timeRemaining} 남아있어요.`}</span>
          </WarningRemainBlock>
        )}
        <DescribeMessage>
          {`모집을 완료하고 선택한 ${numberApplicant}명과 함께 팀을 만드시겠어요?`}
          <br />
          모집을 완료하시면 다시 되돌릴 수 없어요.
        </DescribeMessage>
        <MessageInputWrapper>
          <Textarea
            labelText="메시지"
            labelOptionText="선택"
            id="message"
            placeholder="메시지를 입력하세요"
            onChange={onChangeMessage}
            value={message}
            height="100px"
          />
          <small>
            팀 멤버들과 함께 대화할 오픈 채팅방 URL을 메시지로 보내보세요.&nbsp;
            {isClientDesktop && (
              <br />
            )}
            메시지는 멤버들에게만 공개돼요.
          </small>
        </MessageInputWrapper>
      </FormContentsWrapper>
    </FormModal>
  );
}

export default memo(CompleteApplyFormModal);

const StyledInfoIcon = styled(InfoIcon)`
  min-width: 16px;
  min-height: 16px;

  circle {
    stroke: ${({ theme }) => theme.accent6};
  }
`;

const FormContentsWrapper = styled.div`
  ${mq({
    margin: ['0 20px', '0 24px'],
  })};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DescribeMessage = styled.div`
  ${body1Font()};
  word-break: keep-all;
`;

const MessageInputWrapper = styled.div`
  ${mq({
    marginTop: ['24px', '20px'],
  })};

  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;

  & > label {
    ${body2Font(true)}
    color: ${({ theme }) => theme.accent6};
    margin-left: 3px;
    margin-bottom: 6px;

    & > span {
      ${body2Font()}
      color: ${({ theme }) => theme.accent4};
      margin-left: 4px;
    }
  }

  & > small {
    ${subtitle1Font()}
    color: ${({ theme }) => theme.accent5};
    margin-left: 3px;
    margin-top: 6px;
  }
`;

const WarningRemainBlock = styled.div`
  background-color: ${({ theme }) => theme.accent1};
  border-radius: 8px;
  padding: 9px 12px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 12px;

  & > span {
    ${subtitle1Font(true)}
    margin-left: 8px;
  }
`;
