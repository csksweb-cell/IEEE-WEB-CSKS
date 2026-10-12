export default {
  name: 'teamMember',
  title: 'Team Member / Office Bearer',
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
      name: 'name',
      title: 'Full Name (with honorific, e.g. Prof. Sarju S, Gauiri Shankar G Nair)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Designation (e.g. Chairperson, Webmaster, Technical Coordinator)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'organization',
      title: 'Organization / College / Company (e.g. SJCET, GECPKD, MyGate)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Team Category',
      type: 'string',
      options: {
        list: [
          { title: 'Professional Execom', value: 'execom' },
          { title: 'Student Leadership Team', value: 'student' },
          { title: 'Graduate Student Activities Committee (GSAC)', value: 'gsac' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Display Order Within Category',
      type: 'number',
    },
  ],
}
