import './card.scss'

export default function Card({ img, name, description, price, onClick }) {
    return (
        <section className='product-card-container'>
            <button className='product-card' onClick={onClick}>
                <section className='product-img-container'>
                    <img className='product-img' src={img} alt={name} loading='lazy' />
                    <p className='product-price'>
                        {price}
                    </p>
                </section>
                <section className='product-info'>
                    <p className='product-title'>{name}</p>
                    <p className='product-description'>{description}</p>
                </section>
            </button>
        </section>
    )
}
