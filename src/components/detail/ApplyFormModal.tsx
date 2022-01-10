import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import FormModal from '@/components/common/FormModal';
import Textarea from '@/components/common/Textarea';
import { ApplicantForm } from '@/models/group';
import { stringToExcludeNull } from '@/utils/utils';

interface Props {
  isVisible: boolean;
  initPortfolioUrl?: string | null;
  onClose: () => void;
  onSubmit: (applyFields: ApplicantForm) => void;
}

const validationSchema = yup.object({
  introduce: yup.string().required('소개글을 입력해주세요.'),
  portfolioUrl: yup.string().notRequired().nullable(),
}).required();

function ApplyFormModal({
  isVisible, onClose, onSubmit, initPortfolioUrl,
}: Props): ReactElement {
  const {
    register, handleSubmit, formState: { errors }, clearErrors, reset,
  } = useForm<ApplicantForm>({
    resolver: yupResolver(validationSchema),
  });

  const handleClose = () => {
    onClose();
    clearErrors('introduce');
    reset();
  };

  return (
    <FormModal
      isVisible={isVisible}
      title="신청"
      confirmText="신청하기"
      confirmButtonColor="success"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ContentsFormWrapper>
        <div>
          <label htmlFor="portfolioUrl">
            포트폴리오 (선택)
            <input id="portfolioUrl" defaultValue={stringToExcludeNull(initPortfolioUrl)} type="text" placeholder="URL을 입력하세요" {...register('portfolioUrl')} />
          </label>
        </div>

        <div>
          <label htmlFor="introduce">
            소개글
            <Textarea isError={!!errors.introduce} placeholder="간단한 소개글을 입력하세요" {...register('introduce')} />
          </label>
          <div>{errors.introduce?.message}</div>
        </div>
      </ContentsFormWrapper>
    </FormModal>
  );
}

export default ApplyFormModal;

const ContentsFormWrapper = styled.div`
  margin: 20px 24px;
`;
