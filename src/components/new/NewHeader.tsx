import React, { ReactElement } from 'react';

import Link from 'next/link';

interface Props {
  onSubmit: () => void;
}

function NewHeader({ onSubmit }: Props): ReactElement {
  return (
    <div>
      <Link href="/" passHref>
        <a>{'< 팀 모집하기'}</a>
      </Link>

      <button type="button" onClick={onSubmit}>
        등록하기
      </button>
    </div>
  );
}

export default NewHeader;
