import { getContentTypes } from './getContentTypes';
import renderContentType from './renderContentType';

import type { Structure } from './@types/common.types';

const structure: Structure = (contentTypes) => (S) => {
  const types = getContentTypes(contentTypes, '1');
  console.log(types);

  return S.list()
    .title('Sanity')
    .items(
      types.map((contentType) => renderContentType(S, contentType)).filter((item) => item !== null),
    );
};

export default structure;
