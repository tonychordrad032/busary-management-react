import React, { useEffect } from 'react'

import { CPagination, CPaginationItem } from '@coreui/react-pro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from '@fortawesome/free-solid-svg-icons'

const AppPagination = (props) => {
  useEffect(() => {
    //console.log(props);
  }, [props])

  const firstPage = () => {
    props.setCurrentPage(1)
    //console.log('First page <- currentPage ', props.currentPage);
    props.fetchData(1, '')
  }

  const nextPage = () => {
    //console.log('nextPage -> currentPage ', props.currentPage);
    /*if(currentPage < Math.ceil(totalElements / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
        fetchData(currentPage);
        
    }*/

    props.setCurrentPage(props.currentPage + 1)
    props.fetchData(props.currentPage + 1, '')
  }

  const prevPage = () => {
    //console.log('prevPage <- currentPage ', props.currentPage);
    /**if(currentPage > 1) {
        setCurrentPage(currentPage - 1);
        fetchData(currentPage);
    }*/

    props.setCurrentPage(props.currentPage - 1)
    props.fetchData(props.currentPage - 1, '')
  }

  const lastPage = () => {
    //console.log('Last page -> currentPage ', props.currentPage);
    props.setCurrentPage(props.totalPages)
    props.fetchData(props.totalPages, '')
  }

  return (
    <>
      <div style={{ float: 'left' }}>
        Showing page {props.currentPage} of {props.totalPages}
      </div>
      <div style={{ float: 'right' }}>
        <CPagination 
          align="center" 
          aria-label="Page navigation example"
        >
          <CPaginationItem disabled={props.currentPage === 1 ? true : false} onClick={firstPage}><FontAwesomeIcon icon={faFastBackward} /> First</CPaginationItem>
          <CPaginationItem disabled={props.currentPage === 1 ? true : false} onClick={prevPage}><FontAwesomeIcon icon={faStepBackward} /> Previous</CPaginationItem>
          <CPaginationItem>{props.currentPage}</CPaginationItem>
          <CPaginationItem disabled={props.currentPage === props.totalPages ? true : false} onClick={nextPage}><FontAwesomeIcon icon={faStepForward} /> Next</CPaginationItem>
          <CPaginationItem disabled={props.currentPage === props.totalPages ? true : false} onClick={lastPage}><FontAwesomeIcon icon={faFastForward} /> Last</CPaginationItem>
        </CPagination>
      </div>
    </>
  );
}

export default AppPagination;