import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './main.css'
import { actionCreators } from './actions'

const mapStateToProps = (state) => {
  return {
    count: state.mainReducer.count,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
  render () {
    const { actions, count } = this.props
    return (
      <div styleName="test">
        {count}
        <button onClick={actions.increase}>+1</button>
        <button onClick={actions.decrease}>-1</button>
      </div>
    )
  }
}
