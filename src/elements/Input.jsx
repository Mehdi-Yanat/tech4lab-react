import React from 'react'

function Input({ name, setFormValues, value, placeholder, type }) {
    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={(e) => setFormValues((prevValues) => ({
                ...prevValues,
                [name]: e.target.value
            }))}
        />
    );
}

export default Input
