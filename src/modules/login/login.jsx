import './login.scss'
import { Input } from '../../components/input_form/input'

const phonePattern = "[0-9]{3}(-?)[0-9]{3}(-?)[0-9]{3}"

export function Login(){
    return <div className="page grid-login">
        <aside className="image-side">
            <div className='img-circle big-img'>
                <img className='image' src="https://eminusapi.uv.mx/eminusapi//profiles/RHvLQb5vwmBmkNKJl739g.png" alt="image name" />
            </div>
        </aside>
        <aside className="login-container">
            <form action="" className='form'>
                <p className="form-title">Bienvenido</p>
                <Input id="email-input-login" name="email-input" placeholder="Correo Electrónico" type="email"></Input>
                <Input id="phone-input-login" name="phone-input" placeholder="Teléfono" type="tel" pattern={phonePattern}></Input>
                <Input id="password-input-login" name="password-input" placeholder="Contraseña" type="password"></Input>
                <button type="submit" className='form-submit-button'>Aceptar</button>
            </form>
        </aside>
    </div>
}