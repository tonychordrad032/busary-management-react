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
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CRow,
    CCol

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

const BursaryApplicationModal = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [ activeKey, setActiveKey] = useState(1);

    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false)
    const [deleteObj, setDeleteObj] = useState(false);
    
    // Form Field
    const [bursaryApplicationId, setBursaryApplicationId] = useState(0);
    const [fundingStatus, setFundingStatus] = useState("");
    const [fundingType, setFundingType] = useState("");
    const [fundingAwaiting, setFundingAwaiting] = useState("");

    // Personal
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [IdentityNumber, setIdentityNumber] = useState("");
    const [gender, setGender] = useState("");
    const [race, setRace] = useState("");
    const [isDisable, setIsDisable] = useState("");
    const [age, setAge] = useState("");
    const [homeLanguage, setHomeLanguage] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [birthCountry, setBirthCountry] = useState("");

    // Contact Details
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [studyAndResAddressSame, setStudyAndResAddressSame] = useState("");
    const [resPostalCode, setResPostalCode] = useState("");
    const [suburb, setSuburb] = useState("");
    const [municipality, setMunicipality] = useState("");
    const [province, setProvince] = useState("");
    const [areaClassification, setAreaClassification] = useState("");

    // Education
    const [qualification, setQualification] = useState("");
    const [enrolmentType, setEnrolmentType] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [haveCompletedQualification, setHaveCompletedQualification] = useState("");
    const [completedQualification, setCompletedQualification] = useState("");
    const [currentLevel, setCurrentLevel] = useState("");
    const [matricYear, setMatricYear] = useState("");
    const [highSchoolName, setHighSchoolName] = useState("");
    const [courseAverage, setCourseAverage] = useState("");
    const [haveRepeatingModule, setHaveRepeatingModule] = useState("");
    const [debt, setDebt] = useState("");
    const [lastYearFundingType, setLastFundingType] = useState("");
    const [sponsorship, setSponsorship] = useState("");
    const [tuitionFee, setTuitionFee] = useState("");
    const [residence, setResidence] = useState("");
    const [residenceFee, setResidenceFee] = useState("");

    // Employment
    const [employmentStatus, setEmploymentStatus] = useState("");

    




    const [fundingStatusList, setFundingStatusList] = useState([]);
    const [fundingTypeList, setFundingTypeList] = useState([]);
    const [fundingAwaitingList, setFundingAwaitingList] = useState([]);

    const http = new HttpFunction();

    // Initialize form field, on modal load
    const InitializeFormFields = (facultyObj) => {
        setLoading(true);
        //setFacultyId(facultyObj?.facultyId);
        //setFacultyName(facultyObj?.facultyName ?? '');
        setLoading(false);
    }

    const handleClose = () => {
        clearForm();
        setVisible(!visible);
    };

    //Handle Save
    const handleSave = async () => {
        // if (facultyName !== '' && facultyName !== undefined ) {
        //     setLoading(true);
        //     let data = {
        //         "facultyId": facultyId,
        //         "facultyName": facultyName
        //       }

        //       console.log(data);

        //       let res;

        //       if(props.action === 'update' && !deleteObj) {
        //           if (window.confirm(`Are you sure you want to update ${facultyName}?`) != true) {
        //               return;
        //           }
        //           res = await http.update('/api/v1/faculty', data);
        //       }else if(deleteObj){
        //           if (window.confirm(`Are you sure you want to delete ${facultyName}?`) != true) {
        //             return;
        //         }
        //           res = await http.delete('/api/v1/faculty/' + facultyId);
        //       }else{
        //         res = await http.post('/api/v1/faculty', data);
        //       }

        //     if(res.code === 200 || res.code === 201) {
        //         toast.success(res.data.responseMessage, Toast.getToastOptions());
        //         props.fetchData(1, '');
        //         clearForm();
        //         setLoading(false);
        //         handleClose();
        //     }else {
        //         toast.error(res.data.response.data.responseMessage, Toast.getToastOptions());
        //         setLoading(false);
        //     }
            
        // } else {
        //     setValidated(true);
        //     toast.error('Please complete the form', Toast.getToastOptions());
        // }
    };

    //Handle Save
    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false){
            event.preventDefault()
            event.stopPropagation()
            return;
        }
        setValidated(true)
    };

    const clearForm = () => {
        //setFacultyId('');
        //setFacultyName('');
    }

     //Fetch funding status from server
     const fetchFundingStatusData = async () => {
        setLoading(true);
        var url = `/api/v1/support-apis/funding-status`
        console.log("My URL");
        console.log(url);
        const apiCall = await http.get(url);
        if (apiCall.code === 200) {
            console.log("INSIDE THE IF");
            console.log(apiCall.data);
            setFundingStatusList(apiCall.data);
            setLoading(false);
        } else {
            console.log('error occurred!!!', apiCall);
            //toast.error('error occurred!!!', Toast.getToastOptions());
            setLoading(false);
        }
    }
    //Fetch funding type from server
    const fetchFundingTypeData = async () => {
        setLoading(true);
        var url = `/api/v1/support-apis/funding-type`
        console.log("My URL");
        console.log(url);
        const apiCall = await http.get(url);
        if (apiCall.code === 200) {
            console.log("INSIDE THE IF");
            console.log(apiCall.data);
            setFundingStatusList(apiCall.data);
            setLoading(false);
        } else {
            console.log('error occurred!!!', apiCall);
            //toast.error('error occurred!!!', Toast.getToastOptions());
            setLoading(false);
        }
    }

    //Fetch funding awaiting from server
    const fetchFundingAwaitingData = async () => {
        setLoading(true);
        var url = `/api/v1/support-apis/bursary-application-status`
        console.log("My URL");
        console.log(url);
        const apiCall = await http.get(url);
        if (apiCall.code === 200) {
            console.log("INSIDE THE IF");
            console.log(apiCall.data);
            setFundingAwaitingList(apiCall.data);
            setLoading(false);
        } else {
            console.log('error occurred!!!', apiCall);
            //toast.error('error occurred!!!', Toast.getToastOptions());
            setLoading(false);
        }
    }


    
    useEffect(() => {
        //fetchData(1, '');
        fetchFundingStatusData();
        fetchFundingTypeData();
        fetchFundingAwaitingData();
        console.log('useEffect', props);
        InitializeFormFields(props.data);
        
    }, [props.data]);

  return (
    <>
        <ToastContainer />
        {
              (props.role == 'Administrator') &&
                <CButton size='sm' className={props.action !== 'update' ? '' : 'd-none'} onClick={() => setVisible(!visible)}>Add New</CButton>
        }
        
        <CButtonGroup className={props.action === 'update' ? '' : 'd-none'} role="group">
              <CButton color="warning" size='sm' onClick={() => { setVisible(!visible); setDeleteObj(false); }}><FontAwesomeIcon icon={faEdit} /></CButton>
              {
                  (props.role == 'Administrator') &&
                    <CButton color="danger" size='sm' onClick={() => { setVisible(!visible); setDeleteObj(true); }}><FontAwesomeIcon icon={faTrash} /></CButton>
              }
        </CButtonGroup>

          <CModal
              visible={visible}
              onClose={() => setVisible(false)}
              animation={'true'}
              keyboard={false}
              backdrop={'static'}
              size='xl'
          >
              <CModalHeader>
                  <CModalTitle>{props.action === 'update' ? 'Update Bursary Application' : 'New Bursary Application'}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  <CForm 
                    noValidate
                    validated={validated} 
                    
        
                    >
                        <CNav className='modal__nav' variant='tabs' role="tablist" layout='fill' defaultValue={() => activeKey}>
                            <CNavItem className='item__nav'>
                                <CNavLink
                                    //href='javascript:void(0)'
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                    className='modal__nav__item'
                                    >
                                    General Information
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className='item__nav'>
                                <CNavLink
                                    //href='javascript:void(0)'
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                    className='modal__nav__item'
                                    >
                                    Personal Details
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className='item__nav'>
                                <CNavLink
                                    //href='javascript:void(0)'
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                    className='modal__nav__item'
                                    >
                                    Contact Details
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className='item__nav'>
                                <CNavLink
                                    //href='javascript:void(0)'
                                    active={activeKey === 4}
                                    onClick={() => setActiveKey(4)}
                                    className='modal__nav__item'
                                    >
                                    Education
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className='item__nav'>
                                <CNavLink
                                    //href='javascript:void(0)'
                                    active={activeKey === 5}
                                    onClick={() => setActiveKey(5)}
                                    className='modal__nav__item'
                                    >
                                    Employment
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className='item__nav'>
                                <CNavLink
                                    //href='javascript:void(0)'
                                    active={activeKey === 6}
                                    onClick={() => setActiveKey(6)}
                                    className='modal__nav__item'
                                    >
                                    Documents
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                <CRow>
                                    <br/>
                                    <br/>
                                    <CCol className='mt-3' sm={8}>
                                        <CForm noValidate onSubmit={handleSubmit}>
                                            <CFormSelect 
                                                aria-label="Do you currently or have history of any approved bursaries or funding?*"
                                                label="1. Do you currently or have history of any approved bursaries or funding?*"
                                                onChange={(e) => setFundingStatus(e.target.value)}
                                                required
                                                value={fundingStatus}>

                                                <option value="">Choose...</option>
                                                {
                                                fundingStatusList.map((x,i)=>
                                                    <option key={i} value={x}>{x}</option>
                                                )
                                                
                                                }  
                                            </CFormSelect>
                                            <br/>
                                            <CFormSelect 
                                                aria-label="2. What type of funding are you seeking? *"
                                                label="2. What type of funding are you seeking? *"
                                                onChange={(e) => setFundingType(e.target.value)}
                                                required
                                                value={fundingType}>

                                                <option value="">Choose...</option>
                                                {
                                                fundingStatusList.map((x,i)=>
                                                    <option key={i} value={x}>{x}</option>
                                                )
                                                
                                                }  
                                            </CFormSelect>
                                            <br/>
                                            <CFormSelect 
                                                aria-label="3. Are you waiting for outcome of any bursary applications you already submitted? *"
                                                label="3. Are you waiting for outcome of any bursary applications you already submitted? *"
                                                onChange={(e) => setFundingAwaiting(e.target.value)}
                                                required
                                                value={fundingAwaiting}>

                                                <option value="">Choose...</option>
                                                {
                                                fundingAwaitingList.map((x,i)=>
                                                    <option key={i} value={x}>{x}</option>
                                                )
                                                
                                                }  
                                            </CFormSelect>
                                        </CForm>
                                    </CCol>
                
                                    
                                </CRow>
                            
                                
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                <br/>
                                <h5><b>Personal Details</b></h5>
                                <br/>
                                <CForm  noValidate validated={validated} onSubmit={handleSubmit}  >
                                    <CCol md={8}>
                                        <CFormInput
                                            type="text"
                                            label="First Name"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            required
                                            feedbackInvalid="Please first name"
                                        />
                                        <br />
                                        <CFormInput
                                            type="text"
                                            label="Last Name"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            required
                                            feedbackInvalid="Please last name"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your South African ID Number *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setIdentityNumber(e.target.value)}
                                            value={IdentityNumber}
                                            required
                                            feedbackInvalid="Please identity number"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Select your Gender *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setGender(e.target.value)}
                                            value={gender}
                                            required
                                            feedbackInvalid="Please select gender"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Select your Race *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setRace(e.target.value)}
                                            value={race}
                                            required
                                            feedbackInvalid="Please select race"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Do you have any disabilities? *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setIsDisable(e.target.value)}
                                            value={isDisable}
                                            required
                                            feedbackInvalid="Please select valid option"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your current age *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setAge(e.target.value)}
                                            value={age}
                                            required
                                            feedbackInvalid="Please enter your age"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your home language *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setHomeLanguage(e.target.value)}
                                            value={homeLanguage}
                                            required
                                            feedbackInvalid="Please enter you home language"
                                        />
                                         
                                        {homeLanguage === "Other" ?? <div>
                                            <br />
                                            <CFormInput
                                            type="text"
                                            label="If other, please specify *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setHomeLanguage(e.target.value)}
                                            value={homeLanguage}
                                            required
                                            feedbackInvalid="Please last name"
                                        />
                                            </div>}
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Are you a South African? *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setCitizenship(e.target.value)}
                                            value={citizenship}
                                            required
                                            feedbackInvalid="Please select citizenship"
                                        />
                                         <br />
                                        <CFormInput
                                            type="number"
                                            label="Indicate you country of Birth *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setBirthCountry(e.target.value)}
                                            value={birthCountry}
                                            required
                                            feedbackInvalid="Please country of birth"
                                        />
                                    </CCol>
                                </CForm>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                            <br/>
                                <h5><b>Contact Details</b></h5>
                                <br/>
                                <CForm  noValidate validated={validated} onSubmit={handleSubmit}  >
                                    <CCol md={8}>
                                        <CFormInput
                                            type="text"
                                            label="Enter your e-mail address. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            feedbackInvalid="Please enter email"
                                        />
                                        <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your contact number. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setMobile(e.target.value)}
                                            value={mobile}
                                            required
                                            feedbackInvalid="Please enter mobile"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Is your study address the same as your residential address *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setStudyAndResAddressSame(e.target.value)}
                                            value={studyAndResAddressSame}
                                            required
                                            feedbackInvalid="Please select the option"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your Residential Address. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setResidence(e.target.value)}
                                            value={residence}
                                            required
                                            feedbackInvalid="Please enter residential address"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your Residential Postal code. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setResPostalCode(e.target.value)}
                                            value={resPostalCode}
                                            required
                                            feedbackInvalid="Please Residential Postal Code"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your Residential Suburb / District. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setSuburb(e.target.value)}
                                            value={suburb}
                                            required
                                            feedbackInvalid="Please enter suburb"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your Municipality. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setMunicipality(e.target.value)}
                                            value={municipality}
                                            required
                                            feedbackInvalid="Please enter municipality"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter your Province. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setProvince(e.target.value)}
                                            value={province}
                                            required
                                            feedbackInvalid="Please enter province"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Classify your residential address as RURAL / URBAN *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setAreaClassification(e.target.value)}
                                            value={areaClassification}
                                            required
                                            feedbackInvalid="Please select classification area"
                                        />
                                    </CCol>
                                </CForm>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 4}>
                                <h3>Education</h3>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 5}>
                                <h3>Employment</h3>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 6}>
                                <h3>Documents</h3>
                            </CTabPane>
                        </CTabContent>
                  </CForm>
              </CModalBody>
              <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                  </CButton>
                  {
                      (props.role == 'Administrator') &&
                        <CButton type='submit' className={deleteObj ? 'd-none' : ''} color="primary" onClick={() => { setValidated(true); handleSave(); }}>Save changes</CButton>
                  }

                  {
                      (props.role == 'Administrator') &&
                        <CButton type='submit' className={deleteObj ? '' : 'd-none'} color="danger" onClick={() => { setValidated(true); handleSave(); }}>Delete</CButton>
                  }
              </CModalFooter>
          </CModal>
    </>
  )
}

export default BursaryApplicationModal
