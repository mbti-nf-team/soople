import { render } from '@testing-library/react';

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
    GetLayout(<MockComponent />)
  ));

  it('MyInfo 레이아웃에 대한 내용이 보여야만 한다', () => {
    const { container } = renderMyInfoLayout();

    expect(container).toHaveTextContent('Test');
  });
});
