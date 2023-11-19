import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import DropdownContent from './dropdownContent'
import Button from '../../elements/Button'


function Dropdown({ name, img, alt, id, dropDownLink, setDropDownLink, data, setOpenPopup, refetchAll }) {

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
            ({data?.length} {id})
          </span>
        </div>
      </div>
      <div className={`dropdownBox ${isDropdownOn ? 'dropdownOn' : ''}`}>
        {data?.map((el, index) => <DropdownContent refetchAll={refetchAll} data={el} key={index} dropDownLink={dropDownLink} />)}
        <div className='addButton' >
          <Button onClick={() => setOpenPopup(true)} > Add {id} </Button>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
