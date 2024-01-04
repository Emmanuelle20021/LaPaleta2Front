import { Route, Switch } from 'wouter'
import './App.scss'
import { Login } from './modules/login/login.jsx'
import { MainPage } from './modules/main-page/main-page.jsx'
import FridgeModal from './components/fridge/fridgemodal.jsx'
import FridgeProvider from './contexts/fridge.jsx'
import AuthProvider from './contexts/auth.jsx'
import { ProductDetail } from './modules/product-detail/product-detail.jsx'
import { ProductCategory } from './modules/product-category/product-category.jsx'
import { Account } from './modules/account/account.jsx'
import { Orders } from './modules/orders/orders.jsx'
import { Fridge } from './modules/fridge/fridge.jsx'


function App() {

  return (
    <AuthProvider>
      <FridgeProvider>
        <FridgeModal />

        <Switch>
          <Route path='/' component={MainPage} />
          <Route path='/login' component={Login}> Estas en el inicio de sesión </Route>
          <Route path='/register'> Estas en el registro </Route>

          {/* Only Custumer */}
          <Route path='/fridge' component={Fridge}/>

          {/* Should vary based on the role */}
          <Route path='/account' component={Account}/>

          {/* Only Admin */}
          <Route path='/products'> Vista de productos del vendedor </Route>
          <Route path='/products/new'> Agregar nuevo producto </Route>

          {/* Only Customer  */}
          <Route path='/products/:category' component={ProductCategory} />

          {/* Should vary based on the role */}
          <Route path='/products/:category/:idProduct' component={ProductDetail} />
          <Route path='/orders' component={Orders} />
          <Route path='/orders/:id'> Detalle de la orden del usuario </Route>

          {/* Default route */}
          <Route component={MainPage} />
        </Switch>
      </FridgeProvider>
    </AuthProvider>
  )
}

export default App
