import React, { FC } from "react";
import { Link, graphql, PageProps } from "gatsby";
import Image from "gatsby-image";

import Bio from "../../organisms/Bio/bio";
import Layout from "../../organisms/Layout/layout";
import SEO from "../../organisms/Seo/seo";
import Pagination from "../../organisms/Pagination/pagination";
import "./home.scss";


const BlogIndex: FC<PageProps<GatsbyTypes.BlogIndexTagQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title!
  const posts = data.allMarkdownRemark.nodes
  const siteLogo = data.siteLogo
  const defaultThumbnail = data.defaultThumbnail?.childImageSharp!.fluid!
  const pageInfo = data.allMarkdownRemark.pageInfo
  const fieldValue = data.allMarkdownRemark.group[0].fieldValue

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} siteLogo={siteLogo}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found.
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
                    <header className="card-header">
                      <div className="card-title">
                        <h2>
                          <Link to={post.fields!.slug!} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                        <small>{post.frontmatter!.date}</small>
                      </div>
                      <br/>
                      <Link to={post.fields!.slug!} itemProp="url">
                        <div className="card-image">
                          {post.frontmatter?.thumbnail ? 
                            <Image
                              fluid={post.frontmatter?.thumbnail!.childImageSharp?.fluid!}
                              alt={`${title}-thumbnail`}
                              className="posted-thumbnail"
                            />
                            :
                            <Image
                              fluid={defaultThumbnail}
                              alt={`default-thumbnail`}
                              className="posted-thumbnail"
                            />
                          }
                        </div>
                      </Link>
                    </header>
                    <section className="card-description">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter!.description || post.excerpt!,
                        }}
                        itemProp="description"
                      />
                      <div className="read-more">
                        <Link to={post.fields!.slug!} itemProp="url">続きを見る</Link>
                      </div>
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
          <Pagination 
            currentPage={pageInfo.currentPage}
            hasNextPage={pageInfo.hasNextPage}
            hasPreviousPage={pageInfo.hasPreviousPage}
            pageCount={pageInfo.pageCount}
            categorySlug={`tag/${fieldValue}/`}
          />
        </div>
        <Bio />
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexTag(
      $limit: Int!
      $skip: Int!
      $tag: String!
    ) {
    siteLogo: file(relativePath: { eq: "heacet.com-logo.png" }) {
      childImageSharp {
        fixed(height: 32, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    defaultThumbnail: file(relativePath: { eq: "default-thumbnail.jpg"}) {
      childImageSharp {
        fluid(maxHeight: 300, maxWidth: 750) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {frontmatter: { isFixed: {nin: true}, 
                              tags: {eq: $tag}}},
      limit: $limit,
      skip: $skip
    ) {
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
              fluid(maxHeight: 300, maxWidth: 750) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
      }
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
