import React, { useEffect, useState } from 'react'
import '../styles/upload.css'
import { useUploadMutation } from '../store/api';
import { getCookie } from 'react-use-cookie';
import { toast } from 'react-toastify';
import Loading from './loading';

function Upload({ refetch }) {

    const token = getCookie('auth-token')
    const [file, setFile] = useState(null);
    const [uploadMutation, { data, isLoading }] = useUploadMutation();

    useEffect(() => {
        if (data?.success) {
            setInterval(() => {
                refetch()
            }, 3000)
        }

    }, [data, refetch])

    if (isLoading) {
        return <Loading />
    }

    const handleFileChange = (event) => {
        // Update state with the selected file
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file');
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



    return (
        <div className='body'>
            <form className='form' onSubmit={handleSubmit} action="upload.php" method="POST">
                <input onChange={handleFileChange} type="file" />
                <p>Upload your excel file to load data {file ? <span>{file?.name}</span> : ''} </p>

                <button type="submit">Upload</button>
            </form>
        </div>

    )
}

export default Upload
