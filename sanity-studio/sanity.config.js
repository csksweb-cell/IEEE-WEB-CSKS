import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'IEEE CS Kerala Chapter Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ieeecskc',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Hero Section')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.divider(),
            S.documentTypeListItem('storyChapter').title('Legacy Story Chapters'),
            S.documentTypeListItem('pillar').title('Pillars (What We Do)'),
            S.documentTypeListItem('stat').title('Key Statistics'),
            S.documentTypeListItem('event').title('Upcoming Events'),
            S.documentTypeListItem('teamMember').title('Leadership & Office Bearers'),
            S.documentTypeListItem('galleryItem').title('Gallery Photos'),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
