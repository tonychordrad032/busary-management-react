import React, { useEffect, useState } from 'react';
import HttpFunction from 'src/core/HttpFunction';
import { AppPagination } from 'src/components';
import DepartmentModal from 'src/views/administration/departments/DepartmentModal'
import {
    Table,
} from 'react-bootstrap'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CInputGroup,
    CButton,
    CFormInput,
    CFormSelect,
    CButtonGroup,
} from '@coreui/react-pro'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadSpinner from 'src/components/LoadSpinner';
import { Toast } from '../../../core/Toast';
import { toast } from 'react-toastify';
import {
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { SecurityEnum } from 'src/core/SecurityEnum';

const ListDepartments = () => {
    const [isLoading, setLoading] = useState(false);
    const [departmentList, setSetDepartmentLis] = useState([]);
    const [role, setRole] = useState("");
    
    const [currentPage, setCurrentPage] = useState(1);
    //const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [searchType, setSearchType] = useState('');

    const baseURL = process.env.REACT_APP_BACKEND_URL;

    // Getting HTTP methods (POST, GET, PUT & DELETE)
    const http = new HttpFunction();

    const userProfile = async () => {
        var userProfile = JSON.parse(await localStorage.getItem(SecurityEnum.UserProfile));
        setRole('Administrator');
    };

    //Fetch regions from server
    const fetchData = async (currentPage_, searchText_) => {
        setLoading(true);
        console.log("Start fetching departments")
        var url = `/api/v1/department?page=${currentPage_ - 1}&size=10&sort=departmentName&searchText=${searchText_}`;
      
      
        const apiCall = await http.get(url);
       
        if(apiCall.code === 200) {
          console.log(apiCall.data.content);
          setSetDepartmentLis(apiCall.data.content);
       
          //Pagination
          setTotalElements(apiCall.data.totalElements);
          setTotalPages(apiCall.data.totalPages);
          setLoading(false);
        
        }else if(apiCall === 204){
          console.log("Empty search");
          setLoading(false);
        }else{
          console.log('error occurred!!!', apiCall);
          toast.error('error occurred!!!', Toast.getToastOptions());
          setLoading(false);
        }
    }

    //search
    const handleSearch = () => {
        if (searchText !== '') {
            fetchData(0, searchText);
        }
    }

    //clear search
    const handleClear = () => {
        if (searchText !== '') {
            fetchData(0, '');
            setSearchText('');
        }
    }

    //Run whenever the component load
    useEffect(() => {
        userProfile();
        fetchData(1, '');
    }, []);

  return (
    <>
    <CRow>
        <CCol xs={12}>
            <CCard>
                <CCardHeader>
                    <div className='row'>
                        <div className='col-6'></div>
                        <div className='col-6 text-end'>
                        <DepartmentModal 
                            fetchData={fetchData}
                            role={role}
                        />
                        </div>
                    </div>
                </CCardHeader>
                    <CCardBody>
                        <div className='row mb-2'>
                              <div className='col-8'>There are <strong>{departmentList.length}</strong> departments in the system</div>
                            <div className='col-4'>
                                <CInputGroup>
                                    <CFormInput
                                        type="text"
                                        placeholder="Search department"
                                        onChange={(e) => setSearchText(e.target.value)}
                                        value={searchText}
                                        feedbackInvalid="Enter department name"
                                    />
                                    <CButton type="button" color="secondary" variant="outline" onClick={handleClear}><FontAwesomeIcon icon={faTimes} /></CButton>
                                    <CButton type="button" color="secondary" variant="outline" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></CButton>
                                </CInputGroup>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Department Name</th>
                                            <th>Fuculty</th>
                                            <th className='text-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                              departmentList.map((x, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{x?.departmentName}</td>
                                                    <td>{x?.faculty?.facultyName}</td>
                                                    <td className='text-end'>
                                                        <DepartmentModal 
                                                            fetchData={fetchData}
                                                            action='update'
                                                            data={x}
                                                            role={role}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </CCardBody> 
                    <CCardFooter>
                        <AppPagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            setTotalPages={setTotalPages}
                            fetchData={fetchData}
                        />
                    </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
    </>
  )
}

export default ListDepartments
