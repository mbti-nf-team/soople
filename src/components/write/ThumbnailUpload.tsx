/* eslint-disable react/jsx-props-no-spreading */
import React, {
  MouseEvent, ReactElement, useCallback, useEffect, useState,
} from 'react';
import { PlusCircle, X as CloseSvg } from 'react-feather';
import ReactImageUploading, { ImageListType } from 'react-images-uploading';

import styled from '@emotion/styled';
import { isEmpty } from 'ramda';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useRemoveGroupThumbnail from '@/hooks/api/storage/useRemoveGroupThumbnail';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';
import { body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import Label from '../common/Label';

function ThumbnailUpload(): ReactElement {
  const { mutate: onUploadThumbnail, data: thumbnailUrl } = useUploadGroupThumbnail();
  const { mutate: onRemoveThumbnail } = useRemoveGroupThumbnail();
  const { data: user } = useFetchUserProfile();
  const [images, setImages] = useState<ImageListType>([]);

  const handleChange = (imageList: ImageListType) => setImages(imageList);

  const handleRemoveThumbnail = useCallback((
    e: MouseEvent<SVGElement>,
    onImageRemove: () =>void,
  ) => {
    e.stopPropagation();

    if (thumbnailUrl) {
      onRemoveThumbnail(thumbnailUrl);
    }

    onImageRemove();
  }, [thumbnailUrl, onRemoveThumbnail]);

  useEffect(() => {
    if (!isEmpty(images) && images[0].file) {
      onUploadThumbnail({ userUid: user?.uid as string, thumbnail: images[0].file });
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
        inputProps={{ alt: 'upload-thumbnail-input' }}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          dragProps,
        }) => (
          <ThumbnailUploadBox
            onClick={onImageUpload}
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
                {imageList.map((image, index) => (
                  <ThumbnailImageWrapper key={image.file?.name}>
                    <CloseIcon
                      width={16}
                      height={16}
                      color={palette.accent7}
                      onClick={(e) => handleRemoveThumbnail(e, () => onImageRemove(index))}
                      data-testid="close-icon"
                    />
                    <ThumbnailImage src={image.dataURL} alt="thumbnail" />
                  </ThumbnailImageWrapper>
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

const ThumbnailUploadBox = styled.div`
  cursor: pointer;
  overflow: hidden;
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

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ThumbnailImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
`;
