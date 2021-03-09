import React from "react"
import PropTypes from "prop-types"

import kebabCase from "lodash/kebabCase"

import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const LanguagesPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    }
  },
}) => (
<Layout>
  {console.log(group)}
  <div class="max-w-prose mx-auto max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">Languages</h2>
      <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">All the languages we have posts about</p>
      <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p>
    </div>
  </div>
  <div class="max-w-prose mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
    {group.map(language => (
      <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=l9ZKEo16zp&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </div>
        <div class="flex-1 min-w-0">
          <a href={`/languages/${kebabCase(language.fieldValue)}/`} class="focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-sm font-medium text-gray-900">
              {language.fieldValue} ({language.totalCount})
            </p>
            <p class="text-sm text-gray-500 truncate">
              Posts about {language.fieldValue}
            </p>


          </a>
        </div>
      </div>
    ))}
  </div>
</Layout>
)

LanguagesPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default LanguagesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___languages) {
        fieldValue
        totalCount
      }
    }
  }
`
