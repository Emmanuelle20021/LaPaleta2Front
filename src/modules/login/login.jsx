import './login.scss'
import { Input } from '../../components/input_form/input'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

const phonePattern = "[0-9]{3}(-?)[0-9]{3}(-?)[0-9]{3}"

export function Login(){
    return <div className="page grid-login">
        <div className='login-nav'>
            <Navbar></Navbar>
        </div>
        <aside className="image-side padding">
            <div className='img-circle big-img'>
                <img className='image' src="https://eminusapi.uv.mx/eminusapi//profiles/RHvLQb5vwmBmkNKJl739g.png" alt="image name" />
            </div>
        </aside>
        <aside className="login-container padding">
            <form action="#" className='form' id='form-login'>
                <p className="form-title">Bienvenido</p>
                <Input id="email-input-login" name="email-input" placeholder="Correo Electrónico" type="email">
                    <MdOutlineAlternateEmail className='input-icon'/>
                </Input>
                <Input id="password-input-login" name="password-input" placeholder="Contraseña" type="password">
                    <FaLock className='input-icon' />
                </Input>
                <div className='form-link'>
                    <a href="#">Olvide mi contraseña</a>
                </div>
                <div className='form-link margin-top'>
                    <p>No tienes una cuenta?</p>
                    <a href="#">Registrate</a>
                </div>
                <button type="submit" className='form-submit-button'>Aceptar</button>
            </form>
        </aside>
        <footer className='login-footer' >
            <Footer></Footer>
        </footer>
    </div>
}
