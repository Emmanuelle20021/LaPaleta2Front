import './products_slide.scss';
import Card from '../product-item/card.jsx';

const products = [
    {
        name: 'Helado',
        description: 'Helado muy sabroso, pruebelo',
        img: 'src/assets/paleta.png',
        price: '20'
    },
    {
        name: 'Helado',
        description: 'Helado muy sabroso, pruebelo',
        img: 'src/assets/paleta.png',
        price: '20'
    },
    {
        name: 'Helado',
        description: 'Helado muy sabroso, pruebelo',
        img: 'src/assets/paleta.png',
        price: '20'
    },
    {
        name: 'Helado',
        description: 'Helado muy sabroso, pruebelo',
        img: 'src/assets/paleta.png',
        price: '20'
    },
    {
        name: 'Helado',
        description: 'Helado muy sabroso, pruebelo',
        img: 'src/assets/paleta.png',
        price: '20'
    },
    {
        name: 'Helado',
        description: 'Helado muy sabroso, pruebelo',
        img: 'src/assets/paleta.png',
        price: '20'
    },
]

export default function ProductsSlide({title , productsArray}){
    return (
        <section className='product-slide-container'>
            <h3 className='slide-title'>{title}</h3>
            <ul className='products-list'>
                {
                    products.map(product => {
                        return (
                            <li key={product.name} className='product-item'>
                                <Card img={product.img} name={product.name} description={product.description} price={product.price}></Card>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    )
}