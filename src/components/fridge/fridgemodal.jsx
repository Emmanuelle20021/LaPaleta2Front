import { useContext, useRef, useEffect } from 'react'
import './fridgemodal.scss'
import InsideFridge from '../../assets/inside-fridge'

import { FridgeContext } from '../../App'

export default function Modal({ showModal }) {

    const { setShowFridge } = useContext(FridgeContext)

    const fridge = useRef(null)

    useEffect(() => {
        const closeFridge = ({ target }) => {
            if (!fridge.current) return

            if (fridge.current.contains(target)) return

            setShowFridge(false)
        }

        document.addEventListener('mousedown', closeFridge)

        return () => document.removeEventListener('mousedown', closeFridge)
    }, [])


    return (
        <div ref={fridge} className={'modal-fridge ' + (showModal ? 'active-modal-fridge' : 'inactive-modal-fridge')}>
            <h2>Mi nevera</h2>
            <div className='inside-fridge'>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>
                <p style={{width: '150px'}}>producto</p>

            </div>
        </div>
    )
}