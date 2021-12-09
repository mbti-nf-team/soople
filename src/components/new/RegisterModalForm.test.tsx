import { render, screen } from '@testing-library/react';

import RegisterModalForm from './RegisterModalForm';

describe('RegisterModalForm', () => {
  const renderRegisterModalForm = () => render((
    <RegisterModalForm />
  ));

  it('등록하기 폼 항목이 나타나야만 한다', () => {
    const labels = ['분류', '모집인원', '모집 종료 설정', '모집 종료일시', '태그'];

    renderRegisterModalForm();

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
    });
  });
});
