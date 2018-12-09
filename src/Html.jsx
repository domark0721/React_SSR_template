import React from 'react'
import PropTypes from 'prop-types'

const Html = ({ children }) => (
  <html lang="zh">
    <head>
      <title>金剛</title>
    </head>

    <body>
      <div id="root">
        <div id="AppContainer">
          {children}
        </div>
      </div>
      <script src="./bundle.js" />
    </body>
  </html>
)

Html.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Html
