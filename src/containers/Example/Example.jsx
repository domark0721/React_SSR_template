import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FETCH_MUSIC_INFO } from '../../constants/actionTypes'

const mapStateToProps = state => ({
  storeState: state.music,
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch({ type: FETCH_MUSIC_INFO }),
})

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    console.log('component Did Mount ')
    console.log(process.env.NODE_ENV)
  }

  clickBtn = () => {
    const { fetchData } = this.props
    fetchData()
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.clickBtn}>
          Fetch the data
        </button>
      </div>
    )
  }
}

Example.propTypes = {
  fetchData: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Example)
