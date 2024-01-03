import { useState, useEffect } from 'react';
import './newProduct.scss'
import Navbar from '../../components/navbar/navbar.jsx'
import Hero from '../../components/hero/hero.jsx'
import ProductsSlide from '../../components/products-slide/products_slide.jsx'
import Footer from '../../components/footer/footer.jsx'
import { mostSell } from '../../services/product.js'

export function NewProduct() {
  const [ mostsell, setMostSell ] = useState([])

  useEffect(() => {
    const fetchProducts = async () =>{
      const products = await mostSell();
      setMostSell(products)
    }
    fetchProducts()
  }, [])

  return (
    <div className='page'>
      <nav className='nav-container'>
        <Navbar></Navbar>
      </nav>
      <section className='categories-product-container'>
      </section>
      <Footer></Footer>
    </div>
  )
}