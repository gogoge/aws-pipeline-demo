import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Main from './containers/Main'
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link, match } from 'react-router'

if (module.hot) {
  module.hot.accept()
}

const Root = () => (<h1>Client Root<Link to="/A">A</Link></h1>)
const NoMatch = () => (<h1>Client NoMatch</h1>)

const routes = (
  <Route path="/">
    <IndexRoute component={Root} />
    <Route path="/A" component={Main} />
    <Route path="*" component={NoMatch} />
  </Route>
)

export default class Index extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router routes={routes} history={hashHistory} />
      </Provider>
    )
  }
}

const reactRootDom = document.querySelector('#react-root')
ReactDOM.render(<Index />, reactRootDom)
