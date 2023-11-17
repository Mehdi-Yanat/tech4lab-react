import React from 'react'
import SideBar from '../components/sideBar'
import Breadcrumbs from '../components/breadcrumbs'
import Dropdown from '../components/dropDown/dropdown'
import { faIndustry } from '@fortawesome/free-solid-svg-icons'


function Dashboard() {
  return (
    <div className='layout'>
      <SideBar />
      <div className='dashboard'>
        <Breadcrumbs />
        <Dropdown name="Sites de production" />
        <Dropdown name="Machines" />
        <Dropdown name="Pièces" />
        <Dropdown name="Utilisateurs" />
      </div>
    </div>
  )
}

export default Dashboard
