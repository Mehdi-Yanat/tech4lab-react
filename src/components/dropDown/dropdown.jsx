import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import DropdownContent from './dropdownContent'


function Dropdown({ name, img, alt, id, dropDownLink, setDropDownLink }) {

  const [isDropdownOn, setIsDropdownOn] = useState(false)

  useEffect(() => {
    if (isDropdownOn) {
      setDropDownLink(`/${id}`)
    }
  }, [isDropdownOn])

  useEffect(() => {
    if (dropDownLink === "/") {
      setIsDropdownOn(false)
    }

    if (dropDownLink !== `/${id}`) {
      setIsDropdownOn(false)
    } else {
      setIsDropdownOn(true)
    }
  }, [dropDownLink, id])

  return (
    <div className='dropdownContainer' >
      <div onClick={() => setIsDropdownOn(value => !value)} className='dropdown' >
        <FontAwesomeIcon className='menu' icon={isDropdownOn ? faX : faBars} />
        <div>
          <img className='dropdownIcon' src={img} alt={alt} />
        </div>
        <div>
          <p>{name}</p>
          <span>
            (3 sites)
          </span>
        </div>
      </div>
      <div className={`dropdownBox ${isDropdownOn ? 'dropdownOn' : ''}`}>
        <DropdownContent dropDownLink={dropDownLink} />
        <DropdownContent dropDownLink={dropDownLink} />
        <DropdownContent dropDownLink={dropDownLink} />
      </div>
    </div>
  )
}

export default Dropdown
