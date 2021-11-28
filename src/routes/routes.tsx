import React, { Suspense, lazy, createContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('../modules/home/page/home.module'))
const ui_page = lazy(() => import('../shared/ui-modulo/ui_page.module'))
const Login = lazy(() => import('../modules/Auth/Login'))
const Register = lazy(() => import('../modules/Auth/Register'))
const ChangePass = lazy(() => import('../modules/Auth/ChangePass'))
const FavoritePharmacy = lazy(() => import('../modules/FavoritePharmacy/FavoritePharmacy'))

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/page-ui' component={ui_page} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/change-password' component={ChangePass} />
        <Route exact path='/favorites' component={FavoritePharmacy} />
      </Switch>
    </Suspense>
  </Router>
)
export default Routes
