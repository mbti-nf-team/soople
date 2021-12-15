export const timestampToString = (timestamp: any) => timestamp.toDate().toString();

export const formatGroup = (group: any) => {
  const { createAt } = group.data();

  return {
    ...group.data(),
    groupId: group.id,
    createAt: timestampToString(createAt),
  };
};
