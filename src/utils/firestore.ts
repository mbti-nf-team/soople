export const timestampToString = (timestamp: any) => timestamp.toDate().toString();

export const formatGroup = (group: any) => {
  const { createAt } = group.data();

  return {
    ...group.data(),
    groupId: group.id,
    createAt: timestampToString(createAt),
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
