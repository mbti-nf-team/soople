import { useHelpers, useRemirrorContext } from '@remirror/react';
import { fireEvent, render, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import usePublishNewGroup from '@/hooks/api/group/usePublishNewGroup';
import { writeFieldsState } from '@/recoil/group/atom';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import RecoilObserver from '@/test/RecoilObserver';

import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import PublishModalContainer from './PublishModalContainer';

jest.mock('@/hooks/api/group/usePublishNewGroup');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@remirror/react', () => ({
  useRemirrorContext: jest.fn(),
  useHelpers: jest.fn(),
}));

describe('PublishModalContainer', () => {
  const mutate = jest.fn();
  const handleChangeWriteFields = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: 'user',
    }));
    (usePublishNewGroup as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useRemirrorContext as jest.Mock).mockImplementation(() => ({
      getState: jest.fn(),
    }));
    (useHelpers as jest.Mock).mockImplementation(() => ({
      getHTML: jest.fn().mockReturnValue(WRITE_FIELDS_FIXTURE.content),
    }));
  });

  const renderPublishModalContainer = () => render((
    <InjectTestingRecoilState
      publishModalVisible={given.isVisible}
      writeFields={given.writeFields}
    >
      <>
        <RecoilObserver node={writeFieldsState} onChange={handleChangeWriteFields} />
        <PublishModalContainer />
      </>
    </InjectTestingRecoilState>
  ));

  context('모달창이 보이는 경우', () => {
    const title = '제목입니다.';

    given('writeFields', () => ({
      ...WRITE_FIELDS_FIXTURE,
      title,
    }));
    given('isVisible', () => true);

    it('등록 모달에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toHaveTextContent(`${title} 등록`);
    });

    describe('닫기 버튼을 클릭한다', () => {
      it('아무것도 보이지 않아야만 한다', () => {
        const { container } = renderPublishModalContainer();

        fireEvent.click(screen.getByText('닫기'));

        expect(container).toBeEmptyDOMElement();
      });
    });

    describe('"등록하기" 버튼을 클릭한다', () => {
      it('mutate 액션이 호출되어야만 한다', () => {
        renderPublishModalContainer();

        fireEvent.click(screen.getByText('등록하기'));

        expect(mutate).toBeCalledWith({
          writeFields: {
            ...WRITE_FIELDS_FIXTURE,
            title,
          },
          profile: 'user',
        });
      });
    });

    describe('소개글을 입력한다', () => {
      const shortDescription = '소개합니다.';

      it('change 이벤트가 호출되어야만 한다', () => {
        renderPublishModalContainer();

        fireEvent.change(screen.getByLabelText('소개글'), { target: { value: shortDescription } });

        expect(handleChangeWriteFields).toBeCalledWith({
          ...WRITE_FIELDS_FIXTURE,
          title,
          shortDescription,
        });
      });
    });
  });

  context('모달창이 보이지 않는 경우', () => {
    given('writeFields', () => WRITE_FIELDS_FIXTURE);
    given('isVisible', () => false);

    it('아무것도 렌더링 되지 말아야 한다', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
