import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader'

// import Main from 'components/Main'
import './index.css'
//stateless component
const Root = () => {

  return <div><h1>123121212</h1></div>
}

class Counter extends Component {
  state = {
    cnt: 3,
  }
  click = () => {
    this.setState({ cnt: this.state.cnt+1 })
  }
  render () {
    return (
      <div styleName="test">
        {this.state.cnt}
        <button onClick={this.click}>+112</button>
      </div>
    )
  }
}

if (module.hot) {
  module.hot.accept()
}

//state component
export default class Index extends Component {
  constructor(props){
    super(props)
  }
  render () {
    return (
      <div>
        <Root />
        <Counter />
      </div>
    )
  }
}

const reactRootDom = document.querySelector('#react-root')
// root.innerHTML = `<p>Hello webpack.</p>`

// const reactRootDom = document.getElementById('react-root')

// const render = (Component, reactRootDom) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     document.getElementById(reactRootDom)
//   )
// }


ReactDOM.render(<Index />, reactRootDom)

// if (module.hot) {
//   module.hot.accept()
// }
