import './to-manage.scss'

export default function ToManage({ clientName, clientPhone, onComplete, onCancel }) {
    return (
        <div className='to-manage-container'>
            <div className='order-container'>
                <p><span>Por:</span> {clientName}</p>
                <p><span>Número:</span> {clientPhone}</p>
            </div>
            <button onClick={onComplete}>
                Completar
            </button>
            <button onClick={onCancel}>
                Cancelar
            </button>
        </div>
    )
}