import './login.scss'

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
                <label htmlFor="" className='form-label email-label with-icon'>
                    <p className='label-p'>Correo Electrónico</p>
                    <input className='form-input' placeholder='Correo Electrónico' type="text" name="" id="" />
                </label>
                <label htmlFor="" className='form-label password-label with-icon '>
                    <p className='label-p'>Contraseña</p>
                    <input className='form-input' placeholder='Contraseña' type="number" name="" id="" />
                </label>
                <label htmlFor="" className='form-label password-label with-icon '>
                    <p className='label-p'>Contraseña</p>
                    <input className='form-input' placeholder='Contraseña' type="password" name="" id="" />
                </label>
                <a href="#" className='form-a'>Olvide mi contraseña</a>
                <label htmlFor="" className='form-label'>
                    <p className='label-p'>Aún no estas Registrado?</p>
                    <a href="#" className='form-a'>Registrate Aqui</a>
                </label>
                <button type="submit" className='form-submit-button'>Aceptar</button>
            </form>
        </aside>
    </div>
}