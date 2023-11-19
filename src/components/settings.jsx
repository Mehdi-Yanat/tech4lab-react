import React, { useState } from 'react'
import Input from '../elements/Input'
import '../styles/settings.css'
import Button from '../elements/Button'
import { getCookie } from 'react-use-cookie'
import { useChangePasswordMutation, useUploadMutation } from '../store/api'
import { toast } from 'react-toastify'

function Settings() {

    const token = getCookie('auth-token')
    const [file, setFile] = useState(null);
    const [uploadMutation] = useUploadMutation();
    const [changePassword] = useChangePasswordMutation();
    const [formValue, setFormValues] = useState({
        password: ''
    })

    const handleFileChange = (event) => {
        // Update state with the selected file
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            toast.warn('Please select a file');
            return;
        }

        // Call the mutation function to send the file to the server
        try {
            const response = await uploadMutation({ file, token });
            // Handle success
            if (response.data?.success) {
                toast.success(response.data.message);
            } else {
                toast.warn(response.error?.data.message);
            }
        } catch (error) {
            console.error('File upload failed', error);
        }
    };

    const changePasswordFunc = async (e) => {
        e.preventDefault();
        try {
            const result = await changePassword({ password: formValue.password, token }).unwrap();
            toast.success(result?.message)
        } catch (error) {
            if (Array.isArray(error.data?.message)) {
                error.data?.message.map(el => toast.warn(el))
            } else {
                toast.warn(error.data?.message)
            }
        }
    }

    return (
        <div className='settingsContainer'>
            <form onSubmit={changePasswordFunc} className='settings'>
                <p> Change password </p>
                <div className='formInputPassword' >
                    <label>Mot de passe</label>
                    <Input placeholder="*********" type="password" value={formValue.password} setFormValues={setFormValues} name={"password"} />
                </div>
                <div className='buttonContainer' >
                    <Button> Changer </Button>
                </div>
            </form>
            <form className='settings' onSubmit={handleSubmit} action="upload.php" method="POST">
                <input onChange={handleFileChange} type="file" />
                <p>Upload your excel file to load data {file ? <span>{file?.name}</span> : ''} </p>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default Settings
