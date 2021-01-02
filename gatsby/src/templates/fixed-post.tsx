import React, { FC } from 'react';
import { graphql, PageProps } from "gatsby";
import Image from 'gatsby-image';

import Bio from "../organisms/Bio/bio";
import Layout from "../organisms/Layout/layout";
import SEO from "../organisms/Seo/seo";
import ContactForm from "./contact";
import "./post.scss";


const FixedPostTemplate: FC<PageProps<GatsbyTypes.FixedPostBySlugQuery>> = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site?.siteMetadata?.title!
  const siteLogo = data.siteLogo
  const keywords = post!.frontmatter?.keywords

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
              <></>
            }
          </header>
          {!!keywords ? 
            (keywords![0] === "contactForm" ? 
              (<ContactForm />) :
              (<section
                dangerouslySetInnerHTML={{ __html: post!.html! }}
                itemProp="articleBody"
              />)
            ) :
            (<section
              dangerouslySetInnerHTML={{ __html: post!.html! }}
              itemProp="articleBody"
            />)
          }
        </article>
        <Bio />
      </div>
    </Layout>
  )
}

export default FixedPostTemplate

export const pageQuery = graphql`
  query FixedPostBySlug(
    $id: String!
  ) {
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
            fluid(maxHeight: 350, maxWidth: 730) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
