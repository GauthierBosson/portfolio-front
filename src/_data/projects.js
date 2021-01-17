const groq = require('groq')
//import BlocksToMarkdown from '@sanity/block-content-to-markdown'

const client = require('../utils/sanityClient')

async function getProjects() {
  const filter = groq`*[_type == "project"]`
  const projection = groq`{
    _id,
    name,
    description
  }`
  const query = [filter, projection].join(' ')
  const res = await client.fetch(query).catch(err => console.log(err))

  return res
}

module.exports = getProjects
