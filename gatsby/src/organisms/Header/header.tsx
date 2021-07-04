import React, { FC } from 'react'
import { Link } from 'gatsby'
import './header.scss'
import Image from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import {
  faBars,
  faLaptop,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  faWindowRestore,
  faHandshake,
  faChartBar,
} from '@fortawesome/free-regular-svg-icons'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

type Anchor = 'right'

type Props = {
  isRootPath: boolean
  title: string
  siteLogo: GatsbyTypes.BlogIndexQuery['siteLogo']
}

const Header: FC<Props> = ({ isRootPath, title, siteLogo }) => {
  const [state, setState] = React.useState({
    right: false,
  })

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const snsMenuDictList = [
    {
      key: 'twitter-btn',
      link: 'https://twitter.com/heacet43',
      icon: faTwitterSquare,
      primary: 'Twitter',
    },
    {
      key: 'github-btn',
      link: 'https://github.com/Hirochon',
      icon: faGithub,
      primary: 'GitHub',
    },
  ]

  const categoryMenuDictList = [
    {
      key: 'samrtphone-game-btn',
      link: '/category/smartphone-game/',
      icon: faMobileAlt,
      primary: 'スマホゲーム',
    },
    {
      key: 'programming-btn',
      link: '/category/programming/',
      icon: faLaptop,
      primary: 'プログラミング',
    },
    {
      key: 'web-development-btn',
      link: '/category/web-development/',
      icon: faWindowRestore,
      primary: 'Web開発',
    },
    {
      key: 'data-analysis-btn',
      link: '/category/data-analysis/',
      icon: faChartBar,
      primary: 'データ分析',
    },
    {
      key: 'life-btn',
      link: '/category/life/',
      icon: faHandshake,
      primary: '生活',
    },
  ]

  const list = (anchor: Anchor) => (
    <div
      className="bar-btn-list"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Divider />
        <p>カテゴリ一覧</p>
        {categoryMenuDictList.map((categoryMenuDict) => (
          <Link to={categoryMenuDict.link} key={categoryMenuDict.key}>
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={categoryMenuDict.icon} size="2x" />
              </ListItemIcon>
              <ListItemText primary={categoryMenuDict.primary} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <p>SNS一覧</p>
      <List>
        {snsMenuDictList.map((snsMenuDict) => (
          <Link to={snsMenuDict.link} key={snsMenuDict.key}>
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={snsMenuDict.icon} size="2x" />
              </ListItemIcon>
              <ListItemText primary={snsMenuDict.primary} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )

  const logo = siteLogo!.childImageSharp?.fixed!

  const headerLink = (
    <Link to="/">
      {siteLogo ? (
        <Image fixed={logo} alt={title} className="site-logo" />
      ) : (
        { title }
      )}
    </Link>
  )

  const headerTitle = isRootPath ? (
    <h1>{headerLink}</h1>
  ) : (
    <div className="header-title">{headerLink}</div>
  )

  return (
    <div className="global-header">
      <div className="header-container">
        <div className="header-left">{headerTitle}</div>
        <div className="header-right">
          <div className="header-right-icon">
            <a href="https://twitter.com/heacet43">
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
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  )
}

export default Header
