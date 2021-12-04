import React, { ReactElement } from 'react';

import Link from 'next/link';

function NewHeader(): ReactElement {
  return (
    <div>
      <Link href="/" passHref>
        <a>{'< 팀 모집하기'}</a>
      </Link>

      <button type="button">
        등록하기
      </button>
    </div>
  );
}

export default NewHeader;
