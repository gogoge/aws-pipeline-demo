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
  componentWillMount() {
    this.props.actions.fetch()
  }
  render () {
    const { actions, data } = this.props

    return (
      <div styleName="test">
        <p styleName="subtitle">新的副標題</p>
        <p styleName="title">一個主標題</p>
        <p styleName="description">但是我是看著地面的人，我想修補就在我面前的坑洞，以免跌進去。</p>
        <p styleName="number">{data.count}</p>
        <button onClick={actions.increase}>+1</button>
        <button onClick={actions.decrease}>-1</button>
        <button onClick={actions.asyncLoad}>3sec +1</button>
        <button onClick={actions.fetch}>fetch</button>
        <AsyncFetchResultTitles data={data} />
      </div>
    )
  }
}
