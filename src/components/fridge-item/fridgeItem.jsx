import './fridgeItem.scss'
import { API_ASSETS } from '../../constants/properties'

export default function FridgeItem({ amount, product }) {
    return (
        <article>
            <section>
                <button>-</button>
                <div>
                    <img src="" alt={product.name} />
                </div>
                <button>+</button>
            </section>
            <section>
                <div>
                    <p>
                        {product.name}
                        <p>{amount}</p>
                    </p>
                </div>
            </section>
            <section>
                <p>${amount * product.price}</p>
            </section>
        </article>
    )
}