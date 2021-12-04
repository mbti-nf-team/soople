import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

function NewWriteForm(): ReactElement {
  return (
    <NewWriteFormWrapper>
      <input placeholder="제목을 입력하세요" />
      <textarea rows={10} cols={20} placeholder="내용을 입력하세요" />
    </NewWriteFormWrapper>
  );
}

export default NewWriteForm;

const NewWriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
