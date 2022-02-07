import { render } from '@testing-library/react';

import MyInfoTabContainer from './MyInfoTabContainer';

describe('MyInfoTabContainer', () => {
  const renderMyInfoTabContainer = () => render((
    <MyInfoTabContainer activeTab="setting" />
  ));

  it('내 정보 탭에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderMyInfoTabContainer();

    expect(container).toHaveTextContent('내 정보 수정');
  });
});
