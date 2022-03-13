import { fireEvent, render, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';
import { WriteFields } from '@/models/group';
import palette from '@/styles/palette';
import InjectMockProviders from '@/test/InjectMockProviders';

import FIXTURE_PROFILE from '../../../fixtures/profile';
import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import PublishModalForm from './PublishModalForm';

jest.mock('@/hooks/api/storage/useUploadGroupThumbnail');
jest.mock('@/hooks/api/auth/useFetchUserProfile');

describe('PublishModalForm', () => {
  const handleChangeFields = jest.fn();
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
    (useUploadGroupThumbnail as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
  });

  const renderPublishModalForm = (fields: WriteFields) => render((
    <InjectMockProviders>
      <PublishModalForm
        isEdit={given.isEdit}
        isRecruiting
        isVisible={given.isVisible}
        onClose={handleClose}
        onSubmit={handleSubmit}
        fields={fields}
        onChangeFields={handleChangeFields}
      />
    </InjectMockProviders>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('isEdit에 따라서 모달 버튼이 다르게 나타난다', () => {
      context('isEdit이 true인 경우', () => {
        given('isEdit', () => true);

        it('"저장하기"가 보여야만 한다', () => {
          const { container } = renderPublishModalForm(WRITE_FIELDS_FIXTURE);

          expect(container).toHaveTextContent('저장하기');
        });
      });

      context('isEdit이 false인 경우', () => {
        given('isEdit', () => false);

        it('"등록하기"가 보여야만 한다', () => {
          const { container } = renderPublishModalForm(WRITE_FIELDS_FIXTURE);

          expect(container).toHaveTextContent('등록하기');
        });
      });
    });

    it('모달 타이틀이 나타나야만 한다', () => {
      const title = '제목입니다';

      const { container } = renderPublishModalForm({
        ...WRITE_FIELDS_FIXTURE,
        category: 'study',
        title,
      });

      expect(container).toHaveTextContent(`${title} 등록`);
    });

    it('등록하기 폼 항목이 나타나야만 한다', () => {
      const labels = ['분류', '모집 종료 설정', '모집 마감일시', '소개글'];

      renderPublishModalForm(WRITE_FIELDS_FIXTURE);

      labels.forEach((label) => {
        expect(screen.getByLabelText(label)).not.toBeNull();
      });
    });

    describe('분류를 선택한다', () => {
      it('changeFields 이벤트가 발생해야만 한다', () => {
        renderPublishModalForm(WRITE_FIELDS_FIXTURE);

        const input = screen.getAllByRole('combobox')[0];

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
        fireEvent.keyDown(input, { key: 'Enter', code: 13 });

        expect(handleChangeFields).toBeCalledWith({ category: 'study' });
      });
    });

    describe('소개글을 입력한다', () => {
      context('소개글이 100자 이하인 경우', () => {
        const shortDescription = '소개합니다.';

        it('changeFields 이벤트가 발생해야만 한다', () => {
          renderPublishModalForm(WRITE_FIELDS_FIXTURE);

          fireEvent.change(screen.getByLabelText('소개글'), { target: { value: shortDescription } });

          expect(handleChangeFields).toBeCalledWith({ shortDescription });
        });
      });

      context('소개글이 100자 이상인 경우', () => {
        const shortDescription = '소개합니다.'.repeat(50);

        it('100자로 잘린 소개글이 changeFields 이벤트가 발생해야만 한다', () => {
          renderPublishModalForm(WRITE_FIELDS_FIXTURE);

          fireEvent.change(screen.getByLabelText('소개글'), { target: { value: shortDescription } });

          expect(handleChangeFields).toBeCalledWith({ shortDescription: '소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니' });
        });

        it(`폰트 색상이 ${palette.warning}이어야만 한다`, () => {
          renderPublishModalForm({
            ...WRITE_FIELDS_FIXTURE,
            shortDescription: '소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니다.소개합니',
          });

          expect(screen.getByTestId('short-description-length')).toHaveStyle({
            color: palette.warning,
          });
        });
      });
    });

    describe('모집 마감일시를 입력한다', () => {
      const recruitmentEndDate = '2021-11-11';

      it('changeFields 이벤트가 발생해야만 한다', () => {
        renderPublishModalForm({
          ...WRITE_FIELDS_FIXTURE,
          recruitmentEndSetting: 'automatic',
          recruitmentEndDate: '2022-11-11',
        });

        fireEvent.change(screen.getByPlaceholderText('모집 마감일시를 입력하세요'), { target: { value: recruitmentEndDate } });

        expect(handleChangeFields).toBeCalledWith({ recruitmentEndDate: '' });
      });
    });

    context('모집 종료 설정을 선택한다', () => {
      it('changeFields 이벤트가 발생해야만 한다', () => {
        renderPublishModalForm(WRITE_FIELDS_FIXTURE);

        const input = screen.getAllByRole('combobox')[1];

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
        fireEvent.click(screen.getByText('수동으로 마감'));

        expect(handleChangeFields).toBeCalledWith({ recruitmentEndSetting: 'manual' });
      });
    });

    describe('모집 종료 설정에 따라 모집 종료일시 상태가 변경된다', () => {
      context('모집 종료 설정이 "입력한 시간에 자동으로 종료"인 경우', () => {
        it('모집 마감일시는 "disabled" 속성이 없어야만 한다', () => {
          renderPublishModalForm(WRITE_FIELDS_FIXTURE);

          expect(screen.getByLabelText('모집 마감일시')).not.toHaveAttribute('disabled');
        });
      });

      context('모집 종료 설정이 "수동으로 종료"인 경우', () => {
        it('모집 마감일시는 "disabled" 속성이 있어야하고, changeFields 이벤트가 발생해야만 한다', () => {
          renderPublishModalForm({
            ...WRITE_FIELDS_FIXTURE,
            recruitmentEndSetting: 'manual',
          });

          expect(screen.getByLabelText('모집 마감일시')).toHaveAttribute('disabled');
          expect(handleChangeFields).toBeCalledWith({ recruitmentEndDate: '' });
        });
      });
    });

    describe('닫기 버튼을 누른다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderPublishModalForm(WRITE_FIELDS_FIXTURE);

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toBeCalled();
      });
    });

    describe('"등록하기" 버튼을 누른다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderPublishModalForm(WRITE_FIELDS_FIXTURE);

        fireEvent.click(screen.getByText('등록하기'));

        expect(handleSubmit).toBeCalled();
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 렌더링되지 않아야 한다', () => {
      const { container } = renderPublishModalForm(WRITE_FIELDS_FIXTURE);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
