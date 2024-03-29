import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import './bio.scss'

const Bio = () => {
  const data = useStaticQuery<GatsbyTypes.BioQueryQuery>(graphql`
    query BioQuery {
      avatar: file(relativePath: { eq: "profile-picture.jpg" }) {
        childImageSharp {
          fixed(width: 150, height: 150, quality: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site?.siteMetadata?.author
  const social = data.site?.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      <div className="bio-image">
        {avatar && (
          <Image
            fixed={avatar}
            alt={author?.name!}
            className="bio-avatar"
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        )}
      </div>
      {author?.name && (
        <div className="author-profile">
          <div className="author-name">
            <strong>{author.name}</strong>
          </div>
          <br />
          <div className="author-summary">{author?.summary || null}</div>
        </div>
      )}
      <Link to="/about-me">» プロフィール詳細はコチラ</Link>
      <br />
      <br />
      <Link to="/contact-form">» お問い合わせはコチラ</Link>
      <br />
      <br />
      <Link to="/privacy-policy">» プライバシーポリシー</Link>
      <br />
      <br />
      <Link to="/terms-of-service">» 利用規約</Link>
    </div>
  )
}

export default Bio
