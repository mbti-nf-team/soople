import React, { ReactElement } from 'react';

import Link from 'next/link';

interface Props {
  onSubmit: () => void;
  title: string;
}

function WriteHeader({ title, onSubmit }: Props): ReactElement {
  return (
    <div>
      <Link href="/" passHref>
        <a>{'< 팀 모집하기'}</a>
      </Link>

      <button type="button" onClick={onSubmit} disabled={!title}>
        등록하기
      </button>
    </div>
  );
}

export default WriteHeader;
