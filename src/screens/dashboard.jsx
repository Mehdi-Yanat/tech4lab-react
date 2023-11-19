import React, { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import Breadcrumbs from '../components/breadcrumbs'
import Dropdown from '../components/dropDown/dropdown'
import factoryImage from "../assets/images/factory.png"
import machineImage from "../assets/images/machineIcon.png"
import gearImage from "../assets/images/gear.png"
import usersImage from "../assets/images/users.png"
import { useCheckTokenQuery, useGetAllClientsQuery, useGetAllMachinesQuery, useGetAllPiecesQuery, useGetAllSitesQuery } from '../store/api'
import { getCookie } from 'react-use-cookie'
import Upload from './upload'
import Loading from './loading'
import Settings from '../components/settings'

function Dashboard() {

  const token = getCookie('auth-token')

  const [isAdmin, setIsAdmin] = useState(false)

  const [dropDownLink, setDropDownLink] = useState('')
  const { data: { user } } = useCheckTokenQuery(token);
  const { data: sites, isLoading, refetch } = useGetAllSitesQuery(token);
  const { data: machineData } = useGetAllMachinesQuery(token);
  const { data: piecesData } = useGetAllPiecesQuery(token);
  const { data: clientData } = useGetAllClientsQuery(token);

  useEffect(() => {
    const setIsAdminFunc = () => {
      if (user.role === 'admin') {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    }
    setIsAdminFunc()
  }, [user])

  console.log('====================================');
  console.log(clientData?.clients);
  console.log('====================================');

  return (
    <div className='layout'>
      {sites?.productionSites?.length ? <>
        <SideBar setDropDownLink={setDropDownLink} />
        <div className='dashboard'>
          <Breadcrumbs dropDownLink={dropDownLink} />
          {dropDownLink !== "/Settings" ? <>
            <Dropdown data={sites?.productionSites} setDropDownLink={setDropDownLink} id={"Sites de production"} dropDownLink={dropDownLink} alt={'factory'} img={factoryImage} name="Sites de production" />
            <Dropdown data={machineData?.machines} setDropDownLink={setDropDownLink} id={"Machines"} img={machineImage} dropDownLink={dropDownLink} alt={"machines"} name="Machines" />
            <Dropdown data={piecesData?.pieces} setDropDownLink={setDropDownLink} id={"Pièces"} img={gearImage} dropDownLink={dropDownLink} alt={"pieces"} name="Pièces" />
            {isAdmin ? <Dropdown data={clientData?.clients} setDropDownLink={setDropDownLink} id={"Utilisateurs"} img={usersImage} dropDownLink={dropDownLink} alt={"users"} name="Utilisateurs" /> : ''}
          </> : <Settings />}
        </div>
      </> :
        <>
          {isLoading ? <Loading /> : <Upload refetch={refetch} />}
        </>
      }
    </div>
  )
}

export default Dashboard
