import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { Group } from '@/models/group';

import GROUP_FIXTURE from '../../../fixtures/group';

import DetailContentsContainer from './DetailContentsContainer';

describe('DetailContentsContainer', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementationOnce((selector) => selector({
      groupReducer: {
        group: {
          ...GROUP_FIXTURE,
          tags: ['javascript'],
        } as Group,
      },
    }));
  });

  const renderDetailContentsContainer = () => render((
    <DetailContentsContainer />
  ));

  it('해당 글의 내용이 나타나야만 한다', () => {
    const { container } = renderDetailContentsContainer();

    expect(container).toHaveTextContent('content');
    expect(container).toHaveTextContent('javascript');
  });
});
