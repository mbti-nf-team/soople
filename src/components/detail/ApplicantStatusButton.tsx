import React, { ReactElement } from 'react';

import Button from '../common/Button';

interface Props {
  isCompleted: boolean;
}

function ApplicantStatusButton({ isCompleted }: Props): ReactElement {
  if (isCompleted) {
    return (
      <Button color="primary">
        팀원 보기
      </Button>
    );
  }

  return (
    <Button color="success">
      신청하기
    </Button>
  );
}

export default ApplicantStatusButton;
