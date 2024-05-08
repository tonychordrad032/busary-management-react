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
    CFormSelect
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

const QualificationModal = (props) => {
    const [isLoading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false)
    const [deleteObj, setDeleteObj] = useState(false);
    
    // Form Field
    const [qualificationId, setQualificationId] = useState(0);
    const [qualificationName, setQualificationName] = useState("");
    const [institution, setInstitution] = useState("");
    const [enrolmentStatus, setEnrolmentStatus] = useState("");

    const http = new HttpFunction();

    // Initialize form field, on modal load
    const InitializeFormFields = (qualificationObj) => {
        setLoading(true);
        setQualificationId(qualificationObj?.qualificationId);
        setQualificationName(qualificationObj?.qualificationName ?? '');
        setInstitution(qualificationObj?.institution ?? "");
        setEnrolmentStatus(qualificationObj?.enrolmentStatus ?? "");
        setLoading(false);
    }

    const handleClose = () => {
        clearForm();
        setVisible(!visible);
    };

    //Handle Save
    const handleSave = async () => {
        if (qualificationName !== '' && qualificationName !== undefined ) {
            setLoading(true);
            let data = {
                "qualificationId": qualificationId,
                "qualificationName": qualificationName,
                "institution": institution,
                "enrolmentStatus": enrolmentStatus
              }

              console.log(data);

              let res;

              if(props.action === 'update' && !deleteObj) {
                  if (window.confirm(`Are you sure you want to update ${qualificationName}?`) != true) {
                      return;
                  }
                  res = await http.update('/api/v1/qualification', data);
              }else if(deleteObj){
                  if (window.confirm(`Are you sure you want to delete ${qualificationName}?`) != true) {
                    return;
                }
                  console.log("My qualification ==> " + qualificationId)
                  res = await http.delete('/api/v1/qualification?id=' + qualificationId);
              }else{
                res = await http.post('/api/v1/qualification', data);
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
        setQualificationId('');
        setQualificationName('');
        setInstitution('');
        setEnrolmentStatus('');
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
          >
              <CModalHeader>
                  <CModalTitle>{props.action === 'update' ? 'Update Qualification' : 'New Qualification'}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  <CForm 
                    noValidate
                    validated={validated}  
                    >
                        <CFormInput
                          type="text"
                          label="Qualification Name"
                          placeholder="Enter Qualification Name"
                          onChange={(e) => setQualificationName(e.target.value)}
                          value={qualificationName}
                          required
                      />
                      <CFormInput
                          type="text"
                          label="Institution"
                          placeholder="Enter Insttution Name"
                          onChange={(e) => setInstitution(e.target.value)}
                          value={institution}
                          required
                      />
                      <CFormInput
                          type="text"
                          label="Enrolment Status"
                          placeholder="Enter Enrolment Status"
                          onChange={(e) => setEnrolmentStatus(e.target.value)}
                          value={enrolmentStatus}
                          required
                      />
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

export default QualificationModal
