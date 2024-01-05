import './products_slide.scss';
import Card from '../product-item/card.jsx';
import { API_ASSETS } from '../../constants/properties.js';
import { useLocation } from 'wouter';
import useCategories from '../../customhooks/useCategories.jsx';

export default function ProductsSlide({ title, productsArray, vertical = false }) {

    if(!productsArray) return null 

    const [_,navigate] = useLocation()
    const ctgs = useCategories()

    const goTo = (idCtg, idPdt) => () => {
        const {name: nameCtg} = ctgs.find(ctg => ctg.id === idCtg)
        navigate(`/products/${nameCtg}/${idPdt}` )
    }

    return (
        <section className={'product-slide-container' + (vertical ? '-vertical' : '') } >
            <h3 className='slide-title'>{title}</h3>
            <ul className={'products-list' + (vertical ? '-vertical' : '')}>
                {
                    productsArray.map(product => {
                        return (
                            <li key={product.name} className={'product-item' + (vertical ? '-vertical' : '')}>
                                <Card onClick={goTo(product.category, product.id)} img={`${API_ASSETS + product.img}`} name={product.name} description={product.description} price={product.price}></Card>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    )
}