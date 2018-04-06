/* @flow */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

import faviconUrl from 'server/components/Html/images/favicon.ico'

export const Html = ({
  App,
  clientStats,
  helmetContext,
  location,
  routerContext,
  styleSheet,
}: {
  App?: React$ComponentType<*>,
  clientStats?: *,
  helmetContext?: {
    helmet?: *,
  },
  location?: string,
  routerContext?: *,
  styleSheet?: *,
}) => {
  try {
    if (App == undefined) return null
    if (clientStats == undefined) return null
    if (helmetContext == undefined) return null
    if (location == undefined) return null
    if (routerContext == undefined) return null
    if (styleSheet == undefined) return null

    injectGlobal`${normalize()}`

    injectGlobal`
      html, body, #${process.env.REACT_CONTAINER_ID} {
        height: 100%;
  
        margin: 0;
  
        padding: 0;
  
        width: 100%;
      }
    `

    const __html = renderToString(
      styleSheet.collectStyles(
        <HelmetProvider context={helmetContext}>
          <StaticRouter context={routerContext} location={location}>
            <App />
          </StaticRouter>
        </HelmetProvider>,
      ),
    )

    const { helmet } = helmetContext

    if (helmet == undefined) return null

    const htmlAttributes = helmet.htmlAttributes.toComponent()
    const bodyAttributes = helmet.bodyAttributes.toComponent()

    const base = helmet.base.toComponent()
    const link = helmet.link.toComponent()
    const meta = helmet.meta.toComponent()
    const noscript = helmet.noscript.toComponent()
    const script = helmet.script.toComponent()
    const style = helmet.style.toComponent()
    const title = helmet.title.toComponent()

    const chunkNames = flushChunkNames()

    const chunks: * = flushChunks(clientStats, { chunkNames })

    const { CssHash, Js, Styles, scripts } = chunks

    return (
      <html {...htmlAttributes}>
        <head>
          {base}
          {link}
          {meta}
          {noscript}
          {script}
          {style}
          {title}
          <link rel={'shortcut icon'} href={faviconUrl} />
          {styleSheet.getStyleElement()}
          <Styles />
        </head>
        <body {...bodyAttributes}>
          <div
            id={process.env.REACT_CONTAINER_ID}
            dangerouslySetInnerHTML={{ __html }}
          />
          <CssHash />
          <Js />
        </body>
      </html>
    )
  } catch (error) {
    return null
  }
}

export default Html
