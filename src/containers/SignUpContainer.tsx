import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { getAuth } from '@/utils/utils';

function SingUp(): ReactElement {
  const auth = useSelector(getAuth('auth'));

  return (
    <div>
      {auth}
    </div>
  );
}

export default SingUp;
