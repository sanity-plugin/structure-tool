import { constants } from '@/constants';
import { getContextValues } from '@/helpers/getContextValues';
import { getDivider } from '@/structure/listItems/getDivider';
import { getRaw } from '@/structure/listItems/getRaw';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type {
  RenderItems,
  RenderListItemsOutput,
  RenderListItemsParams,
} from '@/structure/renderListItems/renderListItems.types';
import type { StructureToolParams } from '@/structure/types/common.types';

export const renderListItems = <T extends StructureToolParams>(
  parentParams: RenderListItemsParams<T>,
): RenderListItemsOutput => {
  const {
    S,
    workspace: currentWorkspace,
    context,
    listItems: globalLineItems,
    pluginParams,
  } = parentParams;

  const contextValues = getContextValues(context);

  const renderItems: RenderItems<T> = (childParams) => {
    const { id, listItems } = childParams;

    return listItems.map((listItem, index) => {
      const params = {
        listItemsParams: parentParams,
        itemsParams: childParams,
        mappingParams: {
          listItem,
          index,
        },
      } satisfies ListItemKeyParams<T>;

      const { raw, isDivider } = listItem;
      // const {
      //   id: idValue,
      //   title,
      //   schemaType,
      //   icon,
      //   showIcons,
      //   singleton,
      //   component,
      //   componentOptions,
      //   children,
      //   apiVersion,
      //   filter,
      //   filterParams,
      //   defaultOrdering,
      //   defaultLayout,
      //   menuItemGroups,
      //   menuItems,
      //   hideAddButton,
      //   templates,
      //   raw,
      //   isDivider,
      // } = item;

      if (raw) return getRaw(params);

      if (isDivider) return getDivider(params);

      return null;

      // // Handle folders (items with children)
      // if (children && children.length > 0) {
      //   return S.listItem()
      //     .title(displayTitle)
      //     .id(id)
      //     .icon(icon)
      //     .showIcon(showIcon)
      //     .child(() => {
      //       let schemaBuilder = S.list()
      //         .title(displayTitle)
      //         .items(children.map((child) => renderItem(child)).filter((child) => child !== null))
      //         .showIcons(showIcons);

      //       if (menuItemGroups) {
      //         schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      //       }

      //       if (menuItems) {
      //         schemaBuilder = schemaBuilder.menuItems(menuItems);
      //       }

      //       return schemaBuilder;
      //     });
      // }

      // if (component) {
      //   return S.listItem()
      //     .title(displayTitle)
      //     .id(id)
      //     .icon(icon)
      //     .showIcon(showIcon)
      //     .child(() => {
      //       let schemaBuilder = S.component(component)
      //         .options({ ...componentOptions })
      //         .id(id);

      //       if (menuItemGroups) {
      //         schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      //       }

      //       if (menuItems) {
      //         schemaBuilder = schemaBuilder.menuItems(menuItems);
      //       }

      //       return schemaBuilder;
      //     });
      // }

      // if (!schemaType && filter) {
      //   return S.listItem()
      //     .title(displayTitle)
      //     .id(id)
      //     .icon(icon)
      //     .showIcon(showIcon)
      //     .child(() => {
      //       let schemaBuilder = S.documentList()
      //         .title(displayTitle)
      //         .menuItems([])
      //         .initialValueTemplates([])
      //         .showIcons(showIcons);

      //       if (filter || filterParams) {
      //         schemaBuilder = schemaBuilder
      //           // eslint-disable-next-line unicorn/no-array-callback-reference
      //           .filter(filter)
      //           .params({ ...filterParams });
      //       }

      //       if (apiVersion) {
      //         schemaBuilder = schemaBuilder.apiVersion(apiVersion);
      //       }

      //       if (defaultOrdering) {
      //         schemaBuilder = schemaBuilder.defaultOrdering(
      //           Object.entries(defaultOrdering).map(([field, value]) => ({
      //             field,
      //             ...(typeof value === 'string' ? { direction: value } : value),
      //           })),
      //         );
      //       }

      //       if (menuItemGroups) {
      //         schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      //       }

      //       if (menuItems) {
      //         schemaBuilder = schemaBuilder.menuItems(menuItems);
      //       }

      //       if (defaultLayout) {
      //         schemaBuilder = schemaBuilder.defaultLayout(defaultLayout);
      //       }

      //       return schemaBuilder;
      //     });
      // }

      // if (!schemaType) return null;

      // // Handle Document Types
      // return S.listItem()
      //   .title(displayTitle)
      //   .id(id)
      //   .icon(icon)
      //   .schemaType(schemaType)
      //   .showIcon(showIcon)
      //   .child(() => {
      //     if (singleton) {
      //       let schemaBuilder = S.editor()
      //         .id([schemaType, constants.SINGLETON_KEY].join('-'))
      //         .schemaType(schemaType);

      //       if (templates) {
      //         schemaBuilder = schemaBuilder.initialValueTemplate(
      //           [schemaType, ...Object.keys(templates)].join('-'),
      //           templates,
      //         );
      //       }

      //       return schemaBuilder;
      //     }

      //     let schemaBuilder = S.documentTypeList(schemaType)
      //       .title(displayTitle)
      //       .id(id)
      //       .filter(['_type == $schemaType', ...(filter ? [filter] : [])].join(' && '))
      //       .params({
      //         schemaType,
      //         ...filterParams,
      //       })
      //       .showIcons(showIcons);

      //     if (apiVersion) {
      //       schemaBuilder = schemaBuilder.apiVersion(apiVersion);
      //     }

      //     if (defaultOrdering) {
      //       schemaBuilder = schemaBuilder.defaultOrdering(
      //         Object.entries(defaultOrdering).map(([field, value]) => ({
      //           field,
      //           ...(typeof value === 'string' ? { direction: value } : value),
      //         })),
      //       );
      //     }

      //     if (defaultLayout) {
      //       schemaBuilder = schemaBuilder.defaultLayout(defaultLayout);
      //     }

      //     if (menuItemGroups) {
      //       schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      //     }

      //     if (menuItems) {
      //       schemaBuilder = schemaBuilder.menuItems(menuItems);
      //     }

      //     if (hideAddButton) {
      //       return schemaBuilder.menuItems([]).initialValueTemplates([]);
      //     }

      //     if (templates) {
      //       return schemaBuilder.initialValueTemplates([
      //         S.initialValueTemplateItem(
      //           [schemaType, ...Object.keys(templates)].join('-'),
      //           templates,
      //         ),
      //       ]);
      //     }

      //     return schemaBuilder;
      //   });
    });
  };

  return renderItems({ id: constants.UNIQUE_ID_FIRST_VALUE, listItems: globalLineItems }).filter(
    (item) => item !== null,
  );
};
