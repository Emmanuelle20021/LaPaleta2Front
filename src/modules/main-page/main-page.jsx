import './main-page.scss'
import Navbar from '../../components/navbar/navbar.jsx'
import Hero from '../../components/hero/hero.jsx'
import ProductsSlide from '../../components/products-slide/products_slide.jsx'
import Footer from '../../components/footer/footer.jsx'

export function MainPage() {

  return (
    <div className='page'>
      <nav className='nav-container'>
        <Navbar></Navbar>
      </nav>
      <Hero></Hero>
      <section className='categories-product-container'>
        <ProductsSlide title='Volver a comprar' ></ProductsSlide>
        <ProductsSlide title='Más vendidos'></ProductsSlide>
      </section>
      <Footer></Footer>
    </div>
  )
}