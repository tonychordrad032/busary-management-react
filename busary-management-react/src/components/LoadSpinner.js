import { RotatingLines } from 'react-loader-spinner'
import React from 'react'


const LoadSpinner = (isLoading) => {
  return (
    <div className='text-center'>
       <RotatingLines
        className="justify-content-center"
        visible={isLoading}
        height="96"
        width="96"
        color='#e1ebe1'
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
   
  )
}

export default React.memo(LoadSpinner)