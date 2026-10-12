export default {
  name: 'event',
  title: 'Upcoming Event',
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
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category (Workshop, Hackathon, Lecture, Community)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date String (e.g. "Aug 09 · Kochi", "Aug 23–24 · Trivandrum")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metaTags',
      title: 'Metadata Tags (e.g. ["Full-day · Hands-on", "Seats limited"])',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Registration / Details Link',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}
