import './to-order.scss'
import { FaDroplet, FaIceCream } from "react-icons/fa6";

export default function ToOrder({ cost, onOrder, onClean }) {
    return (
        <div className='to-order-container'>
            <div className='order-container'>
                <p>Total del pedido:</p>
                <p>{cost}</p>
            </div>
            <button onClick={onOrder}>
                <FaIceCream size={16} />
                Pedir
            </button>
            <button onClick={onClean}>
                <FaDroplet size={16} />
                Vaciar
            </button>
        </div>
    )
}