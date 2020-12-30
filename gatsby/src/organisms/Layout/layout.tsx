import React, { FC } from "react";
import { WindowLocation } from "@reach/router";
import './layout.scss';
import Header from "../Header/header";


type Props = {
  title: string
  location: WindowLocation<unknown>
  siteLogo: GatsbyTypes.BlogIndexQuery["siteLogo"]
}

const Layout: FC<Props> = ({ location, title, siteLogo, children }) => {
  //@ts-ignore ↓これが何なのかを判別できてない
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header isRootPath={isRootPath} title={title} siteLogo={siteLogo} />
      <main className="global-main">{children}</main>
      <footer className="global-footer">
        ©Hirochi {new Date().getFullYear()} All Rights Reserved, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
