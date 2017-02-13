import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './main.css'
import { actionCreators } from './actions'
import selector from './selector'
import { AsyncFetchResultTitles } from './widget'
const mapStateToProps = (state) => {
  return {
    data: selector(state),
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
    const { actions, data } = this.props

    return (
      <div styleName="test">
        {data.count}
        <button onClick={actions.increase}>+1</button>
        <button onClick={actions.decrease}>-1</button>
        <button onClick={actions.asyncLoad}>3sec +1</button>
        <button onClick={actions.fetch}>fetch</button>
        <AsyncFetchResultTitles data={data} />
      </div>
    )
  }
}
