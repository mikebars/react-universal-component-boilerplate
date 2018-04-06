/* @flow */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import UniversalApp from 'universal/App'

export const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <UniversalApp />
    </BrowserRouter>
  </HelmetProvider>
)

export default App
