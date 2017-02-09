import React, { Component } from 'react'
import { render } from 'react-dom'
// import Main from 'components/Main'
// import style from '../css/style.sass'
//stateless component
const Root = () => {
    return <div><h1>1213</h1>q</div>
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

// const reactRootDom = document.querySelector('#react-root')
// root.innerHTML = `<p>Hello webpack.</p>`

const reactRootDom = document.getElementById('react-root')
render(<Index />, reactRootDom)
