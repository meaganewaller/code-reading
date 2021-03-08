const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const _ = require(`lodash`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node,getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const { data, errors } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC}) {
        edges {
          next {
            id
          }
          previous {
            id
          }
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      languages: allMdx {
        group(field: frontmatter___languages) {
          fieldValue
        }
      }
    }
  `)
  if (errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query')
  }
  const posts = data.allMdx.edges
  posts.forEach(({node, next, previous}, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/blogPostTemplate.js"),
      context: {
        id: node.id,
        next: next && next.id,
        previous: previous && previous.id,
        first: posts[0].node.id,
        slug: node.fields.slug,
      },
    })
  })

  const languages = data.languages.group
  languages.forEach(( { fieldValue }) =>
    createPage({
      path: `/languages/${_.kebabCase(fieldValue)}/`,
      component: path.resolve("./src/templates/languagesTemplate.js"),
      context: {
        language: fieldValue,
      },
    })
  )
}
