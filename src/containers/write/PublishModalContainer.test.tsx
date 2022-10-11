import { useRouter } from 'next/router';

import { useHelpers, useRemirrorContext } from '@remirror/react';
import { act, fireEvent, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useEditGroup from '@/hooks/api/group/useEditGroup';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import usePublishNewGroup from '@/hooks/api/group/usePublishNewGroup';
import useUploadStorageFile from '@/hooks/api/storage/useUploadStorageFile';
import useGroupRecruitmentStatus from '@/hooks/useGroupRecruitmentStatus';
import { writeFieldsState } from '@/recoil/group/atom';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import RecoilObserver from '@/test/RecoilObserver';
import renderWithPortal from '@/test/renderWithPortal';

import FIXTURE_GROUP from '../../../fixtures/group';
import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import PublishModalContainer from './PublishModalContainer';

jest.mock('@/hooks/api/group/usePublishNewGroup');
jest.mock('@/hooks/api/group/useFetchGroup');
jest.mock('@/hooks/api/group/useEditGroup');
jest.mock('@/hooks/useGroupRecruitmentStatus');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/storage/useUploadStorageFile');
jest.mock('@remirror/react', () => ({
  useRemirrorContext: jest.fn(),
  useHelpers: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('PublishModalContainer', () => {
  const mutate = jest.fn();
  const handleChangeWriteFields = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      query: given.query,
    }));
    (useGroupRecruitmentStatus as jest.Mock).mockImplementation(() => given.recruitmentStatus);
    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_GROUP,
    }));
    (useEditGroup as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
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
    (useUploadStorageFile as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
  });

  const renderPublishModalContainer = () => renderWithPortal((
    <ReactQueryWrapper>
      <InjectTestingRecoilState
        publishModalVisible={given.isVisible}
        writeFields={given.writeFields}
      >
        <>
          <RecoilObserver node={writeFieldsState} onChange={handleChangeWriteFields} />
          <PublishModalContainer />
        </>
      </InjectTestingRecoilState>
    </ReactQueryWrapper>
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
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.clearAllTimers();
      });

      it('아무것도 보이지 않아야만 한다', () => {
        const { container } = renderPublishModalContainer();

        fireEvent.click(screen.getByText('닫기'));

        act(() => {
          jest.advanceTimersByTime(400);
        });

        expect(container).toBeEmptyDOMElement();
      });
    });

    describe('submit 버튼을 클릭한다', () => {
      context('router.query가 존재하지 않는 경우', () => {
        given('query', () => ({
          id: null,
        }));

        context('값 검증에 실패한 경우', () => {
          it('등록 mutate 액션 호출되지 않아야만 한다', () => {
            renderPublishModalContainer();

            fireEvent.click(screen.getByText('등록하기'));

            expect(mutate).not.toBeCalled();
          });
        });

        context('값 검증에 성공한 경우', () => {
          const writeFields = {
            title,
            content: '',
            tags: [],
            category: 'study',
            recruitmentEndDate: '',
            recruitmentEndSetting: 'manual',
            shortDescription: '',
            thumbnail: '',
          };

          given('writeFields', () => writeFields);

          it('등록 mutate 액션이 호출되어야만 한다', () => {
            renderPublishModalContainer();

            fireEvent.click(screen.getByText('등록하기'));

            expect(mutate).toBeCalledWith({
              writeFields,
              profile: 'user',
            });
          });
        });
      });

      context('router.query가 존재하는 경우', () => {
        given('query', () => ({
          id: 'id',
        }));
        given('recruitmentStatus', () => ('automaticBeforeCompletedRecruitment'));

        context('값 검증에 실패한 경우', () => {
          it('수정 mutate 액션 호출되지 않아야만 한다', () => {
            renderPublishModalContainer();

            fireEvent.click(screen.getByText('저장하기'));

            expect(mutate).not.toBeCalled();
          });
        });

        context('값 검증에 성공한 경우', () => {
          const writeFields = {
            title,
            content: '',
            tags: ['test'],
            category: 'study',
            recruitmentEndDate: '',
            recruitmentEndSetting: 'manual',
            shortDescription: '',
            thumbnail: '',
          };

          given('writeFields', () => writeFields);

          it('수정 mutate 액션이 호출되어야만 한다', () => {
            renderPublishModalContainer();

            fireEvent.click(screen.getByText('저장하기'));

            expect(mutate).toBeCalledWith({
              writeFields,
              deleteTags: ['test'],
              groupId: FIXTURE_GROUP.groupId,
            });
          });
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
