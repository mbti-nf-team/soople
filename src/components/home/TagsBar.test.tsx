import { fireEvent, render, screen } from '@testing-library/react';

import { groupsConditionState } from '@/recoil/group/atom';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import RecoilObserver from '@/test/RecoilObserver';

import TagsBar from './TagsBar';

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => Math.random()),
}));

describe('TagsBar', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const tags = [
    { name: 'test', count: 1 },
    { name: 'test1', count: 0 },
  ];

  const renderTagsBar = () => render((
    <InjectTestingRecoilState>
      <>
        <RecoilObserver node={groupsConditionState} onChange={handleClick} />
        <TagsBar
          isLoading={given.isLoading}
          tags={tags}
        />
      </>
    </InjectTestingRecoilState>
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderTagsBar();

      expect(screen.getByTitle('loading...')).toBeInTheDocument();
    });
  });

  context('로딩중이 아닌 경우', () => {
    it('태그들이 나타나야만 한다', () => {
      const { container } = renderTagsBar();

      tags.forEach(({ name }) => {
        expect(container).toHaveTextContent(name);
      });
    });

    describe('태그를 클릭한다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderTagsBar();

        tags.forEach(({ name }) => {
          fireEvent.click(screen.getByText(`#${name}`));

          expect(handleClick).toBeCalled();
        });
      });
    });
  });
});
