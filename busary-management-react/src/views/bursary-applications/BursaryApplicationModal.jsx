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
    const [formValidated, setFormValidated] = useState(false);
    
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
    const [countryOfBirth, setCountryOfBirth] = useState("");

    // Personal Plus
    const [applicationStatus, setApplicationStatus] = useState("");
    const [addressType, setAddressType] = useState("");
    const [postalAddress, setPostalAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disability, setDisability] = useState("");
    const [dob, setDob] = useState("");
    

    // Contact Details
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [studyAndResAddressSame, setStudyAndResAddressSame] = useState("");
    const [residentialAddress, setResidentialAddress] = useState("");
    const [resPostalCode, setResPostalCode] = useState("");
    const [suburb, setSuburb] = useState("");
    const [municipality, setMunicipality] = useState("");
    const [province, setProvince] = useState("");
    const [areaClassification, setAreaClassification] = useState("");

    // Education
    const [registeredQualification, setRegisteredQualification] = useState("");
    const [enrolmentType, setEnrolmentType] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [haveCompletedQualification, setHaveCompletedQualification] = useState("");
    const [completedQualification, setCompletedQualification] = useState("");
    const [currentLevel, setCurrentLevel] = useState("");
    const [currentAge, setCurrentAge] = useState("");
    const [matricYear, setMatricYear] = useState("");
    const [highSchoolName, setHighSchoolName] = useState("");
    const [courseAverage, setCourseAverage] = useState("");
    const [haveRepeatingModule, setHaveRepeatingModule] = useState("");
    const [debt, setDebt] = useState("");
    const [lastYearFundingType, setLastFundingType] = useState("");
    const [sponsorship, setSponsorship] = useState("");
    const [fundingSourceForPreviousYear, setFundingSourceForPreviousYear] = useState("");
    const [tuitionFee, setTuitionFee] = useState("");
    const [residence, setResidence] = useState("");
    const [residenceFee, setResidenceFee] = useState("");

    // Employment
    const [employmentStatus, setEmploymentStatus] = useState("");

    
    const [fundingStatusList, setFundingStatusList] = useState([]);
    const [fundingTypeList, setFundingTypeList] = useState([]);
    const [fundingAwaitingList, setFundingAwaitingList] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [raceList, setRaceList] = useState([]);
    const [disabilityList, setDisabilityList] = useState([]);
    const [enrolmentTypeList, setEnrolmentTypeList] = useState([]);
    const [homeLanguageList, setHomeLanguageList] = useState([]);
    const [citizenshipList, setCitizenshipList] = useState([]);
    const [areaClassificationList, setAreaClassificationList] = useState([]);
    const [qualificationList, setQualificationList] = useState([]);
    const [levelOfStudyList, setLevelOfStudyList] = useState([]);
    const [courseAverageList, setCourseAverageList] = useState([]);
    const [sponsorshipList, setSponsorshipList] = useState([]);
    const [residenceOptionList, setResidenceOptionList] = useState([]);
    const [employmentStatusList, setEmploymentStatusList] = useState([]);
    const [yesOrNoList, setYesOrNoList] = useState([]);
 

    const http = new HttpFunction();

    // Initialize form field, on modal load
    const InitializeFormFields = (bursaryObj) => {
        setLoading(true);
        // Personal Plus 
        
        // General Information
        setFundingStatus(bursaryObj?.fundingStatus);
        setFundingType(bursaryObj?.fundingType);
        setFundingAwaiting(bursaryObj?.fundingAwaiting);


        // Personal Details
        setFirstName(bursaryObj?.applicant?.firstName);
        setLastName(bursaryObj?.applicant?.lastName);
        setIdentityNumber(bursaryObj?.applicant?.identityNumber);
        setGender(bursaryObj?.applicant?.gender);
        setRace(bursaryObj?.applicant?.race);
        setIsDisable(bursaryObj?.applicant?.isDisable);
        setAge(bursaryObj?.applicant.age);
        setHomeLanguage(bursaryObj?.applicant?.homeLanguage);
        setCitizenship(bursaryObj?.applicant?.citizenship);
        setCountryOfBirth(bursaryObj?.applicant?.countryOfBirth);

        // Contact Details
        setEmail(bursaryObj?.applicant?.username);
        setMobile(bursaryObj?.applicant?.mobile);
        setStudyAndResAddressSame(bursaryObj?.studyAndResAddressSame);
        setResidentialAddress(bursaryObj?.residentialAddress);
        setResPostalCode(bursaryObj?.postalCode);
        setSuburb(bursaryObj?.suburb);
        setMunicipality(bursaryObj?.municipality);
        setProvince(bursaryObj?.province);
        setAreaClassification(bursaryObj?.addressClassification);

        // Education Section\
        setRegisteredQualification(bursaryObj?.registeredQualification);
        setEnrolmentType(bursaryObj?.enrolmentType);
        setStudentNumber(bursaryObj?.applicant?.studentNumber);
        setHaveCompletedQualification(bursaryObj?.haveCompletedQualification);
        setCompletedQualification(bursaryObj?.completedQualification);
        setCurrentLevel(bursaryObj?.currentLevel);
        setCurrentAge(bursaryObj?.applicant.age);
        setMatricYear(bursaryObj?.matricYear);
        setHighSchoolName(bursaryObj?.highSchoolName);
        setCourseAverage(bursaryObj?.previousYearAverage);
        setHaveRepeatingModule(bursaryObj?.completeOutstandingModule);
        setDebt(bursaryObj?.debt);
        setFundingSourceForPreviousYear(bursaryObj?.fundingSourceForPreviousYear);
        setResidence(bursaryObj?.residence);

        // Employment
        setEmploymentStatus(bursaryObj?.applicant?.employmentStatus);
        setLoading(false);
    }

    const validation = () => {
        if (studentNumber !== '' && studentNumber !== undefined ) {
            setFormValidated(true)
        }else{
            setFormValidated(false)
        }
    };

    const handleClose = () => {
        clearForm();
        setVisible(!visible);
    };

    //Handle Save
    const handleSave = async () => {
        if (studentNumber !== '' && studentNumber !== undefined ) {
            setLoading(true);
            let data = {
                "bursaryApplicationId": bursaryApplicationId,
                "studentNumber": studentNumber,
                "enrolmentType": enrolmentType,
                "matricYear": matricYear,
                "highSchoolName": highSchoolName,
                "debt": debt,
                "tuitionFee": tuitionFee,
                "fundingStatus": fundingStatus,
                "fundingType": fundingType,
                "applicationStatus": applicationStatus,
                "haveCompletedQualification": haveCompletedQualification,
                "completedQualification": completedQualification,
                "previousYearAverage": courseAverage,
                "completeOutstandingModule": haveRepeatingModule,
                "fundingSourceForPreviousYear": fundingSourceForPreviousYear,
                "residence": residence,
                "addressType": addressType,
                "postalAddress": postalAddress,
                "residentialAddress": residentialAddress,
                "studyAddressSameAsResidentialAddress": studyAndResAddressSame,
                "postalCode": postalCode,
                "suburb": suburb,
                "municipality": municipality,
                "province": province,
                "addressClassification": areaClassification,
                "registeredQualification": registeredQualification,
                "applicant": {
                    "userId": userId,
                    "username": username,
                    "password": password,
                    "updateFrom": "Web",
                    "studentNumber": studentNumber,
                    "firstName": firstName,
                    "lastName": lastName,
                    "gender": gender,
                    "identityNumber": IdentityNumber,
                    "passportNumber": IdentityNumber,
                    "mobile": mobile,
                    "race": race,
                    "age": age,
                    "homeLanguage": homeLanguage,
                    "citizenship": citizenship,
                    "countryOfBirth": countryOfBirth,
                    "employmentStatus": employmentStatus,
                    "disability": disability,
                    "dob": dob
                },
                "documents": [],
                "qualifications": []
              }

              console.log(data);

              let res;

              if(props.action === 'update' && !deleteObj) {
                  if (window.confirm(`Are you sure you want to update?`) != true) {
                      return;
                  }
                  res = await http.update('/api/v1/bursary-application', data);
              }else if(deleteObj){
                  if (window.confirm(`Are you sure you want to delete?`) != true) {
                    return;
                }
                  res = await http.delete('/api/v1/bursary-application/' + bursaryApplicationId);
              }else{
                res = await http.post('/api/v1/bursary-application', data);
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

     //Fetch settings from server
     const fetchSettingsData = async () => {
        setLoading(true);
        var url = `/api/v1/support-apis/settings`
        console.log("My URL");
        console.log(url);
        const apiCall = await http.get(url);
        if (apiCall.code === 200) {
            console.log("INSIDE THE IF");
            console.log(apiCall.data);
            setFundingStatusList(apiCall.data.fundingStatus);
            setFundingTypeList(apiCall.data.fundingType);
            setFundingAwaitingList(apiCall.data.bursaryApplicationStatus)
            setRaceList(apiCall.data.race);
            setGenderList(apiCall.data.gender);
            setDisabilityList(apiCall.data.disability);
            setEnrolmentTypeList(apiCall.data.enrolmentType);
            setHomeLanguageList(apiCall.data.homeLanguage);
            setCitizenshipList(apiCall.data.citizenship);
            setAreaClassificationList(apiCall.data.classificationArea);
            setQualificationList(apiCall.data.qualification);
            setLevelOfStudyList(apiCall.data.levelOfStudy);
            setCourseAverageList(apiCall.data.average);
            setSponsorshipList(apiCall.data.sponsorship);
            setResidenceOptionList(apiCall.data.residenceOption);
            setEmploymentStatusList(apiCall.data.employmentStatus);
            setYesOrNoList(apiCall.data.yesOrNo);
            setLoading(false);
        } else {
            console.log('error occurred!!!', apiCall);
            //toast.error('error occurred!!!', Toast.getToastOptions());
            setLoading(false);
        }
    }


    
    useEffect(() => {
        //fetchData(1, '');
        fetchSettingsData();
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
                                                fundingTypeList.map((x,i)=>
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
                                         <CFormSelect 
                                            aria-label="Select your Gender *"
                                            label="Select your Gender *"
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                            value={gender}>

                                            <option value="">Choose...</option>
                                            {
                                            genderList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                         <CFormSelect 
                                            aria-label="Select your race *"
                                            label="Select your race *"
                                            onChange={(e) => setRace(e.target.value)}
                                            required
                                            value={race}>

                                            <option value="">Choose...</option>
                                            {
                                            raceList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                         <CFormSelect 
                                            //aria-label="Select your Gender *"
                                            label="Do you have any disabilities? *"
                                            onChange={(e) => setIsDisable(e.target.value)}
                                            required
                                            value={isDisable}>

                                            <option value="">Choose...</option>
                                            {
                                            disabilityList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                        <CFormInput
                                            type="number"
                                            label="Enter your current age *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setAge(e.target.value)}
                                            value={age}
                                            required
                                            feedbackInvalid="Please enter your age"
                                        />
                                         <br />
                                         <CFormSelect 
                                            label="Enter your home language *"
                                            onChange={(e) => setHomeLanguage(e.target.value)}
                                            required
                                            value={homeLanguage}>

                                            <option value="">Choose...</option>
                                            {
                                            homeLanguageList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
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
                                         <CFormSelect 
                                            label="Are you a South African? *"
                                            onChange={(e) => setCitizenship(e.target.value)}
                                            required
                                            value={citizenship}>

                                            <option value="">Choose...</option>
                                            {
                                            citizenshipList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                        <CFormInput
                                            type="number"
                                            label="Indicate you country of Birth *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setCountryOfBirth(e.target.value)}
                                            value={countryOfBirth}
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
                                         <CFormSelect 
                                            label="Is your study address the same as your residential address *"
                                            onChange={(e) => setStudyAndResAddressSame(e.target.value)}
                                            required
                                            value={studyAndResAddressSame}>

                                            <option value="">Choose...</option>
                                            {
                                            yesOrNoList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
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
                                         <CFormSelect
                                            label="Classify your residential address as RURAL / URBAN *"
                                            onChange={(e) => setAreaClassification(e.target.value)}
                                            required
                                            value={areaClassification}>

                                            <option value="">Choose...</option>
                                            {
                                            areaClassificationList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                    </CCol>
                                </CForm>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 4}>
                            <br/>
                                <h5><b>Education</b></h5>
                                <br/>
                                <CForm  noValidate validated={validated} onSubmit={handleSubmit}  >
                                    <CCol md={8}>
                                        <CFormSelect 
                                            label="Select Registered Qualification to determine if you can move ahead with submission of your details *"
                                            onChange={(e) => setRegisteredQualification(e.target.value)}
                                            required
                                            value={registeredQualification}>

                                            <option value="">Choose...</option>
                                            {
                                            qualificationList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                        <br />
                                        <CFormSelect 
                                            label="Are you registered FULL-TIME for this qualification *"
                                            onChange={(e) => setEnrolmentType(e.target.value)}
                                            required
                                            value={enrolmentType}>

                                            <option value="">Choose...</option>
                                            {
                                            enrolmentTypeList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Please enter your student number *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setStudentNumber(e.target.value)}
                                            value={studentNumber}
                                            required
                                            feedbackInvalid="Please student number"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Have you completed any qualifications? *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setHaveCompletedQualification(e.target.value)}
                                            value={haveCompletedQualification}
                                            required
                                            feedbackInvalid="Please enter complete qualification"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Indicate your completed qualification *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setCompletedQualification(e.target.value)}
                                            value={completedQualification}
                                            required
                                            feedbackInvalid="Please enter complete qualification"
                                        />
                                         <br />
                                         <CFormSelect 
                                            label="Select the year of registration for your current qualification. *"
                                            onChange={(e) => setCurrentLevel(e.target.value)}
                                            required
                                            value={currentLevel}>

                                            <option value="">Choose...</option>
                                            {
                                            levelOfStudyList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                        {currentLevel === "Other" ?? <div>
                                            <br />
                                            <CFormInput
                                                type="text"
                                                label="If other, please specify *"
                                                placeholder="Enter your answer"
                                                onChange={(e) => setCurrentLevel(e.target.value)}
                                                value={currentLevel}
                                                required
                                                //feedbackInvalid="Please last name"
                                            />
                                            </div>}
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
                                            label="Enter the year you completed matric. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setMatricYear(e.target.value)}
                                            value={matricYear}
                                            required
                                            //feedbackInvalid="Please enter you home language"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="Enter the name of your high school. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setHighSchoolName(e.target.value)}
                                            value={highSchoolName}
                                            required
                                            feedbackInvalid="Please enter high school name"
                                        />
                                         <br />
                                         <CFormSelect
                                            label="Select your previous years average. *"
                                            onChange={(e) => setCourseAverage(e.target.value)}
                                            required
                                            value={courseAverage}>

                                            <option value="">Choose...</option>
                                            {
                                            courseAverageList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                         <CFormSelect 
                                            label="Are you currently repeating any modules from your previous year registration? *"
                                            onChange={(e) => setHaveRepeatingModule(e.target.value)}
                                            required
                                            value={haveRepeatingModule}>

                                            <option value="">Choose...</option>
                                            {
                                            yesOrNoList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                         <CFormSelect 
                                            label="Do you have any historic debt owed to DUT? *"
                                            onChange={(e) => setDebt(e.target.value)}
                                            required
                                            value={debt}>

                                            <option value="">Choose...</option>
                                            {
                                            yesOrNoList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="How did you fund your previous year. If it was a bursary indicate the name of bursary or NSFAS or self funded. *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setLastFundingType(e.target.value)}
                                            value={lastYearFundingType}
                                            required
                                            feedbackInvalid="Please select course average"
                                        />
                                         <br />
                                        <CFormInput
                                            type="text"
                                            label="What funding resource did you use to pay for your 2021 year of studies? *"
                                            placeholder="Enter your answer"
                                            onChange={(e) => setSponsorship(e.target.value)}
                                            value={sponsorship}
                                            required
                                            //feedbackInvalid="Please select course average"
                                        />
                                        {sponsorship === "Other" ?? <div>
                                            <br />
                                            <CFormInput
                                                type="text"
                                                label="If other, please specify *"
                                                placeholder="Enter your answer"
                                                onChange={(e) => setSponsorship(e.target.value)}
                                                value={sponsorship}
                                                required
                                                //feedbackInvalid="Please last name"
                                            />
                                            </div>}
                                            <br />
                                            <CFormSelect 
                                                label="Do you pay for residence or stay at home? *"
                                                onChange={(e) => setResidence(e.target.value)}
                                                required
                                                value={residence}>

                                                <option value="">Choose...</option>
                                                {
                                                residenceOptionList.map((x,i)=>
                                                    <option key={i} value={x}>{x}</option>
                                                )
                                                
                                                }  
                                            </CFormSelect>
                                    </CCol>
                                </CForm>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 5}>
                            <br/>
                                <h5><b>Personal Details</b></h5>
                                <br/>
                                <CForm  noValidate validated={validated} onSubmit={handleSubmit}  >
                                    <CCol md={8}>
                                         <CFormSelect 
                                            label="Enter your latest Employment status. *"
                                            onChange={(e) => setEmploymentStatus(e.target.value)}
                                            required
                                            value={employmentStatus}>

                                            <option value="">Choose...</option>
                                            {
                                            employmentStatusList.map((x,i)=>
                                                <option key={i} value={x}>{x}</option>
                                            )
                                            
                                            }  
                                        </CFormSelect>
                                       
                                    </CCol>
                                </CForm>
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
