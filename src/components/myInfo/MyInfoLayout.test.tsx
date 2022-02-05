import { render } from '@testing-library/react';

import InjectMockProviders from '@/test/InjectMockProviders';

import getMyInfoLayout from './MyInfoLayout';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: '/',
  })),
}));

describe('MyInfoLayout', () => {
  const GetLayout = getMyInfoLayout('setting');
  function MockComponent(): JSX.Element {
    return <>Test</>;
  }

  const renderMyInfoLayout = () => render((
    <InjectMockProviders>
      {GetLayout(<MockComponent />)}
    </InjectMockProviders>
  ));

  it('MyInfo 레이아웃에 대한 내용이 보여야만 한다', () => {
    const { container } = renderMyInfoLayout();

    expect(container).toHaveTextContent('Test');
  });
});
