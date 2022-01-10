export const timestampToString = (timestamp: any) => timestamp.toDate().toString();

export const formatGroup = (group: any) => {
  const { createdAt } = group.data();

  return {
    ...group.data(),
    groupId: group.id,
    createdAt: timestampToString(createdAt),
  };
};

export const formatComment = (comment: any) => {
  const { createdAt } = comment.data();

  return {
    ...comment.data(),
    commentId: comment.id,
    createdAt: timestampToString(createdAt),
  };
};

export const formatApplicant = (applicant: any) => {
  const { createdAt } = applicant.data();

  return {
    ...applicant.data(),
    uid: applicant.id,
    createdAt: timestampToString(createdAt),
  };
};
