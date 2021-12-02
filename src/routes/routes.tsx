import React, { Suspense, lazy, createContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('../modules/home/page/home.module'))
const ui_page = lazy(() => import('../shared/ui-modulo/ui_page.module'))
const Login = lazy(() => import('../modules/Auth/Login'))
const Register = lazy(() => import('../modules/Auth/Register'))
const ChangePass = lazy(() => import('../modules/Auth/ChangePass'))
const FavoritePharmacy = lazy(() => import('../modules/FavoritePharmacy/FavoritePharmacy'))
const UserListFavoritePharmacy = lazy(() => import('../modules/FavoritePharmacy/UserListFavoritePharmacy'))

export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  change_password: '/change-password',
  favorite_pharmacy: '/user-list',
  list_pharmacy_user: '/favorite-list',
}
const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path='/page-ui' component={ui_page} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.register} component={Register} />
        <Route exact path={routes.change_password} component={ChangePass} />
        <Route exact path={routes.favorite_pharmacy} component={FavoritePharmacy} />
        <Route exact path={routes.list_pharmacy_user} component={UserListFavoritePharmacy} />
      </Switch>
    </Suspense>
  </Router>
)
export default Routes
