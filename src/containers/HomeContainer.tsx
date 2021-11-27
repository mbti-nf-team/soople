import React, { ReactElement } from 'react';

import Link from 'next/link';

function Home(): ReactElement {
  return (
    <div>
      홈!
      <Link href="/signin">
        로그인
      </Link>
    </div>
  );
}

export default Home;
