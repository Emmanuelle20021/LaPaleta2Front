import './fridgeItem.scss'
import { API_ASSETS } from '../../constants/properties'

export default function FridgeItem({ amount, product, onMinus, onPlus, inside = false }) {
    return (
        <>
        <div className='card-fridge'>
            <article className='product-card-fridge'>
                <section className={'img-container-fridge' + (inside ? '-inside' : '')}>
                    <button onClick={onMinus} className='button-left-fridge button'>-</button>
                    <div className={'background-img' + (inside ? '-inside' : '')}>
                        <img src={API_ASSETS + product.img} alt={product.name} />
                    </div>
                    <button onClick={onPlus} className='button-rigth-fridge button'>+</button>
                </section>
                <section className='info-container-fridge'>
                    <div className='content-info'>
                        <p className={'product-name-container' + (inside ? '-inside' : '')}>
                            {!inside && product.name}
                            <p className='amount-container-fridge'>{amount}</p>
                        </p>
                    </div>
                </section>
            </article>
            <section className='price-container-fridge'>
                <p>${amount * product.price}</p>
            </section>
        </div>
        </>
    )
}