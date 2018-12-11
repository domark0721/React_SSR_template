import React from 'react'
import Header from '../containers/Header/Header'

const Routes = [
  {
    path: '/',
    exact: true,
    component: () => <div>home</div>,
  },
  {
    path: '/catogory',
    component: Header,
  },
  {
    path: '/live',
    component: Header,
  },
]

export default Routes
