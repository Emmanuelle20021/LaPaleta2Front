import { Route, Switch } from 'wouter'
import './App.scss'
import { Login } from './modules/login/login.jsx'
import { MainPage } from './modules/main-page/main-page.jsx'
import FridgeModal from './components/fridge/fridgemodal.jsx'
import Navbar from './components/navbar/navbar.jsx'
import FridgeProvider from './contexts/fridge.jsx'
import AuthProvider from './contexts/auth.jsx'

function Products({ params: { category } }) {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Estas en {category}</h1>
    </div>
  )
}

function App() {

  return (
    <AuthProvider>
      <FridgeProvider>
        <FridgeModal />

        <Switch>
          <Route path='/' component={MainPage} />
          <Route path='/login' component={Login}> Estas en el inicio de sesión </Route>
          <Route path='/register'> Estas en el registro </Route>
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
      </FridgeProvider>
    </AuthProvider>
  )
}

export default App
