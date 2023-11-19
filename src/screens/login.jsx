import React, { useEffect, useState } from 'react'
import Input from '../elements/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Button from '../elements/Button'
import { useCheckTokenQuery, useLoginMutation } from '../store/api'
import { toast } from 'react-toastify'
import { getCookie, setCookie } from 'react-use-cookie'
import { useNavigate } from 'react-router-dom'
import Loading from './loading'

function Login() {

    const token = getCookie('auth-token')
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    })

    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const { data, isLoading } = useCheckTokenQuery(token);


    const handleLogin = async (event, credentials) => {
        event?.preventDefault()
        try {
            const result = await login(credentials).unwrap();
            setCookie('auth-token', result.access_token, {
                days: 7,
                Secure: true,
            });
            toast.success(result?.message)
            navigate('/');
        } catch (error) {
            if (Array.isArray(error.data?.message)) {
                error.data?.message.map(el => toast.warn(el))
            } else {
                toast.warn(error.data?.message)
            }
        }
    };

    useEffect(() => {

        if (data && data.success) {
            navigate('/');
        }


    }, [data, data?.success, navigate]);

    if (isLoading || loginLoading) {
        return <Loading />;
    }


    return (
        <section className='loginSection'>

            <div>
                <div className='loginHeader' >
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <span>Connexion</span>
                </div>
                <form onSubmit={(event) => handleLogin(event, formValues)} className='formLogin' >
                    <div className='formInputLogin'>
                        <label>Utilisateur</label>
                        <Input placeholder="Identifiant" type="text" value={formValues.username} setFormValues={setFormValues} name={"username"} />
                    </div>
                    <div className='formInputLogin' >
                        <label>Mot de passe</label>
                        <Input placeholder="*********" type="password" value={formValues.password} setFormValues={setFormValues} name={"password"} />
                    </div>
                    <div className='formButtonLogin' >
                        <Button> Se connecter </Button>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default Login
