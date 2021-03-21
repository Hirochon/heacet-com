import React, { VFC } from 'react'
import Bio from './bio'
import './sidebar.scss'

const Sidebar: VFC = () => (
  <div className="sidebar">
    <Bio />
  </div>
)

export default Sidebar