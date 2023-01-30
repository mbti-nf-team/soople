import { useEffect } from 'react';
import { RefreshCw as RefreshSvg } from 'react-feather';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body2Font, h3Font } from '@/styles/fontStyles';

import Button from '../Button';

type Props = Partial<SentryFallbackRenderProps> & {
  isRootError?: boolean;
  size: 'small' | 'medium';
};

function FallbackError({ resetError, isRootError, size }: Props) {
  const { replace } = useRouter();

  useEffect(() => {
    if (isRootError) {
      replace('/500');
    }
  }, [isRootError]);

  if (isRootError) {
    return null;
  }

  return (
    <FallbackErrorBlock size={size} data-testid="fallback-error">
      <div className="error-title">목록 불러오기에 실패했어요.</div>
      <Button type="button" color="ghost" onClick={resetError} size={size}>
        <RefreshSvg width={16} height={16} style={{ marginRight: '8px' }} />
        <div>다시 시도</div>
      </Button>
    </FallbackErrorBlock>
  );
}

export default FallbackError;

const FallbackErrorBlock = styled.div<{ size: 'small' | 'medium'; }>`
  ${({ size, theme }) => size === 'medium' && css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 48px;

    & > div.error-title {
      ${h3Font(true)};
      color: ${theme.accent5};
      margin-bottom: 8px;
    }
  `}

  ${({ size, theme }) => size === 'small' && css`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > div.error-title {
      ${body2Font(true)};
      color: ${theme.accent5};
      margin-right: 8px;
    }
  `}
`;
