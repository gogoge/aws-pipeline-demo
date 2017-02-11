import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader'

// import Main from 'components/Main'
// import style from '../css/style.sass'
//stateless component
const Root = () => {
    return <div><h1>qq</h1>q</div>
}
// HMR
// if (module.hot) {
//   module.hot.accept();
// }

//state component
export default class Index extends Component{
  constructor(props){
    super(props)
  }
  render () {
    return (
      <div>
        <Root />
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
