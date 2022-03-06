import React, { ReactElement } from 'react';
import { PlusCircle } from 'react-feather';

import styled from '@emotion/styled';

import { body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import Label from '../common/Label';

function ThumbnailUpload(): ReactElement {
  return (
    <ThumbnailFromWrapper>
      <Label
        htmlFor="thumbnail"
        labelText="썸네일"
      />
      <ThumbnailUploadBox>
        <PlusCircle
          fill={palette.accent6}
          color={palette.background}
          width={40}
          height={40}
        />
        <div>
          썸네일 등록하기
        </div>
        <div>
          JPG, JPEG, PNG, GIF
        </div>
      </ThumbnailUploadBox>
    </ThumbnailFromWrapper>
  );
}

export default ThumbnailUpload;

const ThumbnailFromWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ThumbnailUploadBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 144px;
  border: 1px solid ${palette.accent2};
  box-sizing: border-box;
  border-radius: 8px;

  & > div:first-of-type {
    ${body2Font(true)}
    color: ${palette.accent6};
  }

  & > div:last-of-type {
    ${subtitle1Font()}
    color: ${palette.accent4};
  }
`;
