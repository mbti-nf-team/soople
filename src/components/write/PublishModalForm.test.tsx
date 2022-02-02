import { fireEvent, render, screen } from '@testing-library/react';

import { WriteFields } from '@/models/group';

import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import PublishModalForm from './PublishModalForm';

describe('PublishModalForm', () => {
  const handleChangeFields = jest.fn();

  beforeEach(() => {
    handleChangeFields.mockClear();
  });

  const renderPublishModalForm = (fields: WriteFields) => render((
    <PublishModalForm
      fields={fields}
      onChangeFields={handleChangeFields}
    />
  ));

  it('등록하기 폼 항목이 나타나야만 한다', () => {
    const labels = ['분류', '모집 종료 설정', '모집 종료일시'];

    renderPublishModalForm(WRITE_FIELDS_FIXTURE);

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
    });
  });

  describe('분류를 선택한다', () => {
    it('changeFields 이벤트가 발생해야만 한다', () => {
      renderPublishModalForm(WRITE_FIELDS_FIXTURE);

      fireEvent.change(screen.getByDisplayValue('분류를 선택해주세요.'), {
        target: { value: 'study' },
      });

      expect(handleChangeFields).toBeCalledWith({ category: 'study' });
    });
  });

  describe('모집 종료 설정에 따라 모집 종료일시 상태가 변경된다', () => {
    context('모집 종료 설정이 "입력한 시간에 자동으로 종료"인 경우', () => {
      it('모집 종료일시는 "disabled" 속성이 없어야만 한다', () => {
        renderPublishModalForm(WRITE_FIELDS_FIXTURE);

        expect(screen.getByLabelText('모집 종료일시')).not.toHaveAttribute('disabled');
      });
    });

    context('모집 종료 설정이 "수동으로 종료"인 경우', () => {
      it('모집 종료일시는 "disabled" 속성이 있어야하고, changeFields 이벤트가 발생해야만 한다', () => {
        renderPublishModalForm({
          ...WRITE_FIELDS_FIXTURE,
          recruitmentEndSetting: 'manual',
        });

        expect(screen.getByLabelText('모집 종료일시')).toHaveAttribute('disabled');
        expect(handleChangeFields).toBeCalledWith({ recruitmentEndDate: '' });
      });
    });
  });
});
