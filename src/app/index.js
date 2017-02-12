import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Main from './containers/Main'

if (module.hot) {
  module.hot.accept()
}

export default class Index extends Component {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

const reactRootDom = document.querySelector('#react-root')
ReactDOM.render(<Index />, reactRootDom)
