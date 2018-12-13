import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
// import PropTypes from 'prop-types'

import Header from '../../containers/Header/Header'
import Example from '../../containers/Example/Example'
import style from './App.scss'

class App extends Component {
  componentDidMount() {
    console.log('hi')
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>home11111</div>} />
          <Route exact path="/catogory" component={() => <div>catogroy</div>} />
          <Route exact path="/live" component={Example} />
        </Switch>
      </Fragment>
    )
  }
}

App.defaultProps = {}

App.propTypes = {}

export default App
