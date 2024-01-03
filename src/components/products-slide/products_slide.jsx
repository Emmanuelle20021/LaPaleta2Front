import './products_slide.scss';
import Card from '../product-item/card.jsx';
import { API_ASSETS } from '../../constants/properties.js';

export default function ProductsSlide({ title, productsArray }) {
    if(productsArray)
    return (
        <section className='product-slide-container'>
            <h3 className='slide-title'>{title}</h3>
            <ul className='products-list'>
                {
                    productsArray.map(product => {
                        return (
                            <li key={product.name} className='product-item'>
                                <Card img={`${API_ASSETS + product.img}`} name={product.name} description={product.description} price={product.price}></Card>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    )
}