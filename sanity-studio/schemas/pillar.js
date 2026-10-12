export default {
  name: 'pillar',
  title: 'Pillar (What We Do)',
  type: 'document',
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tag',
      title: 'Tag (e.g. 01 — LEARN, 02 — BUILD)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'variant',
      title: 'Card Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Glass Card', value: 'glass' },
          { title: 'Dark Accent Card', value: 'dark' },
          { title: 'Amber Wide Card', value: 'amber' },
        ],
      },
      initialValue: 'glass',
    },
    {
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Terminal / Code', value: 'code' },
          { title: 'Lightning / Zap', value: 'zap' },
          { title: 'Users / Network', value: 'users' },
          { title: 'Trending / Growth', value: 'growth' },
          { title: 'Globe / Campus', value: 'globe' },
        ],
      },
      initialValue: 'code',
    },
  ],
}
