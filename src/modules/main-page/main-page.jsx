import { useState, useEffect } from 'react';
import './main-page.scss'
import Navbar from '../../components/navbar/navbar.jsx'
import Hero from '../../components/hero/hero.jsx'
import ProductsSlide from '../../components/products-slide/products_slide.jsx'
import Footer from '../../components/footer/footer.jsx'
import { mostSell } from '../../services/product.js'
import { useRoute } from 'wouter';
import { navigate } from 'wouter/use-location';
import FridgeItem from '../../components/fridge-item/fridgeItem.jsx';
import CardAdmin from '../../components/product-item-admin/card.jsx';

export function MainPage() {
  const [ mostsell, setMostSell ] = useState([])
  const [match] = useRoute('/')

  useEffect(() => {
    if(match) return
    navigate('/')
  }, [match])

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
      <Hero></Hero>
      <section className='categories-product-container'>
        <ProductsSlide title='Volver a comprar' ></ProductsSlide>
        <ProductsSlide title='Más vendidos' productsArray={mostsell}></ProductsSlide>
      </section>
      <Footer></Footer>
    </div>
  )
}