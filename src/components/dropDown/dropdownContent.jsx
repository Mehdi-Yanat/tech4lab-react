import React, { useEffect } from 'react'
import siteImg from '../../assets/images/factory.png'
import machineImg from '../../assets/images/machineIcon.png'
import gearImg from '../../assets/images/gear.png'
import usersImg from '../../assets/images/users.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteClientMutation } from '../../store/api'
import { getCookie } from 'react-use-cookie'
import { toast } from 'react-toastify'
import Loading from '../../screens/loading'


function DropdownContent({ dropDownLink, data, refetchAll }) {

    const token = getCookie('auth-token')
    const [deleteClient, { data: deleteClientData, isLoading }] = useDeleteClientMutation()

    const handleDeleteFunc = async () => {
        try {

            const result = await deleteClient({ clientId: data.id, token }).unwrap();
            toast.success(result?.message)
        } catch (error) {
            if (Array.isArray(error.data?.message)) {
                error.data?.message.map(el => toast.warn(el))
            } else {
                toast.warn(error.data?.message)
            }
        }
    };

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


    const dropdowndata = () => {
        switch (dropDownLink) {
            case '/Sites de production':

                const piecesSites = data?.machines?.map(el => el.pieces)

                let piecesSumSites = piecesSites?.reduce((total, machine) => {
                    // Add the length of pieces in each machine to the total
                    return total + machine.length;
                }, 0);

                return <div className='dropdownContentText'>
                    <p>{data?.placeName || 'No Data Available'}</p>
                    <ul>
                        <li> Machines ({data?.machines?.length || 'No Data Available'}) </li>
                        <li> Pièces ({piecesSumSites || 'No Data Available'}) </li>
                    </ul>
                </div>
            case '/Machines':
                return <div className='dropdownContentText'>
                    <p>{data?.machineName || 'No Data Available'}</p>
                    <ul>
                        <li> {data?.productionSite?.placeName || 'No Data Available'} </li>
                        <li> Pièces ({data?.pieces?.length || 'No Data Available'}) </li>
                    </ul>
                </div>
            case '/Pièces':
                return <div className='dropdownContentText'>
                    <p>{data?.pieceName || 'No Data Available'}</p>
                    <ul>
                        <li> {data?.machine?.machineName || 'No Data Available'} </li>
                        <li> {data?.machine?.productionSite?.placeName || 'No Data Available'} </li>
                    </ul>
                </div>
            case '/Utilisateurs':
                return <div className='dropdownContentText'>
                    <div className='deleteIcone'>
                        <FontAwesomeIcon onClick={handleDeleteFunc} icon={faTrash} style={{ cursor: "pointer" }} />
                    </div>
                    <p>{data?.username || 'No Data Available'}</p>
                    <ul>
                        {data.productionSite?.length ? data?.productionSite?.map((el, index) => <li key={index} > {el.placeName} </li>) : 'No Data Available'}
                    </ul>
                </div>
            default:
                break;
        }
    }

    useEffect(() => {
        if (deleteClientData?.success) {
            refetchAll()
        }
    }, [deleteClientData, refetchAll])

    if (isLoading) {
        return <Loading />
    }



    return (
        <div className='dropdownContent'>

            <div>
                <img src={dropdownimage()} alt='site' />
            </div>
            {dropdowndata()}
        </div>
    )
}

export default DropdownContent
