import './fridgeItem.scss'
import { API_ASSETS } from '../../constants/properties'

export default function FridgeItem({ amount, product }) {
    return (
        <>
        <div className='card-fridge'>
            <article className='product-card-fridge'>
                <section className='img-container-fridge'>
                    <button className='button-left-fridge button'>-</button>
                    <div className='background-img'>
                        <img src={API_ASSETS + product.img} alt={product.name} />
                    </div>
                    <button className='button-rigth-fridge button'>+</button>
                </section>
                <section className='info-container-fridge'>
                    <div className='content-info'>
                        <p className='product-name-container'>
                            {product.name}
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