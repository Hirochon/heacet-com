import React, { FC } from 'react';
import { Link } from "gatsby";
import './header.scss';
import Image from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";


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
        <div className="header-left">
          {headerTitle}
        </div>
        <div className="header-right">
            <div className="header-right-icon">
              <a href="https://twitter/heacet43">
                <div className="font-size">
                  <FontAwesomeIcon icon={faTwitterSquare} size="2x" />
                </div>
              </a>
            </div>
            <div className="header-right-icon">
              <a id="r" href="https://github.com/Hirochon">
                <div className="font-size">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </div>
              </a>
            </div>
            <div className="header-right-bar">
              <a href="">
                <div className="font-size">
                  <FontAwesomeIcon icon={faBars} size="2x" />
                </div>
              </a>
            </div>
        </div>
      </div>
    </div> 
  )
}

export default Header