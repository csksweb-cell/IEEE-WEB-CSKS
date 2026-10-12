export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'chapterName',
      title: 'Chapter Name',
      type: 'string',
      initialValue: 'IEEE Computer Society Kerala Chapter',
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'logoRound',
      title: 'Round Logo / Favicon',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'membershipUrl',
      title: 'Membership URL',
      type: 'url',
      initialValue: 'https://cs.ieeekerala.org',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'x', title: 'X (Twitter) URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    },
  ],
}
