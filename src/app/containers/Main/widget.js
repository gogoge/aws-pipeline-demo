import './main.css'
import React from 'react'
const AsyncFetchResultTitles = (props) => {
  return <div>{
      (props.data.fetchResult.length) ?
      props.data.fetchResult.map((value, idx) => {
        return <div key={idx}>
          <span styleName="number">{value.id}</span>
          <span styleName="fetch-text">{value.title}</span>
        </div>
      }) :
      <div>press fetch see result</div>
      }
      </div>
}

export { AsyncFetchResultTitles }
