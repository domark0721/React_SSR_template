import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'

const Html = ({
  children, preloadedState, jsAssets, cssAssets,
}) => {
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
        {
          cssAssets.map(cssFile => (
            <link rel="stylesheet" type="text/css" href={cssFile} />
          ))
        }
      </head>

      <body>
        <div id="root">{children}</div>
        {preloadedHtml}
        {jsAssets.map(jsFile => (
          <script src={jsFile} />
        ))}
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
  jsAssets: PropTypes.array.isRequired,
  cssAssets: PropTypes.array.isRequired,
}

export default Html
