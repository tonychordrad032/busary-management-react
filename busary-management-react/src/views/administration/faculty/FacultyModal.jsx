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

const FacultyModal = (props) => {
    const [isLoading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false)
    const [deleteObj, setDeleteObj] = useState(false);
    
    // Form Field
    const [facultyId, setFacultyId] = useState(0);
    const [facultyName, setFacultyName] = useState("");

    const http = new HttpFunction();

    // Initialize form field, on modal load
    const InitializeFormFields = (facultyObj) => {
        setLoading(true);
        setFacultyId(facultyObj?.facultyId);
        setFacultyName(facultyObj?.facultyName ?? '');
        setLoading(false);
    }

    const handleClose = () => {
        clearForm();
        setVisible(!visible);
    };

    //Handle Save
    const handleSave = async () => {
        if (facultyName !== '' && facultyName !== undefined ) {
            setLoading(true);
            let data = {
                "facultyId": facultyId,
                "facultyName": facultyName
              }

              console.log(data);

              let res;

              if(props.action === 'update' && !deleteObj) {
                  if (window.confirm(`Are you sure you want to update ${facultyName}?`) != true) {
                      return;
                  }
                  res = await http.update('/api/v1/faculty', data);
              }else if(deleteObj){
                  if (window.confirm(`Are you sure you want to delete ${facultyName}?`) != true) {
                    return;
                }
                  res = await http.delete('/api/v1/faculty/' + facultyId);
              }else{
                res = await http.post('/api/v1/faculty', data);
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
        setFacultyId('');
        setFacultyName('');
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
                  <CModalTitle>{props.action === 'update' ? 'Update Faculty' : 'New Faculty'}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  <CForm 
                    noValidate
                    validated={validated}  
                    >
                        <CFormInput
                          type="text"
                          label="Faculty Name"
                          placeholder="Enter Faculty Name"
                          onChange={(e) => setFacultyName(e.target.value)}
                          value={facultyName}
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

export default FacultyModal
