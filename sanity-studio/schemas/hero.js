export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Belong where technology thrives',
    },
    {
      name: 'titleLine1',
      title: 'Title Line 1',
      type: 'string',
      initialValue: 'Four',
    },
    {
      name: 'titleAccent',
      title: 'Title Accent Word',
      type: 'string',
      initialValue: 'decades',
      description: 'Rendered in decorative serif italic style',
    },
    {
      name: 'titleLine2',
      title: 'Title Line 2',
      type: 'string',
      initialValue: 'of Computing.',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        'The people, chapters and student branches that turned Kerala into a computing community — one workshop, hackathon and friendship at a time.',
    },
    {
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Explore the legacy',
    },
    {
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '#story',
    },
    {
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      initialValue: "See what's happening",
    },
    {
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
      initialValue: '#events',
    },
    {
      name: 'marqueeKeywords',
      title: 'Marquee Strip Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Workshops',
        'Hackathons',
        'Distinguished Lectures',
        'Student Branches',
        'Research',
        'Mentorship',
      ],
    },
  ],
}
