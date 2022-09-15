import { fireEvent, render, screen } from '@testing-library/react';

import useFetchTagsCount from '@/hooks/api/tagsCount/useFetchTagsCount';
import { groupsConditionState } from '@/recoil/group/atom';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import RecoilObserver from '@/test/RecoilObserver';

import TagsBar from './TagsBar';

jest.mock('@/hooks/api/tagsCount/useFetchTagsCount');

describe('TagsBar', () => {
  const handleClick = jest.fn();
  const tagName = 'javascript';

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchTagsCount as jest.Mock).mockImplementation(() => ({
      data: [{ name: tagName }],
      isError: false,
      isLoading: false,
    }));
  });

  const renderTagsBar = () => render((
    <InjectTestingRecoilState>
      <RecoilObserver node={groupsConditionState} onChange={handleClick} />
      <TagsBar />
    </InjectTestingRecoilState>
  ));

  it('태그들이 나타나야만 한다', () => {
    const { container } = renderTagsBar();

    expect(container).toHaveTextContent(tagName);
  });

  describe('태그를 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderTagsBar();

      fireEvent.click(screen.getByText(`#${tagName}`));

      expect(handleClick).toBeCalled();
    });
  });
});
