import { NextApiRequest, NextApiResponse } from 'next';

import { Category } from '@/models/group';
import { getPaginationGroups } from '@/services/api/group';

type FilterGroupsCondition = {
  category: string;
  isFilterCompleted: string;
  tag: string;
  perPage?: string;
  lastUid?: string;
};

const groupsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(404).send({
      message: 'Page not found',
    });
    return;
  }

  const {
    category, isFilterCompleted, tag, lastUid, perPage,
  } = req.query as FilterGroupsCondition;

  const groups = await getPaginationGroups({
    category: category.split(',') as Category[],
    isFilterCompleted: isFilterCompleted === 'true',
    tag,
  }, {
    lastUid,
    perPage: Number(perPage),
  });

  res.status(200).json(groups);
};

export default groupsHandler;
