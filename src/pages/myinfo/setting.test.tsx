import { render } from '@testing-library/react';

import SettingPage from './setting.page';

describe('SettingPage', () => {
  const renderSettingPage = () => render((
    <SettingPage />
  ));

  it('내 정보 수정 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderSettingPage();

    expect(container).toHaveTextContent('내 정보 수정');
  });
});
