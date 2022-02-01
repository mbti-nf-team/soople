import { render } from '@testing-library/react';

import useFetchGroup from '@/hooks/api/group/useFetchGroup';

import GROUP_FIXTURE from '../../../fixtures/group';

import DetailContentsContainer from './DetailContentsContainer';

jest.mock('@/hooks/api/group/useFetchGroup');

describe('DetailContentsContainer', () => {
  beforeEach(() => {
    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: GROUP_FIXTURE,
    }));
  });

  const renderDetailContentsContainer = () => render((
    <DetailContentsContainer />
  ));

  it('해당 글의 내용이 나타나야만 한다', () => {
    const { container } = renderDetailContentsContainer();

    expect(container).toHaveTextContent('content');
  });
});
