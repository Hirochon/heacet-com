import React, { FC } from "react";
import { Link, graphql, PageProps } from "gatsby";
import Image from "gatsby-image";

import Bio from "../organisms/Bio/bio";
import Layout from "../organisms/Layout/layout";
import SEO from "../organisms/Seo/seo";
import "./home.scss";


const BlogIndex: FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title!
  const posts = data.allMarkdownRemark.nodes
  const siteLogo = data.siteLogo
  const defaultThumbnail = data.defaultThumbnail?.childImageSharp!.fixed!

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} siteLogo={siteLogo}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} siteLogo={siteLogo}>
      <SEO title="All posts" />
      <div className="main-contents">
        <div className="post-card-list">
          <ol style={{ listStyle: `none` }}>
            {posts.map((post) => {
              const title = post.frontmatter?.title || post.fields?.slug
              return (
                <li key={post.fields!.slug!}>
                  <article
                    className="post-card"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <Link to={post.fields!.slug!} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>{post.frontmatter!.date}</small>
                      <br/>
                      {post.frontmatter?.thumbnail ? 
                        <Image
                          fixed={post.frontmatter?.thumbnail!.childImageSharp?.fixed!}
                          alt={`${title}-thumbnail`}
                          className="posted-thumbnail"
                        />
                        :
                        <Image
                          fixed={defaultThumbnail}
                          alt={`default-thumbnail`}
                          className="posted-thumbnail"
                        />
                      }
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter!.description || post.excerpt!,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
        <Bio />
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndex {
    siteLogo: file(relativePath: { eq: "heacet.com-logo.png" }) {
      childImageSharp {
        fixed(height: 40, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    defaultThumbnail: file(relativePath: { eq: "default-thumbnail.jpg"}) {
      childImageSharp {
        fixed(height: 300, width: 750, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY年MM月DD日")
          title
          description
          tags
          thumbnail {
            childImageSharp {
              fixed(height: 300, width: 750, quality: 90) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
