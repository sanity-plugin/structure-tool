import pluralize from 'pluralize-esm';

import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { GetComputedListItems } from '@/structure/getComputedListItems/getComputedListItems.types';

export const getComputedListItems: GetComputedListItems = (params) => {
  const { S, listItem, context } = params;

  const contextValues = getContextValues(context);

  const values = (() => {
    const {
      title,
      schemaType,
      icon,
      showIcons,
      singleton,
      componentOptions,
      children,
      apiVersion,
      filter,
      filterParams,
      defaultOrdering,
      defaultLayout,
      hideAddButton,
      templates,
      isDivider,
      isPlural,
    } = listItem;

    return {
      title: getValidListItem(title, contextValues),
      schemaType: getValidListItem(schemaType, contextValues),
      showIcon: icon !== false,
      showIcons: getValidListItem(showIcons, contextValues),
      singleton: getValidListItem(singleton, contextValues),
      componentOptions: getValidListItem(componentOptions, contextValues),
      children: getValidListItem(children, contextValues),
      apiVersion: getValidListItem(apiVersion, contextValues),
      filter: getValidListItem(filter, contextValues),
      filterParams: getValidListItem(filterParams, contextValues),
      defaultOrdering: getValidListItem(defaultOrdering, contextValues),
      defaultLayout: getValidListItem(defaultLayout, contextValues),
      hideAddButton: getValidListItem(hideAddButton, contextValues),
      templates: getValidListItem(templates, contextValues),
      isDivider: getValidListItem(isDivider, contextValues),
      isPlural: getValidListItem(isPlural, contextValues),
    };
  })();

  const displayTitle = (() => {
    const { title, schemaType, singleton, isPlural } = values;

    const schemaTitle = schemaType ? S.documentTypeListItem(schemaType).getTitle() : '';
    const isItPlural = title ? false : (isPlural ?? !singleton);
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const mainTitle = title || (schemaTitle ?? '');

    const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
    return finalTitle || '';
  })();

  return {
    ...values,
    displayTitle,
  };
};
