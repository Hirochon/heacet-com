import React, { VFC } from 'react'
// import AdsenseDisplay from '../../atoms/adsense'
import Bio from './bio'
import './sidebar.scss'

const Sidebar: VFC = () => (
  <div className="sidebar">
    <Bio />
    {/* <AdsenseDisplay /> */}
  </div>
)

export default Sidebar