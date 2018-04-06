/* @flow */

import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import ClientApp from 'client/App'

const containerId: string =
  process.env.REACT_CONTAINER_ID != undefined
    ? process.env.REACT_CONTAINER_ID
    : 'react-container'

export const clientSideRender = (
  Component: React$ComponentType<*> = ClientApp,
  container: HTMLElement | null = document.getElementById(containerId),
  callback?: * = () => console.log('clientSideRender'),
) =>
  container !== null &&
  hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    container,
    callback,
  )

if ('hot' in module && 'accept' in module.hot) {
  module.hot.accept('client/App/index.js', () => {
    const ClientApp = require('client/App').default
    console.log('hmr clientSideRender')
    clientSideRender(ClientApp)
  })
}

clientSideRender()
