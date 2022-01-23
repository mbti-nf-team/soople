import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import FormModal from '@/components/common/FormModal';
import Textarea from '@/components/common/Textarea';
import { ApplicantForm } from '@/models/group';
import { subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import { stringToExcludeNull } from '@/utils/utils';

import Input from '../common/Input';

interface Props {
  isVisible: boolean;
  initPortfolioUrl?: string | null;
  onClose: () => void;
  onSubmit: (applyFields: ApplicantForm) => void;
}

const validationSchema = yup.object({
  introduce: yup.string().trim().required('소개글을 입력해주세요.'),
  portfolioUrl: yup.string().notRequired().nullable(),
}).required();

function ApplyFormModal({
  isVisible, onClose, onSubmit, initPortfolioUrl,
}: Props): ReactElement {
  const {
    register, handleSubmit, formState: { errors }, clearErrors, reset, resetField,
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
        <Input
          labelText="포트폴리오"
          id="portfolioUrl"
          defaultValue={stringToExcludeNull(initPortfolioUrl)}
          type="text"
          placeholder="URL을 입력하세요"
          labelOptionText="선택"
          register={register('portfolioUrl')}
          onClear={() => resetField('portfolioUrl')}
        />

        <div>
          <label htmlFor="introduce">
            <span>
              소개글
            </span>
            <Textarea
              id="introduce"
              isError={!!errors.introduce}
              placeholder="간단한 소개글을 입력하세요"
              height="128px"
              {...register('introduce')}
            />
          </label>
          <IntroduceErrorBlock>{errors.introduce?.message}</IntroduceErrorBlock>
        </div>
      </ContentsFormWrapper>
    </FormModal>
  );
}

export default ApplyFormModal;

const ContentsFormWrapper = styled.div`
  margin: 0 24px 32px 24px;

  & > :not(div:first-of-type) {
    margin-top: 20px;
  }

`;

const IntroduceErrorBlock = styled.div`
  ${subtitle1Font()};
  color: ${palette.warning};
  margin-top: 6px;
  margin-left: 4px;
`;
