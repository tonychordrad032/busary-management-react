import React, { useState, useEffect } from 'react';


import {
  CButton,
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCol, 
  CCardBody, 
  CRow,
  CCollapse,
  CCard,
  CCardHeader,
  CDatePicker,
  CSmartTable
} from '@coreui/react-pro'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// Import for toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '../../../core/Toast';
import HttpFunction from '../../../core/HttpFunction';
import ProfileCard from 'src/components/profile/ProfileCard';
import LoadSpinner from 'src/components/LoadSpinner';


const UpdateUserModal = (props) => {
   
    const [visible, setVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [ activeKey, setActiveKey] = useState(1);
    const [timelineList, setTimelineList] = useState([]);
    const [dob, setDob] = useState(new Date());

    // Form fields
    const [facultyId, setFacultyId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [studentNumber, setStudentNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [deleteUser, setDeleteUser] = useState(false)
    const [gender, setGender] = useState('');
    const [userType, setUserType] = useState('');
    const [departmentId, setDepartmentId] = useState(0);
    const [departmentList, setDepartmentList] = useState([]);
    const [btnText, setBtnText] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [finalList, setFinalList] = useState([]);
    const [employeeNumber, setEmployeeNumber] = useState('');

  // Handle Additional Form
  const [isShown, setIsShown] = useState(false);
  const [details, setDetails] = useState([]);

  const http = new HttpFunction();

  const userTypeList = [
      {id: 1, name: 'Administrator'}, 
    { id: 2, name: 'Student' }
  ]

  const handleClose = () => {
    clearForm();
    setVisible(!visible);
  };

  //Validation
  const [validated, setValidated] = useState(false)

  //loads only when the component is loadedd
  useEffect(() => {
    //fetchDepartmentData(props.data.department?.faculty?.facultyId);
    if(props.action === 'update') {
       console.log("Mobile number {} ", mobile)
        setUserId(props.data.userId);
        setStudentNumber(props?.data?.studentNumber);
        setFirstName(props.data.firstName);
        setGender(props.data.gender);
        setLastName(props.data.lastName);
        setUsername(props.data.username);
        setMobile(props?.data?.mobile);
        setUserType(props.data.userType);
        setFacultyId(props.data.department?.faculty?.facultyId);
        setDepartmentId(props.data.department?.departmentId);
        setBtnText('Change ' + props.data.firstName + '\'s Password?');
        setDob(props.data?.dob);
        setEmployeeNumber(props.data.employeeNumber);
    }
    ///fetchDepartmentData(props.data.department?.faculty?.facultyId);
  }, [props.data]);

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const changePassword = async () => {

    
    if (password !== confirmPassword) {
      toast.error('Password doesn\'t match', Toast.getToastOptions());
      return;
    }

    var data = {
      "email": username,
      "otp": '',
      "newPassword": password
    };

    setDisabled(true);
    setBtnText('Changing password...');
    var res = await http.post('/api/v1/user/change-password', data);
    if (res.code === 200) {
      toast.success(res.data.responseMessage, Toast.getToastOptions());
      setPassword('');
      setConfirmPassword('');
    } else if (res.data.response.data.responseMessage) {
      toast.error(res.data.response.data.responseMessage, Toast.getToastOptions());
    } else {
      toast.error('Error occurred', Toast.getToastOptions());
    }
    setDisabled(false);
    setBtnText('Change ' + firstName + '\'s Password?');
  }
  //Handle Save
  const handleSave = async () => {
    if (username !== '' && userType !== '' && firstName !== '' && lastName !== '' && mobile !== '' && departmentId !== '') {
      setLoading(true);
      let data = {
        "userId": userId,
        "username": username,
        "password": "123456",
        "userType": userType,
        "gender": gender,
        "firstName": firstName,
        "lastName": lastName,
        "employeeNumber": employeeNumber,
        "mobile": mobile,
        "dob": dob,
        "region": {
          "regionId": departmentId
        },
      }

      let res;

      if (props.action === 'update' && !deleteUser) {
        if (window.confirm(`Are you sure you want to update ${firstName} ${lastName}?`) != true) {
          return;
        }
        res = await http.update('/api/v1/user', data);
      } else if (deleteUser) {
        if (window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`) != true) {
          return;
        }
        res = await http.delete('/api/v1/user/' + userId);
      } else {
        res = await http.post('/api/v1/user', data);
      }

      //console.log(res);

      if (res.code === 200 || res.code === 201) {
        toast.success(res.data.responseMessage, Toast.getToastOptions());
        props.fetchData(1, '');
        clearForm();
        setLoading(false);
        handleClose();
      } else if (res.data.response.data.responseMessage) {
        toast.error(res.data.response.data.responseMessage, Toast.getToastOptions());
        setLoading(false);
      } else {
        toast.error("Error occured!!!", Toast.getToastOptions());
        setLoading(false);
      }
    } else {
      toast.error('Please complete the form', Toast.getToastOptions());
    }
  };
 
  // Clears the form
  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setMobile('');
    setUserType('');
    setDob('');
    setEmployeeNumber('');
  }

  // Handle Depatment
  const handleFaculty = (e) => {
    const getFacultyId = e.target.value;
    setFacultyId(getFacultyId);
    fetchDepartmentData(getFacultyId);
  }

  // Fetch department from server
  const fetchDepartmentData = async (_facultyId) => {
    //setLoading(true);
    var url = `/api/v1/department/find-by-facultyId?facultyId=${_facultyId}`;
    const apiCall = await http.get(url);
    if(apiCall.code === 200) {
      
      setDepartmentList(apiCall.data);
      //setLoading(false);
    
    }else if(apiCall === 204){
      //setLoading(false);
    }else{
      toast.error('error occurred!!!', Toast.getToastOptions());
      //setLoading(false);
    }
  }
  
  const columns = [
    'Date',
    'Activivty',
    'Action',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    }

  ]

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const handleHistory = () => {
    var id = 1;
    setFinalList([]);
    props.history.forEach(x => {
      finalList.push({
        id: id += 1,
        Date: x.dateAdded,
        Activivty: x.activity,
        Action: x.functionMethod,
        dataBefore: x.dataBefore,
        dataAfter: x.dataAfter
      })
    })
  }

  useEffect(() => {
    handleHistory();      
  },[]);
  
    return (
      <>
      {
        isLoading && <LoadSpinner isLoading></LoadSpinner>
      }
        <ToastContainer />
        {
          (props.role == 'Administrator') &&
            <CButton size='sm' className={props.action !== 'update' ? '' : 'd-none'} onClick={() => setVisible(!visible)}>Add New</CButton>
        }
        
        <CButtonGroup  className={props.action === 'update' ? '' : 'd-none'} role="group">
            <CButton color="warning" size='sm' onClick={() => { setVisible(!visible); setDeleteUser(false); }}><FontAwesomeIcon icon={faEdit} /></CButton>
            {
              (props.role == 'Administrator') &&
                <CButton color="danger" size='sm' onClick={() => { setVisible(!visible); setDeleteUser(true); }}><FontAwesomeIcon icon={faTrash} /></CButton>
            }
        </CButtonGroup>
        <CModal 
            visible={visible} 
            onClose={() => setVisible(false)}
            animation="true"
            keyboard={false}
            backdrop={'static'}
            fullscreen
            >
          <CModalHeader>
            <CModalTitle>{props.action === 'update' ? 'Update User' : 'New User'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CNav className='modal__nav' variant='tabs' role="tablist" layout='fill' defaultValue={() => activeKey}>
                <CNavItem className='item__nav'>
                    <CNavLink
                        //href='javascript:void(0)'
                        active={activeKey === 1}
                        onClick={() => setActiveKey(1)}
                        className='modal__nav__item'
                        >
                        Home
                    </CNavLink>
                </CNavItem>
                <CNavItem className='item__nav'>
                    <CNavLink
                        //href='javascript:void(0)'
                        active={activeKey === 2}
                        onClick={() => setActiveKey(2)}
                        className='modal__nav__item'
                        >
                        Change Password
                    </CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                    <CRow>
                        <CCol sm={4}>
                            <CForm noValidate onSubmit={handleSubmit}>
                            <CFormInput
                              type="text"
                              label="Student Number"
                              placeholder="Enter Your Student Number"
                              onChange={(e) => setStudentNumber(e.target.value)}
                              value={studentNumber}
                              required
                            />
                                <CFormInput
                                    type="text"
                                    label="First Name"
                                    placeholder="Enter Your First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    //required = {firstName === "" ? true : false}
                                    
                                />
                                <CFormInput
                                    type="text"
                                    label="Last Name"
                                    placeholder="Enter Your Lastname"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    //required = {lastName === "" ? true : false}
                                />
                                <CDatePicker date={dob} label="Date of Birth" locale="en-CA" onDateChange={(date) => { setDob(date.toLocaleDateString("fr-CA")); }} />
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
                                    //required = {mobile === "" ? true : false}
                                />
                                <CFormInput
                                    type="email"
                                    label="Email"
                                    placeholder="abc@email.com"
                                    disabled
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    //required = {username === "" ? true : false}
                                />
                                <CFormSelect 
                                aria-label="Select user type"
                                label="User Type"
                                disabled = {userType == "Administrator" ? false : true}
                                onChange={(e) => setUserType(e.target.value)}
                                value={userType}
                                >
                                    <option value="0">Select user type</option>
                                    {
                                    userTypeList.map((x,i)=>
                                        <option key={i} value={x.name}>{x.name}</option>
                                    )
                                    }
                                </CFormSelect>
                                <CFormSelect 
                                aria-label="Select Faculty"
                                label="Faculty"
                                onChange={(e) => handleFaculty(e)}
                                value={facultyId}
                                >
                                    <option value="0">Select faculty</option>
                                    {
                                    props?.facultyList && props?.facultyList.map((x,i)=>
                                        <option key={i} value={x.facultyId}>{x.facultyName}</option>
                                    )
                                    }
                                </CFormSelect>

                                <CFormSelect 
                                aria-label="Select department"
                                label="department"
                                onChange={(e) => setDepartmentId(e.target.value)}
                                value={departmentId}
                                >
                                    <option value="0">Select department</option>
                                    {
                                    departmentList.map((x,i)=>
                                        <option key={i} value={x.departmentId}>{x.departmentName}</option>
                                    )
                                    }
                                </CFormSelect> 
                            </CForm>
                        </CCol>
                        <CCol md={4}>
                          <table className='table'>
                            <tbody>
                              <tr>
                                <td>Last Login Date</td>
                                <td>{props.data?.lastLoginDate}</td>
                              </tr>
                            </tbody>
                          </table>
                        </CCol>
                        
                    </CRow>
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                    <CForm noValidate onSubmit={handleSubmit}>
                        <CCol md={4}>
                            <CFormInput
                                type="password"
                                label="New Password"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target?.value ?? '')}
                                value={password}
                            />
                            <br />
                            <CFormInput
                                type="password"
                                label="Confirm Password"
                                placeholder="Enter Password"
                                onChange={(e) => setConfirmPassword(e.target?.value ?? '')}
                                value={confirmPassword}
                            />
                            <br/>
                            <CButton type='button' color="primary" disabled={disabled} onClick={() => changePassword()}>{btnText}</CButton>
                        </CCol>
                    </CForm>
                </CTabPane>
            </CTabContent>
            
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton type='submit' className={deleteUser ? 'd-none' : ''} color="primary" onClick={() => { setValidated(true); handleSave(); }}>Save changes</CButton>
            {
              (props.role == 'Administrator') &&
                <CButton type='submit' className={deleteUser ? '' : 'd-none'} color="danger" onClick={() => { setValidated(true); handleSave(); }}>Delete {firstName}</CButton>
            }
            
          </CModalFooter>
        </CModal>
      </>
    );
  }

export default UpdateUserModal;