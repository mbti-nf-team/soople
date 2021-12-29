import React, { ReactElement } from 'react';
import { X as CloseSvg } from 'react-feather';

import styled from '@emotion/styled';

import palette from '@/styles/palette';

interface Props {
  tag: string;
  onRemove?: () => void;
}

function Tag({ tag, onRemove }: Props): ReactElement {
  if (!onRemove) {
    return (
      <TagWrapper>
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
        color={palette.accent5}
        onClick={onRemove}
        data-testid="remove-icon"
      />
    </TagWrapper>
  );
}

export default Tag;

const TagWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  height: 36px;
  background: ${palette.accent2};
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: ${palette.accent7};

  &.write-tag {
    margin-top: 3px;
    margin-bottom: 3px;
  }
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
  margin-left: 6px;
`;
