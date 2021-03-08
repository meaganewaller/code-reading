import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const LanguagesTemplate = ({ data, pageContext }) => (
  <Layout>
    <h2>{pageContext.category}</h2>
    <p>
      There are <b>{data.allMdx.totalCount}</b> posts about {" "}
      <b>{pageContext.language}</b>.
    </p>
    {data.allMdx.nodes.map(post => (
      <Link to={post.fields.slug} key={post.id}>
        {post.frontmatter.title}
      </Link>
    ))}
  </Layout>
)

export default LanguagesTemplate

export const pageQuery = graphql`
  query LanguagePageQuery($language: String) {
    allMdx(
      filter: { frontmatter: { languages: { in: [$language]}}}
      sort: { fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
      totalCount
    }
  }
`
