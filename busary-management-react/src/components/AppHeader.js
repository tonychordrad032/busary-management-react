import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButtonGroup,
  CFormCheck,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { SecurityEnum } from 'src/core/SecurityEnum'
import { cilApplicationsSettings, cilMenu, cilMoon, cilSun } from '@coreui/icons'

import { AppBreadcrumb } from './index'

import {
  AppHeaderDropdown,
  AppHeaderDropdownMssg,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from './header/index'

import { logo } from 'src/assets/images/dut_logo.png'

const AppHeader = () => {
  const dispatch = useDispatch()

  ///const logo1 = 'src/assets/images/dut_lo'

  const theme = useSelector((state) => state.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  var sidebarShow = useSelector((state) => state.sidebarShow)
  const [alreadyOpen, setOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [baseURL, setBaseURL] = useState("");
  const [env, setEnv] = useState("");


  const userProfile = async () => {
      var userProfile = JSON.parse(await localStorage.getItem(SecurityEnum.UserProfile));
      setFullName(userProfile?.firstName + " " + userProfile?.lastName);
      setCompany(userProfile?.sourceCompany?.sourceCompanyName);
      setRegion(userProfile?.region?.regionName);
      setEmail(userProfile?.username);
      setRole(userProfile?.userType);
  };

  useEffect(() => {
    userProfile();
    }, []);

  return (
    <CHeader color='dark' position="sticky" className="mb-4">
      <CContainer fluid>
        
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
      
        
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/*<CIcon icon={logo} height={48} alt="Logo" />*/}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Profile</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto me-4">
          <CButtonGroup aria-label="Theme switch">
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-light-theme"
              autoComplete="off"
              label={<CIcon icon={cilSun} />}
              checked={theme === 'default'}
              onChange={() => dispatch({ type: 'set', theme: 'light' })}
            />
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-dark-theme"
              autoComplete="off"
              label={<CIcon icon={cilMoon} />}
              checked={theme === 'dark'}
              onChange={() => dispatch({ type: 'set', theme: 'dark' })}
            />
          </CButtonGroup>
        </CHeaderNav>
        {/* <CHeaderNav>
          <AppHeaderDropdownNotif />
          <AppHeaderDropdownTasks />
          <AppHeaderDropdownMssg />
        </CHeaderNav> */}
        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
