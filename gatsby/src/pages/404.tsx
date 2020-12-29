import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../organisms/Layout/layout";
import SEO from "../organisms/Seo/seo";

const NotFoundPage: FC<PageProps<GatsbyTypes.Page404Query>> = ({ data, location }) => {
  const siteTitle = data.site!.siteMetadata!.title!

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query Page404 {
    site {
      siteMetadata {
        title
      }
    }
  }
`
