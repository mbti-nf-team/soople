import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import FormModal from '@/components/common/FormModal';
import Textarea from '@/components/common/Textarea';
import { ApplicantForm } from '@/models/group';
import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import { stringToExcludeNull } from '@/utils/utils';

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
            <span>
              포트폴리오&nbsp;
              <span className="option-span">(선택)</span>
            </span>
            <PortfolioUrlInput id="portfolioUrl" defaultValue={stringToExcludeNull(initPortfolioUrl)} type="text" placeholder="URL을 입력하세요" {...register('portfolioUrl')} />
          </label>
        </div>

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

  & > div > label > span {
    display: inline-flex;
    ${body2Font(true)};
    color: ${palette.accent6};
    margin: 20px 0px 6px 4px;
  }

  .option-span {
    ${body2Font()};
    color: ${palette.accent4};
  }
`;

const PortfolioUrlInput = styled.input`
  ${body1Font()};
  width: 100%;
  outline: none;
  border: 1px solid ${palette.accent2};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 11px 16px;

  &::placeholder {
    color: ${palette.accent4};
  }

  &:focus {
    border: 1px solid ${palette.success};
  }

  transition: border .3s;
`;

const IntroduceErrorBlock = styled.div`
  ${subtitle1Font()};
  color: ${palette.warning};
  margin-top: 6px;
  margin-left: 4px;
`;
