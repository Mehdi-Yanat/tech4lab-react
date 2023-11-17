import React from 'react'
import SiteProd from '../../assets/images/siteProd.png'

function DropdownContent() {
    return (
        <div className='dropdownContent'>
            <div>
                <img src={SiteProd} alt='site' />
            </div>
            <div className='dropdownContentText'>
                <p>Site de production #1</p>
                <ul>
                    <li> machine (1) </li>
                    <li> machine (2) </li>
                </ul>
            </div>
        </div>
    )
}

export default DropdownContent
