import React, {useEffect, useState} from 'react'
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
  CButtonGroup
} from '@coreui/react-pro'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import HttpFunction from '../../../core/HttpFunction';
import UserModal from './UserModal';
import AppPagination from '../../../components/AppPagination';
import LoadSpinner from 'src/components/LoadSpinner';

// Import for toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '../../../core/Toast';
import UpdateUserModal from './UpdateUserModal';
import { SecurityEnum } from 'src/core/SecurityEnum';
//import DisplayFwidgetStatsUsers from 'src/views/administration/users/displayFwidgetStatsUsers';

const users = [
  {name: 'Tony', surname: 'Nyaba', email: 'tony@gmail.com', contact: '0717876654'},
  {name: 'Thabani', surname: 'Mkhize', email: 'thabani@gmail.com', contact: '0717876654'},
  {name: 'Lawrence', surname: 'Sthole', email: 'lawrence@gmail.com', contact: '0717876654'},
  {name: 'Siphokazi', surname: 'Faya', email: 'siphokazi@gmail.com', contact: '0717876654'},
  {name: 'Mnqobi', surname: 'Shangase', email: 'mnqobi@gmail.com', contact: '0717876654'},
  {name: 'Sandile', surname: 'Mhlungu', email: 'sandile@gmail.com', contact: '0717876654'},
]

const ListAllUsers = () => {
const [loading, setLoading] = useState(false);
const [userList, setUserList] = useState([]);
const [facultyList, setFacultyList] = useState([]);
const [departmentList, setDepartmentList] = useState([]);
const [history, setHistory] = useState([]);
//const [users, setUsers] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
//const [itemsPerPage, setItemsPerPage] = useState(5);
const [totalElements, setTotalElements] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const [searchText, setSearchText] = useState('');
const [searchBy, setSearchBy] = useState('');
const [searchType, setSearchType] = useState('');
const [role, setRole] = useState("");

const searchByList = ['First Name', 'Last Name', 'User Type', 'Email', 'Device Type', 'App Version', 'User Guid'];
const searchTypeList = ['Contains', 'Equals']


// Getting HTTP methods (POST, GET, PUT & DELETE)
const http = new HttpFunction();

 //Fetch users from server
 const fetchData = async (currentPage_, searchText_) => {
  setLoading(true);
  var url = `/api/v1/user?page=${currentPage_ - 1}&size=10&sort=firstName&searchText=${searchText_}`;
        const apiCall = await http.get(url);
       
        if(apiCall.code === 200) {
          setUserList(apiCall.data.content);
       
          //Pagination
          setTotalElements(apiCall.data.totalElements);
          setTotalPages(apiCall.data.totalPages);
          setLoading(false);
        
        }else if(apiCall === 204){
          toast.error('error occurred!!!', Toast.getToastOptions());
        }else{
          toast.error('error occurred!!!', Toast.getToastOptions());
        }

   setLoading(false);
}

// Fetch history from server
const fetchHistoryData = async () => {
  // var url = `/api/v1/history?page=0&size=10&sort=historyId,DESC&searchText=`;
      
  //       const apiCall = await http.get(url);
       
  //       if(apiCall.code === 200) {
  //         setHistory(apiCall.data.content);        
  //       }else if(apiCall === 204){
  //         toast.error('error occurred!!!', Toast.getToastOptions());
  //       }else{
  //         toast.error('error occurred!!!', Toast.getToastOptions());
  //       }
}



// Fetch faculty data from server
const fetchFacultyData = async (currentPage_, searchText_) => {
  const apiCall = await http.get(`/api/v1/faculty?page=${currentPage_ - 1}&size=10&sort=facultyName&searchText=${searchText_}`);
  if(apiCall.code === 200) {
    console.log("My Faculties")
    console.log(apiCall.data.content);
    setFacultyList(apiCall.data.content);
  } else {
    console.log('error occurred!!!', apiCall);
    toast.error('error occurred!!!', Toast.getToastOptions());
  }
}
//search
const handleSearch = () => {
  if(searchText !== '') {
    fetchData(0, searchText);
  }
}

//clear search
const handleClear = () => {
  if(searchText !== '') {
    fetchData(0, '');
    setSearchText('');
  }
}

const userProfile = async () => {
  var userProfile = JSON.parse(await localStorage.getItem(SecurityEnum.UserProfile));
  setRole(userProfile?.userType);
};

//Run whenever the component load
useEffect(() => {
  userProfile();
  fetchFacultyData(1, '');
  fetchHistoryData();
  //Loading users
  fetchData(1, '');      
},[]);

  return (
    loading ? <LoadSpinner /> :
    
    <>
    <CRow>
      <CCol xs={12}>
          
      <br></br>
      <CCard>
      <CCardHeader>
          <div className='row'>
              <div className='col-6'></div>
              <div className='col-6 text-end'>
                <UserModal
                  fetchData={fetchData}
                  facultyList={facultyList}
                  role={role}
                />
              </div>
          </div>
        </CCardHeader>
        <CCardBody>
        <div className='row mb-2'>
            <div className='col-8'>There are <strong>{totalElements}</strong> users in the system</div>
            <div className='col-4'>
              <CInputGroup>
                <CFormInput
                    type="text"
                    placeholder="Search User"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    feedbackInvalid="Enter user name"
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
                      <th>Student Number</th>
                      <th>Name</th>
                      <th>Surname</th>
                       <th>Sex</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Role</th>
                      <th className='text-end'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                
                    {
                      userList.map((x, i) =>
                        <tr key = {i}>
                          <td>{i + 1}</td>
                          <td>{x.studentNumber}</td>
                          <td>{x.firstName}</td>
                          <td>{x.lastName}</td>
                          <td>{x.gender}</td>
                          <td>{x.username}</td>
                          <td>{x.mobile}</td>
                          <td>{x.userType}</td>
                          <td className='text-end'>
                            <UpdateUserModal
                              fetchData={fetchData}
                              facultyList={facultyList}
                              history={history}
                              action='update'
                              data={x}
                              role={role}
                            />
                          </td>
                      </tr>
                    )}
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

export default ListAllUsers