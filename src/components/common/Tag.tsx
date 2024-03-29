import { memo, ReactElement } from 'react';
import { X as CloseSvg } from 'react-feather';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  tag: string;
  onRemove?: () => void;
  onClick?: () => void;
}

function Tag({ tag, onRemove, onClick }: Props): ReactElement {
  const theme = useTheme();

  if (onClick) {
    return (
      <TagWrapper onClick={onClick} className="view-tag">
        {`#${tag}`}
      </TagWrapper>
    );
  }

  return (
    <TagWrapper className="write-tag">
      <span>
        {`#${tag}`}
      </span>
      <CloseIcon
        size={12}
        strokeWidth={3}
        color={theme.accent5}
        onClick={onRemove}
        data-testid="remove-icon"
      />
    </TagWrapper>
  );
}

export default memo(Tag);

const TagWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  height: 36px;
  background: ${({ theme }) => theme.accent2};
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.accent7};

  &.view-tag {
    cursor: pointer;
  }

  &.write-tag {
    margin-top: 3px;
    margin-bottom: 3px;
  }
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
  margin-left: 6px;
`;
