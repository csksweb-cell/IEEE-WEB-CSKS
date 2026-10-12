export default {
  name: 'stat',
  title: 'Key Statistic',
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
      title: 'Display Order',
      type: 'number',
    },
    {
      name: 'value',
      title: 'Numeric Value (e.g. 40, 60, 500, 12)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'suffix',
      title: 'Suffix (e.g. "+", "K+", "%")',
      type: 'string',
      initialValue: '+',
    },
    {
      name: 'label',
      title: 'Label (e.g. "Years of legacy", "Student branches")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}
