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

const DepartmentModal = (props) => {
    const [isLoading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false)
    const [deleteObj, setDeleteObj] = useState(false);
    
    // Form Field
    const [facultyId, setFacultyId] = useState(0);
    const [facultyList, setFacultyList] = useState([]);
    const [departmentId, setDepartmentId] = useState(0);
    const [departmentName, setDepartmentName] = useState("");

    const http = new HttpFunction();

    // Initialize form field, on modal load
    const InitializeFormFields = (departmentObj) => {
        setLoading(true);
        setDepartmentId(departmentObj?.departmentId);
        setFacultyId(departmentObj?.faculty?.facultyId);
        setDepartmentName(departmentObj?.departmentName ?? '');
        setLoading(false);
    }

    const handleClose = () => {
        clearForm();
        setVisible(!visible);
    };

    //Handle Save
    const handleSave = async () => {
        if (departmentName !== '' && departmentName !== undefined && departmentId !== '' || departmentId !== undefined) {
            setLoading(true);
            let data = {
                "departmentId": departmentId,
                "departmentName": departmentName,
                "faculty": {
                  "facultyId": facultyId
                }
              }

              console.log(data);

              let res;

              if(props.action === 'update' && !deleteObj) {
                  if (window.confirm(`Are you sure you want to update ${departmentName}?`) != true) {
                      return;
                  }
                  res = await http.update('/api/v1/department', data);
              }else if(deleteObj){
                  if (window.confirm(`Are you sure you want to delete ${departmentName}?`) != true) {
                    return;
                }
                  res = await http.delete('/api/v1/department/' + departmentId);
              }else{
                res = await http.post('/api/v1/department', data);
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
        setDepartmentId('');
        setDepartmentName('');
    }

    const fetchFacultyData = async (currentPage_, searchText_) => {
        setLoading(true);
        const apiCall = await http.get(`/api/v1/faculty?page=${currentPage_ - 1}&size=10&sort=facultyName&searchText=${searchText_}`);
        if (apiCall.code === 200) {
            console.log("XXXXXXXXX");
            console.log(apiCall)
            setFacultyList(apiCall.data.results);
            setLoading(false);
        } else {
            console.log('error occurred!!!', apiCall);
            //toast.error('error occurred!!!', Toast.getToastOptions());
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchFacultyData();
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
                  <CModalTitle>{props.action === 'update' ? 'Update Department' : 'New Department'}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  <CForm 
                    noValidate
                    validated={validated}  
                    >
                        <CFormSelect 
                            aria-label="Select Faculty"
                            label="Faculty"
                            onChange={(e) => setFacultyId(e.target.value)}
                            required
                            value={facultyId}>

                            <option value="">Select Faculty</option>
                            {
                            facultyList && facultyList.map((x,i)=>
                                <option key={i} value={x.facultyId}>{x.facultyName}</option>
                            )
                            
                            }  
                        </CFormSelect>
                        <CFormInput
                          type="text"
                          label="Department Name"
                          placeholder="Enter Department Name"
                          onChange={(e) => setDepartmentName(e.target.value)}
                          value={departmentName}
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
                        <CButton type='submit' className={deleteObj ? '' : 'd-none'} color="danger" onClick={() => { setValidated(true); handleSave(); }}>Delete {departmentName}</CButton>
                  }
              </CModalFooter>
          </CModal>
    </>
  )
}

export default DepartmentModal
