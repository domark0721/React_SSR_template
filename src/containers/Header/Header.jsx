import React from 'react'
import { Link } from 'react-router-dom'


import HeaderItems from '../../constants/header'


const Header = () => (
  <div className="header">
    {
      HeaderItems.map(item => (
        <Link
          key={item.href}
          to={item.href}
        >
          {item.label}
        </Link>
      ))
    }
  </div>
)

export default Header
