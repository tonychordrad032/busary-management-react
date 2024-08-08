import React, { useState, useEffect } from 'react'
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
    CDatePicker,
    CFormLabel,
    CInputGroup,
    CInputGroupText
} from '@coreui/react-pro'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

// Import for toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HttpFunction from 'src/core/HttpFunction';
import { Toast } from 'src/core/Toast';
import LoadSpinner from 'src/components/LoadSpinner';

const UserModal = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false)
    const [deleteObj, setDeleteObj] = useState(false);
    
    
    // Form Field
    const [userId, setUserId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [facultyId, setFacultyId] = useState(0);
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [deleteUser, setDeleteUser] = useState(false)
    const [userType, setUserType] = useState('');
    const [departmentId, setDepartmentId] = useState(0);
    const [departmentList, setDepartmentList] = useState([]);
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(new Date());
    const [studentNumber, setStudentNumber] = useState('');
    const [race, setRace] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');

    const http = new HttpFunction();

    const userTypeList = [
        {id: 1, name: 'Administrator'}, 
        {id: 2, name: 'Student'}
    ]

    // Initialize form field, on modal load
    const InitializeFormFields = (userObj) => {
        setLoading(true);
        setUserId(userObj?.userId);
        setStudentNumber(userObj?.studentNumber);
        setIdentityNumber(userObj?.identityNumber);
        setFirstName(userObj?.firstName);
        setLastName(userObj?.lastName);
        setDob(userObj?.dob);
        setMobile(userObj?.mobile);
        setUserType(userObj?.userType);
        setLoading(false);
    }

    const handleClose = () => {
        clearForm();
        setVisible(!visible);
    };

    //Handle Save
    const handleSave = async () => {
        if (firstName !== '' && firstName !== undefined ) {
            setLoading(true);
            let data = {
                "userId": userId,
                "username": username,
                "profilePicture": "string",
                "studentNumber": studentNumber,
                "firstName": firstName,
                "lastName": lastName,
                "gender": gender,
                "userType": userType,
                "identityNumber": identityNumber,
                "passportNumber": "",
                "mobile": mobile,
                "race": race,
                "department": {
                  "departmentId": departmentId
                },
                "dob": dob
              }

              console.log(data);

              let res;

              if(props.action === 'update' && !deleteObj) {
                  if (window.confirm(`Are you sure you want to update ${firstName}?`) != true) {
                      return;
                  }
                  res = await http.update('/api/v1/user', data);
              }else if(deleteObj){
                  if (window.confirm(`Are you sure you want to delete ${firstName}?`) != true) {
                    return;
                }
                  res = await http.delete('/api/v1/user/' + userId);
              }else{
                res = await http.post('/api/v1/user', data);
              }

            if(res.code === 200 || res.code === 201) {
                toast.success(res.data.responseMessage, Toast.getToastOptions());
                props.fetchData(1, '');
                clearForm();
                setLoading(false);
                handleClose();
            }else {
                toast.error(res.data.response.data.responseMessage, Toast.getToastOptions());
                setLoading(false);
            }
            
        } else {
            setValidated(true);
            toast.error('Please complete the form', Toast.getToastOptions());
        }
    };

     // Handle Departmet
  const handleDepartment = (e) => {
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

  //Handle Save
  const handleSubmit = async (event) => {
      setValidated(true)
      handleSave();
  };

  const clearForm = () => {
      setUserId('');
      setFirstName('');
  }




    
    useEffect(() => {
        //fetchData(1, '');
        console.log('useEffect', props);
        InitializeFormFields(props.data);
        
    }, [props.data]);

    return (
        <>
          <ToastContainer />
          {
          (props.role === 'Administrator') &&
            <CButton size='sm' className={props.action !== 'update' ? '' : 'd-none'} onClick={() => setVisible(!visible)}>Add New</CButton>
        }

          <CButtonGroup  className={props.action === 'update' ? '' : 'd-none'} role="group">
              <CButton color="warning" size='sm' onClick={() => {setVisible(!visible); setDeleteUser(false); }}><FontAwesomeIcon icon={faEdit} /></CButton>
                <CButton color="danger" size='sm' onClick={() => {setVisible(!visible); setDeleteUser(true); }}><FontAwesomeIcon icon={faTrash}/></CButton>
              
          </CButtonGroup>
          <CModal 
              visible={visible} 
              onClose={() => {setVisible(false); setValidated(false); clearForm()}}
              animation={'true'}
              keyboard={false}
              backdrop={'static'}
              >
            <CModalHeader>
              <CModalTitle>{props.action === 'update' ? 'Update User' : 'New User'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm 
               noValidate
               validated={validated}
              >
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
                  
                  <CFormSelect 
                  aria-label="Select user role"
                  label="User Role"
                  onChange={(e) => setUserType(e.target.value)}
                  value={userType}
                  feedbackInvalid="Please select a user role"
                  required
                  >
                      <option value="">Select User Role</option>
                      {
                      userTypeList.map((x,i)=>
                          <option key={i} value={x.name}>{x.name}</option>
                      )
                      }
                  
                  </CFormSelect>
                  <CFormSelect 
                    aria-label="Select faculty"
                    label="Faculty"
                    onChange={(e) => handleDepartment(e)}
                    value={facultyId}
                    feedbackInvalid="Please select a faculty"
                    required
                    >
                      <option value="">Select faculty</option>
                      {
                      props?.facultyList && props?.facultyList.map((x,i)=>
                          <option key={i} value={x.facultyId}>{x.facultyName}</option>
                      )
                      }
                  </CFormSelect>
  
                  <CFormSelect 
                    aria-label="Select department"
                    label="Department"
                    onChange={(e) => setDepartmentId(e.target.value)}
                    value={departmentId}
                    id="validationCustom04"
                    feedbackInvalid="Please select department"
                    required
                    >
                      <option value="">Select department</option>
                      {
                      departmentList.map((x,i)=>
                          <option key={i} value={x.facultyId}>{x.departmentName}</option>
                      )
                      }
                  </CFormSelect>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => {setVisible(false); clearForm(); setValidated(false)} }>
                Close
              </CButton>
              <CButton type='submit' className={deleteUser ? 'd-none' : ''} color="primary" onClick={() => { handleSubmit(); }}>Save changes</CButton>
              <CButton type='submit' className={deleteUser ? '' : 'd-none'} color="danger" onClick={() => { handleSubmit(); }}>Delete {firstName}</CButton>
            </CModalFooter>
          </CModal>
        </>
      );
}

export default UserModal
