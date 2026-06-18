# `children` Examples {#children-examples}

The `children` property allows you to create nested list structures. You can nest children multiple levels deep to create complex hierarchies.

## Standard Nesting {#standard-nesting}

::: code-group

```ts [JSON]
{
  title: 'Profile',
  children: [
    {
      schemaType: 'author',
    },
    {
      schemaType: 'user',
    },
  ],
}
```

```ts [Helpers]
helpers.children('Profile', [helpers.listing('author'), helpers.listing('user')]);
```

:::

## Deep Nesting (Nested Children) {#deep-nesting}

::: code-group

```ts [JSON]
{
  title: 'Content Management',
  children: [
    {
      title: 'Marketing',
      children: [
        {
          title: 'Campaigns',
          children: [
            {
              schemaType: 'summerSale',
            },
            {
              schemaType: 'winterSale',
            },
          ],
        },
        {
          schemaType: 'adChannel',
        },
      ],
    },
    {
      schemaType: 'blogPost',
    },
  ],
}
```

```ts [Helpers]
helpers.children('Content Management', [
  helpers.children('Marketing', [
    helpers.children('Campaigns', [helpers.listing('summerSale'), helpers.listing('winterSale')]),
    helpers.listing('adChannel'),
  ]),
  helpers.listing('blogPost'),
]);
```

:::
