import React, { FC } from 'react';
import { Link } from "gatsby";
import './header.scss';
import Image from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


type Anchor = 'right';

type Props = {
  isRootPath: boolean
  title: string
  siteLogo: GatsbyTypes.BlogIndexQuery["siteLogo"]
}

const Header: FC<Props> = ({isRootPath, title, siteLogo}) => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="https://twitter.com/heacet43">
          <ListItem button key="sns-icon">
            <ListItemIcon><FontAwesomeIcon icon={faTwitterSquare} size="2x" /></ListItemIcon>
            <ListItemText primary="Twitter" />
          </ListItem>
        </Link>
        <Link to="https://github.com/Hirochon">
          <ListItem button key="sns-icon">
            <ListItemIcon><FontAwesomeIcon icon={faGithub} size="2x" /></ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const logo = siteLogo!.childImageSharp?.fixed!

  const headerLink = (
    <Link to="/">
      {siteLogo ? 
        <Image
          fixed={logo}
          alt={title}
          className="site-logo"
        />
      : {title}}
    </Link>
  )

  const headerTitle = (
    isRootPath ?
      <h1>{headerLink}</h1>
      : <div className="header-title">{headerLink}</div>
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
            <a onClick={toggleDrawer('right', true)}>
              <div className="font-size">
                <FontAwesomeIcon icon={faBars} size="2x" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
        {list('right')}
      </Drawer>
    </div> 
  )
}

export default Header