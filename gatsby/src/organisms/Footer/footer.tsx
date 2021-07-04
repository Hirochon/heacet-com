import React, { FC } from 'react'
import './footer.scss'

const footer: FC = () => {
  return (
    <footer className="global-footer">
      <p>©Hirochi {new Date().getFullYear()} All Rights Reserved</p>
    </footer>
  )
}

export default footer
