import { NextApiRequest, NextApiResponse } from 'next';

import { Category } from '@/models/group';
import { getFilteredGroups } from '@/services/api/group';

type FilterGroupsCondition = {
  category: string;
  isFilterCompleted: string;
  tag: string;
}

const groupsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(404).send({
      message: 'Page not found',
    });
    return;
  }

  const { category, isFilterCompleted, tag } = req.query as FilterGroupsCondition;

  const data = await getFilteredGroups({
    category: category.split(',') as Category[],
    isFilterCompleted: isFilterCompleted === 'true',
    tag,
  });

  res.status(200).json(data);
};

export default groupsHandler;
