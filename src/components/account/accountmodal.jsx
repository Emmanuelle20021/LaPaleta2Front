import './accountmodal.scss'
import { FaGear, FaRightFromBracket } from "react-icons/fa6";

export default function Modal({ showModal, onClickAccount, onLogout }) {
    return (
        <div className={'modal-account ' + (showModal ? 'active' : 'inactive')}>
            <button className='act-button top' onClick={onClickAccount}>
                <FaGear size={16} />
                Cuenta
            </button>
            <button className='act-button bottom' onClick={onLogout}>
                <FaRightFromBracket size={16} />
                Cerrar sesión
            </button>
        </div>
    )
}