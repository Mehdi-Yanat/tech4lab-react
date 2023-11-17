import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIndustry, faUsers, faCubes, faGear } from '@fortawesome/free-solid-svg-icons'
import MachineIcon from '../assets/images/machine.png'

function SideBar({ setDropDownLink }) {
    return (
        <nav className='sideBavNav' >
            <ul>
                <li >
                    <FontAwesomeIcon onClick={() => setDropDownLink('/')} className='sideBarIcon' icon={faHouse} />
                </li>
                <li>
                    <FontAwesomeIcon onClick={() => setDropDownLink('/Sites de production')} className='sideBarIcon' icon={faIndustry} />
                </li>
                <li>
                    <img className='sideBarIcon' onClick={() => setDropDownLink('/Machines')} src={MachineIcon} alt="" />
                </li>
                <li>
                    <FontAwesomeIcon className='sideBarIcon' onClick={() => setDropDownLink('/Pièces')} icon={faCubes} />
                </li>
                <li>
                    <FontAwesomeIcon className='sideBarIcon' onClick={() => setDropDownLink('/Utilisateurs')} icon={faUsers} />
                </li>
            </ul>
            <div>
                <FontAwesomeIcon className='sideBarIcon' icon={faGear} />
            </div>
        </nav>
    )
}

export default SideBar
