import React, { useState } from 'react'
import SideBar from '../components/sideBar'
import Breadcrumbs from '../components/breadcrumbs'
import Dropdown from '../components/dropDown/dropdown'
import factoryImage from "../assets/images/factory.png"
import machineImage from "../assets/images/machineIcon.png"
import gearImage from "../assets/images/gear.png"
import usersImage from "../assets/images/users.png"

function Dashboard() {

  const [dropDownLink, setDropDownLink] = useState('')

  return (
    <div className='layout'>
      <SideBar setDropDownLink={setDropDownLink} />
      <div className='dashboard'>
        <Breadcrumbs dropDownLink={dropDownLink} />
        <Dropdown setDropDownLink={setDropDownLink} id={"Sites de production"} dropDownLink={dropDownLink} alt={'factory'} img={factoryImage} name="Sites de production" />
        <Dropdown setDropDownLink={setDropDownLink} id={"Machines"} img={machineImage} dropDownLink={dropDownLink} alt={"machines"} name="Machines" />
        <Dropdown setDropDownLink={setDropDownLink} id={"Pièces"} img={gearImage} dropDownLink={dropDownLink} alt={"pieces"} name="Pièces" />
        <Dropdown setDropDownLink={setDropDownLink} id={"Utilisateurs"} img={usersImage} dropDownLink={dropDownLink} alt={"users"} name="Utilisateurs" />
      </div>
    </div>
  )
}

export default Dashboard
