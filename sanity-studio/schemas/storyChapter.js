export default {
  name: 'storyChapter',
  title: 'Legacy Story Chapter',
  type: 'document',
  orderings: [
    {
      title: 'Step Number',
      name: 'stepAsc',
      by: [{ field: 'step', direction: 'asc' }],
    },
  ],
  fields: [
    {
      name: 'step',
      title: 'Step Number (e.g. 1, 2, 3...)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'titlePrefix',
      title: 'Title Prefix (e.g. "40+ years", "A community", "Hands-on")',
      type: 'string',
    },
    {
      name: 'titleAccent',
      title: 'Title Accent Word (italic serif e.g. "builders", "always", "shipped")',
      type: 'string',
    },
    {
      name: 'titleSuffix',
      title: 'Title Suffix (e.g. "of legacy")',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Chapter Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    },
  ],
}
