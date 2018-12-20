import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'

const Html = ({ children, preloadedState }) => {
  const preloadedHtml = (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_STATE__ =  ${serialize(preloadedState)}`,
      }}
    />
  )

  return (
    <html lang="zh">
      <head>
        <title>金剛</title>
        <link rel="stylesheet" type="text/css" href="/dist/main.css" />
      </head>

      <body>
        <div id="root">{children}</div>
        {preloadedHtml}
        <script src="/dist/bundle.js" />
      </body>
    </html>
  )
}

Html.defaultProps = {
  preloadedState: {},
}

Html.propTypes = {
  children: PropTypes.node.isRequired,
  preloadedState: PropTypes.object,
}

export default Html
