import './login.scss'
import { Input } from '../../components/input_form/input'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import { Link, useLocation } from 'wouter';
import login from '../../services/login';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

const phonePattern = "[0-9]{3}(-?)[0-9]{3}(-?)[0-9]{3}"

export function Login() {
    const { setToken } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState(null)
    const [_, navigate] = useLocation()

    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await login(email, pwd)

        if (response.status === 401) {
            setErrMsg('Correo o contraseña incorrectos')
            return
        }

        if (response.status !== 200) {
            setErrMsg('Hubo un problema intente de nuevo')
            return
        }

        setToken(response.accessToken)

        navigate('/', { replace: true })
    }

    return <div className="page grid-login">
        <div className='login-nav'>
            <Navbar></Navbar>
        </div>
        <aside className="image-side padding">
            <div className='img-circle big-img'>
                <img className='image' src="" alt="image name" />
            </div>
        </aside>
        <aside className="login-container padding">
            <form className='form' id='form-login' onSubmit={handleLogin}>
                <p className="form-title">Bienvenido</p>
                {
                    errMsg && <p style={{
                        color: 'red'
                    }}>{errMsg}</p>
                }
                <Input value={email} onChange={({ target }) => setEmail(target.value)} required id="email-input-login" name="email-input" placeholder="Correo Electrónico" type="email">
                    <MdOutlineAlternateEmail className='input-icon' />
                </Input>
                <Input value={pwd} onChange={({ target }) => setPwd(target.value)} required id="password-input-login" name="password-input" placeholder="Contraseña" type="password">
                    <FaLock className='input-icon' />
                </Input>
                <div className='form-link margin-top'>
                    <p>No tienes una cuenta?</p>
                    <Link href='/register'>
                        <a>Registrate</a>
                    </Link>
                </div>
                <button type="submit" className='form-submit-button'>Aceptar</button>
            </form>
        </aside>
        <footer className='login-footer' >
            <Footer></Footer>
        </footer>
    </div>
}
