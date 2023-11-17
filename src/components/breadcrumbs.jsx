import React from 'react'

function Breadcrumbs({ dropDownLink }) {
  return (
    <div className='breadcrumbs' >
      <span> {`> Home${dropDownLink} `}</span>
    </div>
  )
}

export default Breadcrumbs
