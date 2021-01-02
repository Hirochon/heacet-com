import React, { FC } from "react"
import { Link, graphql, PageProps } from "gatsby"
import Image from 'gatsby-image'

import Bio from "../organisms/Bio/bio"
import Layout from "../organisms/Layout/layout"
import SEO from "../organisms/Seo/seo"
import "./post.scss"


const BlogPostTemplate: FC<PageProps<GatsbyTypes.BlogPostBySlugQuery>> = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site?.siteMetadata?.title!
  const { previous, next } = data
  const siteLogo = data.siteLogo
  const defaultThumbnail = data.defaultThumbnail?.childImageSharp!.fluid!

  return (
    <Layout location={location} title={siteTitle} siteLogo={siteLogo}>
      <SEO
        title={post!.frontmatter?.title!}
        description={post!.frontmatter?.description || post!.excerpt}
        keywords={post!.frontmatter?.keywords}
      />
      <div className="main-contents">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post!.frontmatter?.title}</h1>
            <p>{post!.frontmatter?.date}</p>
            {post!.frontmatter?.thumbnail ? 
              <Image
                fluid={post!.frontmatter?.thumbnail!.childImageSharp?.fluid!}
                alt={`${post!.frontmatter?.title!}-thumbnail`}
                className="posted-thumbnail"
              />
              :
              <Image
                fluid={defaultThumbnail}
                alt={`default-thumbnail`}
                className="posted-thumbnail"
              />
            }
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post!.html! }}
            itemProp="articleBody"
          />
          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields?.slug!} rel="prev">
                    ← {previous.frontmatter?.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields?.slug!} rel="next">
                    {next.frontmatter?.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </article>
        <Bio />
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    siteLogo: file(absolutePath: { regex: "/heacet.com-logo.png/" }) {
      childImageSharp {
        fixed(height: 32, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    defaultThumbnail: file(relativePath: { eq: "default-thumbnail.jpg"}) {
      childImageSharp {
        fluid(maxHeight: 350, maxWidth: 710) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        description
        keywords
        tags
        thumbnail {
          childImageSharp {
            fluid(maxHeight: 350, maxWidth: 710) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
