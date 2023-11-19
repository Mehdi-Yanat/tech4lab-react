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
import Error from './error'
import Popup from '../components/popup'

function Dashboard() {

  const token = getCookie('auth-token')


  const [isAdmin, setIsAdmin] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)

  const [dropDownLink, setDropDownLink] = useState('')
  const { data: { user } } = useCheckTokenQuery(token);
  const { data: sites, isLoading, refetch: refetchSites } = useGetAllSitesQuery(token);
  const { data: machineData, refetch: refetchMachines } = useGetAllMachinesQuery(token);
  const { data: piecesData, refetch: refetchPieces } = useGetAllPiecesQuery(token);
  const { data: clientData, refetch: refetchClients } = useGetAllClientsQuery(token);

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

  const refetchAll = () => {
    refetchSites()
    refetchMachines()
    refetchPieces()
    refetchClients()
  }


  return (
    <div className='layout'>
      {openPopup ? <Popup user={user} refetchAll={refetchAll} setOpenPopup={setOpenPopup}
        clients={clientData?.clients} sites={sites?.productionSites} machines={machineData?.machines} pieces={piecesData?.pieces}
        dropDownLink={dropDownLink} /> : ''}
      {sites?.productionSites?.length ? <>
        <SideBar setDropDownLink={setDropDownLink} />
        <div className='dashboard'>
          <Breadcrumbs dropDownLink={dropDownLink} />
          {dropDownLink !== "/Settings" ? <>
            <Dropdown refetchAll={null} setOpenPopup={setOpenPopup} data={sites?.productionSites} setDropDownLink={setDropDownLink} id={"Sites de production"} dropDownLink={dropDownLink} alt={'factory'} img={factoryImage} name="Sites de production" />
            <Dropdown refetchAll={null} setOpenPopup={setOpenPopup} data={machineData?.machines} setDropDownLink={setDropDownLink} id={"Machines"} img={machineImage} dropDownLink={dropDownLink} alt={"machines"} name="Machines" />
            <Dropdown refetchAll={null} setOpenPopup={setOpenPopup} data={piecesData?.pieces} setDropDownLink={setDropDownLink} id={"Pièces"} img={gearImage} dropDownLink={dropDownLink} alt={"pieces"} name="Pièces" />
            {isAdmin ? <Dropdown refetchAll={refetchAll} setOpenPopup={setOpenPopup} data={clientData?.clients} setDropDownLink={setDropDownLink} id={"Utilisateurs"} img={usersImage} dropDownLink={dropDownLink} alt={"users"} name="Utilisateurs" /> : ''}
          </> : <Settings user={user} />}
        </div>
      </> :
        <>
          {isLoading ? <Loading /> : isAdmin ? <Upload refetch={refetchSites} /> : <Error message={"No Data on database!"} />}
        </>
      }
    </div>
  )
}

export default Dashboard
