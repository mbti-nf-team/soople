import React, { ChangeEvent, ReactElement, useRef } from 'react';

import styled from '@emotion/styled';

import Button from '../common/Button';
import ProfileImage from '../common/ProfileImage';

interface Props {
  imageUrl?: string | null;
  onDelete: () => void;
  onUpload: (image: File) => void;
}

function ImageSetting({ imageUrl, onDelete, onUpload }: Props):ReactElement {
  const fileUploadInputRef = useRef<HTMLInputElement>(null);

  const handleClickSelectImage = () => fileUploadInputRef.current?.click();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    onUpload(e.target.files[0]);
  };

  return (
    <ImageSettingWrapper>
      <ProfileImage src={imageUrl} size="96px" alt="프로필 이미지" />
      <Button
        size="small"
        color="primary"
        onClick={handleClickSelectImage}
      >
        이미지 선택
      </Button>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleChangeImage}
        data-testid="upload-profile-image-input"
        accept="image/png, image/jpeg, image/jpg"
        ref={fileUploadInputRef}
      />
      <Button
        size="small"
        color="ghost"
        onClick={onDelete}
      >
        이미지 삭제
      </Button>
    </ImageSettingWrapper>
  );
}

export default ImageSetting;

const ImageSettingWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  & > img {
    margin-bottom: 16px;
  }

  & > button:first-of-type {
    margin-bottom: 4px;
  }
`;
