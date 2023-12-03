import { Route, Switch } from 'wouter'
import './App.scss'
import { Login } from './modules/login/login.jsx'
import { MainPage } from './modules/main-page/main-page.jsx'
import Modal from './components/fridge/fridgemodal.jsx'
import { createContext, useState } from 'react'
import Navbar from './components/navbar/navbar.jsx'

function Products({ params: { category } }) {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Estas en {category}</h1>
    </div>
  )
}

export const FridgeContext = createContext()

function App() {
  const [showFridge, setShowFridge] = useState(false)

  return (
    <FridgeContext.Provider value={{ showFridge, setShowFridge }}>
      <div>
        <Modal showModal={showFridge}></Modal>

        <Switch>
          <Route path='/' component={MainPage} />
          <Route path='/login' component={Login}> Estas en el registro </Route>
          <Route path='/signin'> Estas en el inicio de sesión </Route>
          <Route path='/resetpw'> Estas en la recupertación de la contraseña </Route>

          {/* Only Custumer */}
          <Route path='/fridge'> Nevera </Route>

          {/* Should vary based on the role */}
          <Route path='/account'> Estas en la configuración de la cuenta </Route>

          {/* Only Admin */}
          <Route path='/products'> Vista de productos del vendedor </Route>
          <Route path='/products/new'> Agregar nuevo producto </Route>

          {/* Only Customer  */}
          <Route path='/products/:category' component={Products} />

          {/* Should vary based on the role */}
          <Route path='/products/:category/:idProduct'> Detalle de un producto </Route>
          <Route path='/orders'> Ordenes del usuario </Route>
          <Route path='/orders/:id'> Detalle de la orden del usuario </Route>

          {/* Default route */}
          <Route component={MainPage} />
        </Switch>
      </div>
    </FridgeContext.Provider>
  )
}

export default App
