import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIndustry, faUsers, faCubes, faGear } from '@fortawesome/free-solid-svg-icons'
import MachineIcon from '../assets/images/machine.png'

function SideBar() {
    return (
        <nav className='sideBavNav' >
            <ul>
                <li>
                    <FontAwesomeIcon className='sideBarIcon' icon={faHouse} />
                </li>
                <li>
                    <FontAwesomeIcon className='sideBarIcon' icon={faIndustry} />
                </li>
                <li>
                    <img className='sideBarIcon' src={MachineIcon} alt="" />
                </li>
                <li>
                    <FontAwesomeIcon className='sideBarIcon' icon={faCubes} />
                </li>
                <li>
                    <FontAwesomeIcon className='sideBarIcon' icon={faUsers} />
                </li>
            </ul>
            <div>
                <FontAwesomeIcon className='sideBarIcon' icon={faGear} />
            </div>
        </nav>
    )
}

export default SideBar
