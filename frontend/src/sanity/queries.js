
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  chapterName,
  description,
  logo,
  logoRound,
  membershipUrl,
  socialLinks
}`

export const heroQuery = `*[_type == "hero"][0]{
  badge,
  titleLine1,
  titleAccent,
  titleLine2,
  subtitle,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  marqueeKeywords
}`

export const storyChaptersQuery = `*[_type == "storyChapter"] | order(step asc){
  _id,
  step,
  titlePrefix,
  titleAccent,
  titleSuffix,
  description,
  image,
  imageAlt
}`

export const pillarsQuery = `*[_type == "pillar"] | order(order asc){
  _id,
  order,
  tag,
  title,
  description,
  variant,
  icon
}`

export const statsQuery = `*[_type == "stat"] | order(order asc){
  _id,
  order,
  value,
  suffix,
  label
}`

export const eventsQuery = `*[_type == "event"] | order(order asc){
  _id,
  order,
  title,
  category,
  date,
  metaTags,
  coverImage,
  link
}`

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc){
  _id,
  order,
  name,
  role,
  organization,
  category,
  photo,
  linkedin
}`

export const galleryItemsQuery = `*[_type == "galleryItem"] | order(order asc){
  _id,
  order,
  title,
  category,
  image
}`

export const allContentQuery = `{
  "settings": ${siteSettingsQuery},
  "hero": ${heroQuery},
  "storyChapters": ${storyChaptersQuery},
  "pillars": ${pillarsQuery},
  "stats": ${statsQuery},
  "events": ${eventsQuery},
  "teamMembers": ${teamMembersQuery},
  "galleryItems": ${galleryItemsQuery}
}`
