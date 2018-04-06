/* @flow */

import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import ServerApp from 'server/App'

import Html from 'server/components/Html'

export const serverSideRender = ({ clientStats }: { clientStats: * }) => (
  req: ?express$Request,
  res: ?express$Response,
) => {
  if (clientStats == undefined) return
  if (req == undefined) return
  if (res == undefined) return

  const App = ServerApp

  const helmetContext = {}

  const location = req.url

  const routerContext = {}

  const styleSheet = new ServerStyleSheet()

  const props = {
    App,
    clientStats,
    helmetContext,
    location,
    routerContext,
    styleSheet,
  }

  const element = <Html {...props} />

  const stream = styleSheet.interleaveWithNodeStream(
    renderToNodeStream(element),
  )

  res.type('html')

  res.write('<!doctype html>')

  stream.pipe(res)
}

export default serverSideRender
