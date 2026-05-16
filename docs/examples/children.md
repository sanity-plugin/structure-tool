# `children` Examples {#children-examples}

The `children` property allows you to create nested list structures. You can nest children multiple levels deep to create complex hierarchies.

## Standard Nesting {#standard-nesting}

```ts
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

## Deep Nesting (Nested Children) {#deep-nesting}

```ts
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
