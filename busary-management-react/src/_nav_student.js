import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'


const _nav_student = [
  {
    component: CNavItem,
    name: 'My profile',
    to: '/list-users',
  },
  {
    component: CNavItem,
    name: 'My Applications',
    to: '/list-bursary-applications',
  }
]

export default _nav_student
