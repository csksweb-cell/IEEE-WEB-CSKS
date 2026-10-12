const { defineCliConfig } = require('sanity/cli')

module.exports = defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ieeecskc',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
