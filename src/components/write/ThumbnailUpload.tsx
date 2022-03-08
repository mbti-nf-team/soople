/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import ReactImageUploading, { ImageListType } from 'react-images-uploading';

import styled from '@emotion/styled';
import { isEmpty } from 'ramda';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';
import { body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import Label from '../common/Label';

function ThumbnailUpload(): ReactElement {
  const { mutate } = useUploadGroupThumbnail();
  const { data: user } = useFetchUserProfile();
  const [images, setImages] = useState<ImageListType>([]);

  const handleChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  useEffect(() => {
    if (!isEmpty(images) && images[0].file) {
      mutate({ userUid: user?.uid as string, thumbnail: images[0].file });
    }
  }, [user, images]);

  return (
    <ThumbnailFromWrapper>
      <Label
        htmlFor="thumbnail"
        labelText="썸네일"
      />
      <ReactImageUploading
        acceptType={['jpg', 'gif', 'png', 'jpeg']}
        value={images}
        onChange={handleChange}
      >
        {({
          imageList,
          onImageUpload,
          isDragging,
          dragProps,
        }) => (
          <ThumbnailUploadBox
            onClick={onImageUpload}
            isDragging={isDragging}
            {...dragProps}
          >
            {isEmpty(imageList) ? (
              <>
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
              </>
            ) : (
              <>
                {imageList.map((image) => (
                  <ThumbnailImage key={image.file?.name} src={image.dataURL} alt="thumbnail" />
                ))}
              </>
            )}
          </ThumbnailUploadBox>
        )}
      </ReactImageUploading>
    </ThumbnailFromWrapper>
  );
}

export default ThumbnailUpload;

const ThumbnailFromWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ThumbnailUploadBox = styled.div<{ isDragging: boolean; }>`
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 144px;
  background-color: ${({ isDragging }) => isDragging && palette.accent1};
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

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
`;
