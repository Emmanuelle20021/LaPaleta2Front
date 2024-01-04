import { FaAt, FaLock, FaPhone, FaUser } from "react-icons/fa";
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import { Input } from "../../components/input_form/input";
import Navbar from "../../components/navbar/navbar";

import "./account.scss"
import { useContext, useState } from "react";
import ValidationError from "../../utils/ValidationError";
import { updateUser, verifyPwd } from "../../services/user";
import { AuthContext } from "../../contexts/auth";
import swal from "sweetalert";
import { navigate } from "wouter/use-location";

export function Account() {
    const { token } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [pwd, setPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [repeatNewPwd, setRepeatNewPwd] = useState('')

    const [errMsgProfile, setErrMsgProfile] = useState('')
    const [successMsgProfile, setSuccessMsgProfile] = useState('')
    const [errMsgPwd, setErrMsgPwd] = useState('')
    const [succsMsgPwd, setSuccsMsgPwd] = useState('')

    const goToLogin = async () => {
        await swal({
            title: "Alto",
            text: "Su sesión ha expirado, necesita iniciar sesión",
            className: "warning",
            button: "Ir",
            closeOnClickOutside: false
        })

        navigate("/login", { replace: true })
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        setErrMsgProfile('')
        setSuccessMsgProfile('')

        try {
            if (!name.length && !email.length && !phone.length) throw new ValidationError('Rellena al menos un campo')

            const { status, afectados } = await updateUser(token, { name, email, phone })

            if (status !== 201) return await goToLogin()
            if (afectados < 1) throw new Error()

            setSuccessMsgProfile('Cambios guardados')

        } catch (error) {
            if (error instanceof ValidationError) {
                setErrMsgProfile(error.message)
            } else {
                setErrMsgProfile('Hubo un problema, intente de nuevo')
            }
        }
    }

    const changePwd = async (e) => {
        e.preventDefault()
        setErrMsgPwd('')
        setSuccsMsgPwd('')

        try {
            if (newPwd !== repeatNewPwd) throw new ValidationError('Las contraseñas no coinciden')

            const pwdMatch = await verifyPwd(token, pwd)

            if (pwdMatch.status !== 200) {
                if (pwdMatch.error === 'Invalid token') return await goToLogin()
                else throw new ValidationError('Contraseña actual incorrecta')
            }

            const { status, afectados } = await updateUser(token, { pwd: newPwd })

            if (status === 201 && afectados >= 1) {
                setSuccsMsgPwd('Contraseña actualizada')
            } else {
                throw new Error()
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                setErrMsgPwd(error.message)
            } else {
                setErrMsgPwd('Hubo un problema, intente de nuevo')
            }
        }
    }

    const handleWith = (fn) => (e) => fn(e.target.value)

    return (
        <div>
            <Navbar></Navbar>
            <h2 className="account-title"> Perfil </h2>
            <BreadCrumbs routes={[{ name: 'Cuenta', route: 'account' }]} />

            <div className="forms">
                <section className="form-user profile">
                    <h3>Información del Perfil</h3>
                    {errMsgProfile && <p className="err-msg">{errMsgProfile}</p>}
                    {successMsgProfile && <p className="succs-msg">{successMsgProfile}</p>}
                    <form onSubmit={updateProfile}>
                        <Input value={name} onChange={handleWith(setName)} placeholder='Nombre'> <FaUser /> </Input>
                        <Input value={email} onChange={handleWith(setEmail)} type="email" placeholder='Correo'> <FaAt /> </Input>
                        <Input value={phone} onChange={handleWith(setPhone)} type="number" placeholder='Teléfono'> <FaPhone /> </Input>
                        <input className="frm-acct-bttn" type="submit" value='Guardar' />
                    </form>
                </section>
                <section className="form-user pwd">
                    <h3>Cambiar contraseña</h3>
                    {errMsgPwd && <p className="err-msg">{errMsgPwd}</p>}
                    {succsMsgPwd && <p className="succs-msg">{succsMsgPwd}</p>}
                    <form onSubmit={changePwd}>
                        <Input value={pwd} onChange={handleWith(setPwd)} required type='password' placeholder='Contraseña actual'> <FaLock /> </Input>
                        <Input value={newPwd} onChange={handleWith(setNewPwd)} required type='password' placeholder='Nueva contraseña'> <FaLock /> </Input>
                        <Input value={repeatNewPwd} onChange={handleWith(setRepeatNewPwd)} required type='password' placeholder='Nueva contraseña'> <FaLock /> </Input>
                        <input className="frm-acct-bttn" type="submit" value='Guardar' />
                    </form>
                </section>
            </div>
        </div>
    )
}