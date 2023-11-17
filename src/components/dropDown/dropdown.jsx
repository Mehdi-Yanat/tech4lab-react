import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndustry, faBars, faX } from '@fortawesome/free-solid-svg-icons'
import DropdownContent from './dropdownContent'


function Dropdown({ name , img}) {

  const [isDropdownOn, setIsDropdownOn] = useState(false)

  return (
    <div className='dropdownContainer' >
      <div onClick={() => setIsDropdownOn(value => !value)} className='dropdown' >
        <FontAwesomeIcon className='menu' icon={isDropdownOn ? faX : faBars} />
        <div>
          <FontAwesomeIcon className='dropdownIcon' icon={faIndustry} />
        </div>
        <div>
          <p>{name}</p>
          <span>
            (3 sites)
          </span>
        </div>
      </div>
      <div className={`dropdownBox ${isDropdownOn ? 'dropdownOn' : ''}`}>
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
        <DropdownContent />
      </div>
    </div>
  )
}

export default Dropdown
