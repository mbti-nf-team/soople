import { NextApiRequest, NextApiResponse } from 'next';

import { FilterGroupsCondition } from '@/models/group';
import { getFilteredGroups } from '@/services/api/group';

const fetchGroups = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).send({
      message: 'Page not found',
    });
  }

  const { category, isFilterCompleted, tag } = req.query as unknown as FilterGroupsCondition;

  const data = await getFilteredGroups({
    category: Array.isArray(category) ? category : [category],
    isFilterCompleted,
    tag,
  });

  return res.json(data);
};

export default fetchGroups;
