import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'

import Layout from '../organisms/Layout/layout'
import SEO from '../organisms/Seo/seo'

const NotFoundPage: FC<PageProps<GatsbyTypes.Page404Query>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site!.siteMetadata!.title!
  const siteLogo = data.siteLogo

  return (
    <Layout location={location} title={siteTitle} siteLogo={siteLogo}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query Page404 {
    siteLogo: file(absolutePath: { regex: "/heacet.com-logo.png/" }) {
      childImageSharp {
        fixed(height: 32, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
