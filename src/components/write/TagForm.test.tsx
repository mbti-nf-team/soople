import { fireEvent, render, screen } from '@testing-library/react';

import TagsForm from './TagForm';

describe('TagsForm', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderTagsForm = (tags: string[]) => render((
    <TagsForm
      tags={tags}
      onChange={handleChange}
    />
  ));

  describe('태그의 유무에 따라 인풋창의 스타일이 변경된다', () => {
    context('태그가 존재하지 않는 경우', () => {
      const height = '28px';

      it(`인풋창의 "height"가 ${height}이어야 한다`, () => {
        renderTagsForm([]);

        expect(screen.getByPlaceholderText('태그를 입력하세요')).toHaveStyle({
          height,
        });
      });
    });

    context('태그가 존재하는 경우', () => {
      const height = '32px';

      it(`인풋창의 "height"가 ${height}이어야 한다`, () => {
        renderTagsForm(['test']);

        expect(screen.getByPlaceholderText('태그를 입력하세요')).toHaveStyle({
          height,
        });
      });
    });
  });

  describe('태그를 입력한다', () => {
    context('태그 인풋창에서 "Enter" 키를 눌렀을 경우', () => {
      context('인풋창에 값이 존재한 경우', () => {
        const tags = ['JavaScript', 'React'];

        it('change 이벤트가 발생해야만 한다', () => {
          renderTagsForm(['CSS']);

          const input = screen.getByPlaceholderText('태그를 입력하세요');

          tags.forEach((tag) => {
            fireEvent.change(input, { target: { value: tag } });

            fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

            expect(input).toHaveValue('');
          });

          expect(handleChange).toHaveBeenCalledTimes(2);
        });
      });

      context('태그 인풋창에 값이 존재하지 않는 경우', () => {
        const tags: string[] = [];

        it('change 이벤트가 발생하지 않아야 한다', () => {
          renderTagsForm(tags);

          const input = screen.getByPlaceholderText('태그를 입력하세요');

          fireEvent.change(input, { target: { value: '' } });

          fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

          expect(handleChange).not.toHaveBeenCalled();
        });
      });

      context('태그 리스트에 이미 입력한 태그가 존재하는 경우', () => {
        const tags = ['JavaScript', 'React'];

        it('change 이벤트가 발생하지 않아야 한다', () => {
          renderTagsForm(tags);

          const input = screen.getByPlaceholderText('태그를 입력하세요');

          tags.forEach((tag) => {
            fireEvent.change(input, { target: { value: tag } });

            fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

            expect(input).toHaveValue('');

            expect(handleChange).not.toHaveBeenCalled();
          });
        });
      });
    });

    context('","키를 눌렀을 경우', () => {
      const tags = ['JavaScript', 'React'];

      it('chang 이벤트가 호출되어야만 한다', () => {
        renderTagsForm(['CSS']);

        const input = screen.getByPlaceholderText('태그를 입력하세요');

        tags.forEach((tag) => {
          fireEvent.change(input, { target: { value: tag } });

          fireEvent.keyDown(input, { key: ',', code: 188, charCode: 188 });
        });

        expect(handleChange).toHaveBeenCalled();
      });
    });

    context('"Enter"키나 ","키 이외의 키를 눌렀을 경우', () => {
      const tags = ['JavaScript', 'React'];

      it('chang 이벤트가 호출되지 않아야 한다', () => {
        renderTagsForm(['CSS']);

        const input = screen.getByPlaceholderText('태그를 입력하세요');

        tags.forEach((tag) => {
          fireEvent.change(input, { target: { value: tag } });

          fireEvent.keyDown(input, { key: 'spacebar', code: 33, charCode: 33 });

          expect(input).toHaveValue(tag);
        });

        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    context('인풋 값이 존재하지 않는 상태로 "Backspace"키를 클릭한 경우', () => {
      it('바로 이전에 존재하는 태그가 삭제되어야만 한다', () => {
        const { container } = renderTagsForm(['JavaScript', 'CSS']);

        const input = screen.getByPlaceholderText('태그를 입력하세요');

        expect(container).toHaveTextContent('CSS');

        fireEvent.change(input, { target: { value: '' } });

        fireEvent.keyDown(input, { key: 'Backspace', code: 8, charCode: 8 });

        expect(container).not.toHaveTextContent('CSS');
      });
    });
  });

  describe('입력된 태그의 "x" 아이콘을 클릭하여 삭제한다', () => {
    const tags = ['JavaScript'];

    it('태그가 삭제되어야만 한다', () => {
      const { container } = renderTagsForm(tags);

      fireEvent.click(screen.getByTestId('remove-icon'));

      expect(container).not.toHaveTextContent('#JavaScript');

      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });
});
