import React, {
  ChangeEvent, memo, ReactElement, useRef,
} from 'react';

import styled from '@emotion/styled';

import { errorToast } from '@/utils/toast';

import Button from '../common/Button';
import ProfileImage from '../common/ProfileImage';

interface Props {
  imageUrl?: string | null;
  onDelete: () => void;
  onUpload: (image: File) => void;
}

const IMAGE_MAX_SIZE = 5242880;

function ImageSetting({ imageUrl, onDelete, onUpload }: Props):ReactElement {
  const fileUploadInputRef = useRef<HTMLInputElement>(null);

  const handleClickSelectImage = () => fileUploadInputRef.current?.click();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    if (e.target.files[0].size > IMAGE_MAX_SIZE) {
      errorToast('이미지 업로드 최대 사이즈는 5MB입니다.');
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
        accept="image/png, image/jpeg, image/jpg, image/gif"
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

export default memo(ImageSetting);

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
