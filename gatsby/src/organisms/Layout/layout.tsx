import React, { FC } from "react";
import { Link, PageProps } from "gatsby";
import { WindowLocation } from "@reach/router";


type Props = {
  title: string
  location: WindowLocation<unknown>
}

const Layout: FC<Props> = ({ location, title, children }) => {
  //@ts-ignore ↓これが何なのかを判別できてない
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let header
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <div className="main-heading">
        <Link to="/">{title}</Link>
      </div>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        ©Hirochi {new Date().getFullYear()} All Rights Reserved, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
