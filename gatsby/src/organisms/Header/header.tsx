import React, { FC } from 'react';
import { Link } from "gatsby";
import './header.scss';
import Image from "gatsby-image";


type Props = {
  isRootPath: boolean
  title: string
  siteLogo: GatsbyTypes.BlogIndexQuery["siteLogo"]
}

const Header: FC<Props> = ({isRootPath, title, siteLogo}) => {
  const logo = siteLogo!.childImageSharp?.fixed!

  const headerLink = (
    <Link to="/">
      {siteLogo ? (
        <Image
          fixed={logo}
          alt={title}
          className="site-logo"
        />
      ): title}
    </Link>
  )

  const headerTitle = (
    isRootPath ?
      <h1>{headerLink}</h1>
      : {headerLink}
    )

  return (
    <div className="global-header">
      <div className="header-container">
        {headerTitle}
      </div>
    </div> 
  )
}

export default Header