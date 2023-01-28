import qs from 'qs';

import { paramsSerializer } from '.';

describe('paramsSerializer', () => {
  it('"qs.stringify"를 호출해야만 한다', () => {
    const qsSpyOn = jest.spyOn(qs, 'stringify');
    const params = {
      param1: 'apple',
      param2: 'banana',
      param3: 'orange',
    };

    const result = paramsSerializer(params);

    expect(result).toBe('param1=apple&param2=banana&param3=orange');
    expect(qsSpyOn).toHaveBeenCalledWith(params, {
      indices: false,
      arrayFormat: 'comma',
    });

    qsSpyOn.mockRestore();
  });
});
