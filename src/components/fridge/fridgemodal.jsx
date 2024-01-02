import { useRef, useEffect } from 'react'
import './fridgemodal.scss'

import { Link, useLocation } from 'wouter'
import useFridge from '../../customhooks/useFridgeContext'

export default function Modal() {

    const [_, navigate] = useLocation()

    const {
        closeFridge,
        isShowFridge,
        products,
        reduceProduct,
        removeProduct
    } = useFridge()

    const totalCost = products.length && products.reduce((total, pdt) => total + pdt.amount * pdt.price, 0)

    const fridge = useRef(null)

    useEffect(() => {
        const close = ({ target }) => {
            if (!fridge.current) return

            if (fridge.current.contains(target)) return

            closeFridge()
        }

        document.addEventListener('mousedown', close)

        return () => document.removeEventListener('mousedown', close)
    }, [])

    const handleMinus = (product) => () => reduceProduct(product)
    const handleRemove = (product) => () => removeProduct(product)
    const goToFridge = () => navigate('/fridge')

    return (
        <div ref={fridge} className={'modal-fridge ' + (isShowFridge ? 'active-modal-fridge' : 'inactive-modal-fridge')}>
            <h2 className='border'>Mi nevera</h2>
            <div className='inside-fridge'>
                {products.map(pdt =>
                    <p key={pdt.id} onClick={handleMinus(pdt)} onDoubleClick={handleRemove(pdt)}>
                        {pdt.id}, {pdt.name}, {pdt.amount}
                    </p>)}
            </div>
            <div className='cost border'>
                <h2>Total del pedido: <span>{`$${totalCost}`}</span></h2>
                <button className='button' onClick={goToFridge}>Ordenar</button>
            </div>
            <Link href='/orders'>
                <a className='link'>Ver pedidos</a>
            </Link>
        </div>
    )
}