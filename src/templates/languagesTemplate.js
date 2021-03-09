import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const LanguagesTemplate = ({ data, pageContext }) => (
  <Layout>
    <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="absolute inset-0">
        <div class="bg-white h-1/3 sm:h-2/3"></div>
      </div>
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            {pageContext.language}
          </h2>
          <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            There are <b>{data.allMdx.totalCount}</b> posts about {" "} <b>{pageContext.language}</b>.          </p>
        </div>
        <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {data.allMdx.nodes.map(post => (
            <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div class="flex-shrink-0">
                <img class="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixqx=l9ZKEo16zp&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt="" />
              </div>
              <div class="flex-1 bg-white p-6 flex flex-col justify-between">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <Link to={post.fields.slug} class="hover:underline" key={post.id}>
                      {post.frontmatter.title}
                    </Link>
                  </p>
                  <Link to={post.fields.slug} class="block mt-2">
                    <p class="text-xl font-semibold text-gray-900">
                      {post.frontmatter.title}
                    </p>
                    <p class="mt-3 text-base text-gray-500">
                      {post.excerpt}
                    </p>
                  </Link>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <Link to="#">
                      <span class="sr-only">Meagan Waller</span>
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=l9ZKEo16zp&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </Link>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <Link to="#" class="hover:underline">
                        Meagan Waller
                      </Link>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time datetime={post.frontmatter.date}>
                        {post.frontmatter.date}
                      </time>
                      <span aria-hidden="true">
                        &middot;
                      </span>
                      <span>
                        6 min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
        }
        fields {
          slug
        }
      }
      totalCount
    }
  }
`
