import { useRef, useEffect } from 'react'
import './fridgemodal.scss'

import { Link, useLocation } from 'wouter'
import useFridge from '../../customhooks/useFridgeContext'
import FridgeItem from '../fridge-item/fridgeItem'

export default function Modal() {

    const [_, navigate] = useLocation()

    const {
        closeFridge,
        isShowFridge,
        products,
        reduceProduct,
        addProduct,
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
                    <FridgeItem
                        inside
                        amount={pdt.amount}
                        product={pdt}
                        onMinus={() => reduceProduct(pdt)}
                        onPlus={() => addProduct(pdt)}
                    />)
                }
            </div>
            <div className='cost border'>
                <h2>Total del pedido: <span>{`$${totalCost}`}</span></h2>
                <button className='modal-fridge-bttn' onClick={goToFridge}>Ordenar</button>
            </div>
            <Link href='/orders'>
                <a className='link'>Ver pedidos</a>
            </Link>
        </div>
    )
}