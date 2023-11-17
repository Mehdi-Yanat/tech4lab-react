import React from 'react'
import siteImg from '../../assets/images/factory.png'
import machineImg from '../../assets/images/machineIcon.png'
import gearImg from '../../assets/images/gear.png'
import usersImg from '../../assets/images/users.png'

function DropdownContent({ dropDownLink }) {

    const dropdownimage = () => {
        switch (dropDownLink) {
            case '/Sites de production':
                return siteImg
            case '/Machines':
                return machineImg
            case '/Pièces':
                return gearImg
            case '/Utilisateurs':
                return usersImg
            default:
                break;
        }
    }

    return (
        <div className='dropdownContent'>
            <div>
                <img src={dropdownimage()} alt='site' />
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
