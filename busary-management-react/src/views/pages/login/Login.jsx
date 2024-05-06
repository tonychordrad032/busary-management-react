import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
  CAlert,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from 'src/assets/images/dut_logo.png'
//import ReCAPTCHA from 'react-google-recaptcha'
import '../../../App.css'

const Login = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const recaptcha = useRef()
  const [env, setEnv] = useState('')
  const [baseURL, setBaseURL] = useState('')

  const handleSave = () => {
    navigate('/dashboard')
  }

  return (
    <div className="bg-primary-gradient_ bg_login min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CAlert
                    color="danger"
                    dismissible
                    visible={visible}
                    onClose={() => setVisible(false)}
                  >
                    <div>
                      Please note that you logging on <strong>env</strong> Environment!
                    </div>
                  </CAlert>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" onClick={handleSave}>
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <Link to="/forgot-password">Forgot password?</Link>
                    </CCol>
                  </CRow>
                  <CRow className="mt-3">
                    <CCol xs={12}>
                      {/* <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} /> */}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <CImage src={logo} alt="Logo" />
                    <h3>Busary Managent System</h3>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
