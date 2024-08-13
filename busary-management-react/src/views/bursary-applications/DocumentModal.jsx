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

const DocumentModal = (props) => {

    const [isLoading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false)
    const [deleteObj, setDeleteObj] = useState(false);
    
    // Form Field
    const [documentId, setDocumentId] = useState(0);
    const [documentName, setDocumentName] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [file, setFile] = useState("");

    const documentTypeList = [
        {id: 1, name: "ID Copy"},
        {id: 2, name: "Fee Statement"},
        {id: 3, name: "Academic Record"},
        {id: 4, name: "Academic Transcript"},
        {id: 5, name: "Qualification"},
        {id: 6, name: "Other"}
    ];


    const http = new HttpFunction();

    // Initialize form field, on modal load
    const InitializeFormFields = (documentObj) => {
        setLoading(true);
        setDocumentId(documentObj?.documentId);
        setDocumentName(documentObj?.documentName);
        setDocumentType(documentObj?.documentType);
        setLoading(false);
    }

    const handleClose = () => {
        clearForm();
        setVisible(!visible);
    };

    const handleFile = (e) =>{
        console.log("Files Uploading");
        console.log(e.target.files);
        setFile(e.target.files[0]);
    }

    //Handle Save
    const handleSave = async () => {
        const formData = new FormData();
        if (documentName !== '' && documentName !== undefined ) {
            setLoading(true);
            let data = {
                "documentId": documentId,
                "documentName": documentName,
                "documentType": documentType
            }
            formData.append('data', data);
            formData.append('file', file);

              console.log(formData);

              let res;

              if(props.action === 'update' && !deleteObj) {
                  if (window.confirm(`Are you sure you want to update ${documentName}?`) != true) {
                      return;
                  }
                  res = await http.update('/api/v1/document', formData);
              }else if(deleteObj){
                  if (window.confirm(`Are you sure you want to delete ${documentName}?`) != true) {
                    return;
                }
                  res = await http.delete('/api/v1/document/' + documentId);
              }else{
                res = await http.post('/api/v1/document/data-and-image', formData);
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
        handleSave();
        setValidated(true);
    };

    const clearForm = () => {
        setDocumentId('');
        setDocumentName('');
        setDocumentType('');
    }


    
    useEffect(() => {
        //fetchData(1, '');
        console.log('useEffect', props);
        InitializeFormFields(props.data);
        
    }, [props.data]);

  return (
    <>
        <ToastContainer />
      
        <CButton size='sm' className={props.action !== 'update' ? '' : 'd-none'} onClick={() => setVisible(!visible)}>Add New</CButton>
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
                  <CModalTitle>{props.action === 'update' ? 'Update Document' : 'New Document'}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  <CForm 
                    noValidate
                    validated={validated}  
                    >
                        <CFormInput
                          type="text"
                          label="Document Name"
                          placeholder="Enter Document Name"
                          onChange={(e) => setDocumentName(e.target.value)}
                          value={documentName}
                          required
                        />
                        <CFormSelect 
                            aria-label="Select Document Type"
                            label="Document Type"
                            onChange={(e) => setDocumentType(e.target.value)}
                            value={documentType}
                            feedbackInvalid="Please select document type"
                            required
                            >
                                <option value="">Select Document Type</option>
                                {
                                documentTypeList.map((x,i)=>
                                    <option key={i} value={x.name}>{x.name}</option>
                                )
                                }
                        
                        </CFormSelect>
                        <CFormInput type="file" id="formFile" label="Document" onChange={handleFile} />
                  </CForm>
              </CModalBody>
              <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                  </CButton>
                  <CButton type='submit' className={deleteObj ? 'd-none' : ''} color="primary" onClick={() => {handleSubmit(); }}>Save changes</CButton>

                  {
                      (props.role == 'Administrator') &&
                        <CButton type='submit' className={deleteObj ? '' : 'd-none'} color="danger" onClick={() => { handleSubmit(); }}>Delete</CButton>
                  }
              </CModalFooter>
          </CModal>
    </>
  )
}

export default DocumentModal
