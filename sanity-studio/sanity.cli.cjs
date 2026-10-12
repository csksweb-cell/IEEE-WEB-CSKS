const { defineCliConfig } = require('sanity/cli')

module.exports = defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'kvtr8mms',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
