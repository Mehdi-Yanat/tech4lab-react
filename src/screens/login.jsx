import React, { useState } from 'react'
import Input from '../elements/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Button from '../elements/Button'

function Login() {

    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    })

    return (
        <section className='loginSection'>

            <div>
                <div className='loginHeader' >
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <span>Connexion</span>
                </div>
                <div className='formLogin' >
                    <div className='formInputLogin'>
                        <label>Utilisateur</label>
                        <Input placeholder="Identifiant" type="text" value={formValues.username} setFormValues={setFormValues} name={"username"} />
                    </div>
                    <div className='formInputLogin' >
                        <label>Mot de passe</label>
                        <Input placeholder="*********" type="password" value={formValues.username} setFormValues={setFormValues} name={"username"} />
                    </div>
                    <div className='formButtonLogin' >
                        <Button > Se connecter </Button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Login
