import React, { useEffect, useState } from 'react'
import '../styles/popup.css'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from '../elements/Input'
import Button from '../elements/Button'
import { toast } from 'react-toastify'
import { useAddMachineMutation, useAddProductionSiteMutation } from '../store/api'
import { getCookie } from 'react-use-cookie'
import Loading from '../screens/loading'

function Popup({ dropDownLink, setOpenPopup, popupData, refetchAll }) {

    const token = getCookie('auth-token')

    const [addProductionSite, { data: addProductionSiteData, isLoading: addProductionSiteLoading }] = useAddProductionSiteMutation()
    const [addMachine, { data: addMachineData, isLoading }] = useAddMachineMutation()

    const [formValuesSites, setFormValuesSites] = useState({
        placeName: "",
    })

    const [formValuesMachines, setFormValuesMachines] = useState({
        machineName: "",
        productionSiteId: 0
    })

    const [formValuesPieces, setFormValuesPieces] = useState({
        placeName: "",
        clientsId: ""
    })

    useEffect(() => {
        if (addProductionSiteData?.success || addMachineData?.success) {
            refetchAll()
        }
    }, [addProductionSiteData, addMachineData, refetchAll])


    const renderInput = () => {
        switch (dropDownLink) {
            case '/Sites de production':
                return <>
                    <div className='formInputPopup'>
                        <label>Place Name</label>
                        <Input placeholder="Site de production" type="text" value={formValuesSites.placeName} setFormValues={setFormValuesSites} name={"placeName"} />
                    </div>
                    <div className={"submitBtn"}>
                        <Button onClick={(e) => handleAddFunc(e, formValuesSites)}>
                            Submit
                        </Button>
                    </div>
                </>

            case '/Machines':

                const productionSite = popupData?.map(el => el.productionSite)
                const uniqueProductionSites = Array.from(new Set(productionSite.map(el => el.id)))
                    .map(id => productionSite.find(site => site.id === id));

                return <>
                    <div className='formInputPopup'>
                        <label>Machine Name</label>
                        <Input placeholder="Site de production" type="text" value={formValuesMachines.machineName} setFormValues={setFormValuesMachines} name={"machineName"} />
                    </div>
                    <div className='formInputPopup'>
                        <label>Production Site</label>
                        <select
                            value={formValuesMachines.productionSiteId}
                            onChange={(e) => setFormValuesMachines({ ...formValuesMachines, productionSiteId: parseInt(e.target.value) })}
                        >
                            <option value="">Select Production Site</option>
                            {uniqueProductionSites.map((el, index) => <option key={el.id} value={el.id}>{el.placeName}</option>)}
                        </select>
                    </div>
                    <div className={"submitBtn"}>
                        <Button onClick={(e) => handleAddFunc(e, formValuesMachines)}>
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

    if (addProductionSiteLoading) {
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
