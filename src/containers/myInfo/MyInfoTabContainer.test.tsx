import { render } from '@testing-library/react';

import InjectMockProviders from '@/test/InjectMockProviders';

import MyInfoTabContainer from './MyInfoTabContainer';

describe('MyInfoTabContainer', () => {
  const renderMyInfoTabContainer = () => render((
    <InjectMockProviders>
      <MyInfoTabContainer activeTab="setting" />
    </InjectMockProviders>
  ));

  it('내 정보 탭에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderMyInfoTabContainer();

    expect(container).toHaveTextContent('내 정보 수정');
  });
});
