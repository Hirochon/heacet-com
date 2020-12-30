import React, { FC } from 'react';
import { Link } from "gatsby";
import './header.scss';


type Props = {
  isRootPath: boolean
  title: string
}

const Header: FC<Props> = ({isRootPath, title}) => {
  let header
  if (isRootPath) {
    header = (
      <h1 className="header-container">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <div className="header-container">
        <Link to="/">{title}</Link>
      </div>
    )
  }
  return (
    <div className="global-header">
      {header}
    </div> 
  )
}

export default Header