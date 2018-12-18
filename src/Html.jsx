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
  const cssAssetsHtml = cssAssets.length ? <style>{cssAssets}</style> : ''
  const jsAssetsHtml = jsAssets.length ? (
    jsAssets.map(jsPath => <script key={jsPath} src={jsPath} />)
  ) : (
    <script src="./assets/bundle.js" />
  )
  return (
    <html lang="zh">
      <head>
        <title>金剛</title>
        {cssAssetsHtml}
      </head>

      <body>
        <div id="root">{children}</div>
        {preloadedHtml}
        {jsAssetsHtml}
      </body>
    </html>
  )
}

Html.defaultProps = {
  preloadedState: {},
  jsAssets: [],
  cssAssets: [],
}

Html.propTypes = {
  children: PropTypes.node.isRequired,
  preloadedState: PropTypes.object,
  jsAssets: PropTypes.array,
  cssAssets: PropTypes.array,
}

export default Html
