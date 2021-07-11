import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('../modules/home/page/home.module'))
const ui_page = lazy(() => import('../shared/ui-modulo/ui_page.module'))

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/page-ui' component={ui_page} />
      </Switch>
    </Suspense>
  </Router>
)
export default Routes
