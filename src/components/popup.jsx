import React, { useEffect, useState } from 'react'
import '../styles/popup.css'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from '../elements/Input'
import Button from '../elements/Button'
import { toast } from 'react-toastify'
import { useAddClientMutation, useAddMachineMutation, useAddPiecesMutation, useAddProductionSiteMutation } from '../store/api'
import { getCookie } from 'react-use-cookie'
import Loading from '../screens/loading'

function Popup({ dropDownLink, setOpenPopup, sites, machines, pieces, refetchAll, clients, user }) {

    const token = getCookie('auth-token')

    const [addProductionSite, { data: addProductionSiteData, isLoading: addProductionSiteLoading }] = useAddProductionSiteMutation()
    const [addMachine, { data: addMachineData, isLoading: addMachineLoading }] = useAddMachineMutation()
    const [addPieces, { data: addPiecesData, isLoading: addPiecesLoading }] = useAddPiecesMutation()
    const [addClient, { data: addClientData, isLoading: addClientLoading }] = useAddClientMutation()

    const [formValuesSites, setFormValuesSites] = useState({
        placeName: "",
        ClientId: 0
    })

    const [formValuesMachines, setFormValuesMachines] = useState({
        machineName: "",
        ClientId: 0,
        productionSiteId: 0
    })

    const [formValuesPieces, setFormValuesPieces] = useState({
        pieceName: "",
        ClientId: 0,
        productionSiteId: 0,
        machineId: 0
    })

    const [formValuesClients, setFormValuesClients] = useState({
        username: "",
        password: "",
        productionSiteId: 0
    })

    useEffect(() => {
        if (addProductionSiteData?.success || addMachineData?.success || addPiecesData?.success || addClientData?.success) {
            refetchAll()
        }
    }, [addProductionSiteData, addMachineData, addPiecesData, addClientData, refetchAll])


    const renderInput = () => {
        switch (dropDownLink) {
            case '/Sites de production':
                return <>
                    <div className='formInputPopup'>
                        <label>Place Name</label>
                        <Input placeholder="Site de production" type="text" value={formValuesSites.placeName} setFormValues={setFormValuesSites} name={"placeName"} />
                    </div>
                    {user.role === "admin" ? <div className='formInputPopup'>
                        <label>Client id</label>
                        <select
                            value={formValuesSites.ClientId}
                            onChange={(e) => setFormValuesSites({ ...formValuesSites, ClientId: parseInt(e.target.value) })}
                        >
                            <option value="">Select Client</option>
                            {clients.map((el, index) => <option key={el.id} value={el.id}>{el.username}</option>)}
                        </select>
                    </div> : ''}
                    <div className={"submitBtn"}>
                        <Button onClick={(e) => handleAddFunc(e, formValuesSites)}>
                            Submit
                        </Button>
                    </div>
                </>

            case '/Machines':

                return <>
                    <div className='formInputPopup'>
                        <label>Machine Name</label>
                        <Input placeholder="Machine Name" type="text" value={formValuesMachines.machineName} setFormValues={setFormValuesMachines} name={"machineName"} />
                    </div>
                    {user.role === "admin" ? <div className='formInputPopup'>
                        <label>Client id</label>
                        <select
                            value={formValuesMachines.ClientId}
                            onChange={(e) => setFormValuesMachines({ ...formValuesMachines, ClientId: parseInt(e.target.value) })}
                        >
                            <option value="">Select Client</option>
                            {clients.map((el, index) => <option key={el?.id} value={el?.id}>{el?.username}</option>)}
                        </select>
                    </div> : ''}
                    <div className='formInputPopup'>
                        <label>Production Site</label>
                        <select
                            value={formValuesMachines.productionSiteId}
                            onChange={(e) => setFormValuesMachines({ ...formValuesMachines, productionSiteId: parseInt(e.target.value) })}
                        >
                            <option value="">Select Production Site</option>
                            {sites.map((el, index) => <option key={el?.id} value={el?.id}>{el?.placeName}</option>)}
                        </select>
                    </div>
                    <div className={"submitBtn"}>
                        <Button onClick={(e) => handleAddFunc(e, formValuesMachines)}>
                            Submit
                        </Button>
                    </div>
                </>

            case '/Pièces':
                return <>
                    <div className='formInputPopup'>
                        <label>Pieces Name</label>
                        <Input placeholder="Pieces Name" type="text" value={formValuesPieces.pieceName} setFormValues={setFormValuesPieces} name={"pieceName"} />
                    </div>
                    {user.role === "admin" ? <div className='formInputPopup'>
                        <label>Client id</label>
                        <select
                            value={formValuesPieces.ClientId}
                            onChange={(e) => setFormValuesPieces({ ...formValuesPieces, ClientId: parseInt(e.target.value) })}
                        >
                            <option value="">Select Client</option>
                            {clients.map((el, index) => <option key={el.id} value={el.id}>{el.username}</option>)}
                        </select>
                    </div> : ''}
                    <div className='formInputPopup'>
                        <label>Production Site</label>
                        <select
                            value={formValuesPieces.productionSiteId}
                            onChange={(e) => setFormValuesPieces({ ...formValuesPieces, productionSiteId: parseInt(e.target.value) })}
                        >
                            <option value="">Select Production Site</option>
                            {sites.map((el, index) => <option key={el?.id} value={el?.id}>{el?.placeName}</option>)}
                        </select>
                    </div>
                    <div className='formInputPopup'>
                        <label>Machine</label>
                        <select
                            value={formValuesPieces.machineId}
                            onChange={(e) => setFormValuesPieces({ ...formValuesPieces, machineId: parseInt(e.target.value) })}
                        >
                            <option value="">Machines</option>
                            {machines.map((el, index) => <option key={el?.id} value={el?.id}>{el?.machineName}</option>)}
                        </select>
                    </div>
                    <div className={"submitBtn"}>
                        <Button onClick={(e) => handleAddFunc(e, formValuesPieces)}>
                            Submit
                        </Button>
                    </div>
                </>

            case '/Utilisateurs':
                return <>
                    <div className='formInputPopup'>
                        <label>Client Name</label>
                        <Input placeholder="username" type="text" value={formValuesClients.username} setFormValues={setFormValuesClients} name={"username"} />
                    </div>
                    <div className='formInputPopup'>
                        <label>Client Password</label>
                        <Input placeholder="password" type="password" value={formValuesClients.password} setFormValues={setFormValuesClients} name={"password"} />
                    </div>
                    <div className='formInputPopup'>
                        <label>Production Site</label>
                        <select
                            value={formValuesClients.productionSiteId}
                            onChange={(e) => setFormValuesClients({ ...formValuesClients, productionSiteId: parseInt(e.target.value) })}
                        >
                            <option value="">Select Production Site</option>
                            {sites.map((el, index) => <option key={el?.id} value={el?.id}>{el?.placeName}</option>)}
                        </select>
                    </div>
                    <div className={"submitBtn"}>
                        <Button onClick={(e) => handleAddFunc(e, formValuesClients)}>
                            Submit
                        </Button>
                    </div>
                </>

            default:
                break;
        }
    }

    const handleAddFunc = async (event, data) => {
        event?.preventDefault()
        try {
            let result
            switch (dropDownLink) {
                case "/Sites de production":
                    result = await addProductionSite({ data, token }).unwrap();
                    break;
                case "/Machines":
                    result = await addMachine({ data, token }).unwrap();
                    break;
                case "/Pièces":
                    result = await addPieces({ data, token }).unwrap();
                    break;
                case "/Utilisateurs":
                    result = await addClient({ data, token }).unwrap();
                    break;
                default:
                    break;
            }
            toast.success(result?.message)
        } catch (error) {
            if (Array.isArray(error.data?.message)) {
                error.data?.message.map(el => toast.warn(el))
            } else {
                toast.warn(error.data?.message)
            }
        }
    };

    if (addProductionSiteLoading || addPiecesLoading || addMachineLoading || addClientLoading) {
        return <Loading />
    }

    return (
        <div className='popupContainer'>

            <div className='popup'>
                <div className='closeBtn' >
                    <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => setOpenPopup(false)} icon={faX} />
                </div>
                {renderInput()}
            </div>

        </div>
    )
}

export default Popup
