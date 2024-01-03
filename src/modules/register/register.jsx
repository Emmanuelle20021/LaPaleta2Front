import './register.scss'
import { Input } from '../../components/input_form/input'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Footer from '../../components/footer/footer';
import { Link, useLocation } from 'wouter';
import register from '../../services/register';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { FaPerson, FaPhone, FaUser } from 'react-icons/fa6';
import login from '../../services/login';

const phonePattern = "[0-9]{3}(-?)[0-9]{3}(-?)[0-9]{3}"

export function Register() {
    const { setToken } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cellphone, setCellPhone] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState(null)
    const [_, navigate] = useLocation()

    const handleLogin = async (event) => {
        event.preventDefault()
        const registry = await register(name, email, cellphone , pwd)

        if(registry.status == 409){
            setErrMsg('Ya existe este usuario')
            return
        }

        if(registry.status == 201){
            setErrMsg('Usuario Creado')
        }

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

        navigate('/')
    }

    return <div className="page grid-login">
        <aside className="image-side padding">
            <div className='img-circle big-img'>
                <img className='image' src="src\assets\LaPaletaLogo.png" alt="image name" />
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
                <Input value={name} onChange={({ target }) => setName(target.value)} required id="name-input-login" name="name-input" placeholder="Nombre" type="text">
                    <FaUser className='input-icon' />
                </Input>
                <Input value={email} onChange={({ target }) => setEmail(target.value)} required id="email-input-login" name="email-input" placeholder="Correo Electrónico" type="email">
                    <MdOutlineAlternateEmail className='input-icon' />
                </Input>
                <Input value={cellphone} onChange={({ target }) => setCellPhone(target.value)} required id="phone-input-login" name="phone-input" placeholder="Telefono" type="Number" pattern={phonePattern}>
                    <FaPhone className='input-icon' />
                </Input>
                <Input value={pwd} onChange={({ target }) => setPwd(target.value)} required id="password-input-login" name="password-input" placeholder="Contraseña" type="password">
                    <FaLock className='input-icon' />
                </Input>
                <div className='form-link margin-top'>
                    <p>Tienes una cuenta?</p>
                    <Link href='/login'>
                        <a>Inicia sesión</a>
                    </Link>
                </div>
                <button type="submit" className='form-submit-button'>Registrarse</button>
            </form>
        </aside>
        <footer className='login-footer' >
            <Footer></Footer>
        </footer>
    </div>
}
