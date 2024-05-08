import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2024 FAI .</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.dut.ac.za" target="_blank" rel="noopener noreferrer">
          Durban University of Technology
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
