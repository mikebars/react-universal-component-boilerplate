/* @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import IndexPage from 'universal/pages/IndexPage'
import LoadingPage from 'universal/pages/LoadingPage'
import NotFoundPage from 'universal/pages/NotFoundPage'

export const Routes = () => (
  <Switch>
    <Route exact path={'/'} component={IndexPage} />
    <Route exact path={'/loading'} component={LoadingPage} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Routes
