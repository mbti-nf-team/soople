import { fireEvent, render, screen } from '@testing-library/react';

import PublishModalForm from './PublishModalForm';

describe('PublishModalForm', () => {
  const handleChangeFields = jest.fn();

  const renderPublishModalForm = () => render((
    <PublishModalForm
      onChangeFields={handleChangeFields}
    />
  ));

  it('등록하기 폼 항목이 나타나야만 한다', () => {
    const labels = ['분류', '모집인원', '모집 종료 설정', '모집 종료일시'];

    renderPublishModalForm();

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
    });
  });

  describe('태그를 입력한다', () => {
    it('changeFields 이벤트가 발생해야만 한다', () => {
      renderPublishModalForm();

      const input = screen.getByPlaceholderText('태그를 입력하세요');

      fireEvent.change(input, { target: { value: 'test' } });

      fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });

      expect(handleChangeFields).toBeCalledWith({
        name: 'tags',
        value: ['javascript', 'scala', 'test'],
      });
    });
  });
});
