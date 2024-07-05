import React, { useState, useEffect } from 'react'
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
  CFormSelect,
  CFormLabel,
} from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'
import logo from 'src/assets/images/dut_logo.png'
import '../../../App.css'
import HttpFunction from 'src/core/HttpFunction'

import { Toast } from 'src/core/Toast'
import { toast } from 'react-toastify'

const Register = () => {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false)
    // Form Field
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [env, setEnv] = useState('');
    const [baseURL, setBaseURL] = useState('');

    const http = new HttpFunction();

  // Run whenever the component load
  useEffect(() => {  
  },[]);


  const onShowLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5 * 1000)
  }


  const handleSave = async () => {

    console.log("Start registering new user")
    localStorage.clear();

    var data = {
        "username": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "gender": gender,
        "userType": "Student",
        "mobile": mobile,
    };
    setLoading(true);

    var res = await http.post('/api/v1/user', data);
    
    if(res.code === 201)  {
        setLoading(false);
        await toast.success("Registered Successfully", Toast.getToastOptions());
        navigate('/');
        
      }else if(res.code === 409){
        toast.error(res.message, Toast.getToastOptions());
        setLoading(false);
      }else{
        toast.error('Error occurred', Toast.getToastOptions());
        setLoading(false);
      }

  };

  return (
    <div className="bg-primary-gradient_ bg_login min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Create Account</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CForm 
                    noValidate
                    validated={validated}
                    >
                        <CFormInput
                            type="text"
                            label="First Name"
                            placeholder="Enter Your First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        />
                        <CFormInput
                            type="text"
                            label="Last Name"
                            placeholder="Enter Your Lastname"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                        />
                        <CFormSelect
                            aria-label="Select Gender"
                            label="Gender"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </CFormSelect>
                        <CFormInput
                            type="number"
                            label="Mobile"
                            placeholder="Enter mobile"
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                            required={mobile === "" ? true : false}
                        />
                        <CFormLabel htmlFor='validationCustomUsername'>Email</CFormLabel>
                        <CInputGroup className='has-validation'>
                            <CInputGroupText>@</CInputGroupText>
                            <CFormInput
                            type="email"
                            //label="Email"
                            placeholder="abc@email.com"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            tooltipFeedback
                        />
                        </CInputGroup>
                        <CFormInput
                            type="password"
                            label="Password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required={password === "" ? true : false}
                        />
                         <CFormInput
                            type="password"
                            label="Confirm Password"
                            placeholder="Please Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required={confirmPassword === "" ? true : false}
                        />
                        <CRow className='mt-3'>
                            <CCol xs={6}>
                            <CButton color="primary" className="px-4" onClick={handleSave}>
                                Create Account
                            </CButton>
                            </CCol>
                            <CCol xs={6} className="text-right">
                            <Link to="/forgot-password">Login?</Link>
                            </CCol>
                        </CRow>
                    </CForm>
                    
                  
                
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

export default Register
