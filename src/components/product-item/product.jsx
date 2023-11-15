import { Card } from './card/card'
import './product.scss'

const helado = {
    name: 'Helado',
    img: 'src/assets/paleta.png',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet explicabo nemo commodi sed sint, pariatur beatae minus assumenda consequatur modi earum, eos, fugiat aut illum qui aspernatur? Ab, animi sed',
    price: 100
}

export function Product(){
    return (
        <section className='products'>
            <Card className='product-item-list' name={helado.name} img={helado.img} description={helado.description} price={helado.price}></Card>
        </section>
    )
}