import React from 'react'
const AsyncFetchResultTitles = (props) => {
  return <div>{
      (props.data.fetchResult.length) ?
      props.data.fetchResult.map((value, idx) => {
        return <div key={idx}>{value.id} / {value.title}</div>
      }) :
      <div>press fetch see result</div>
      }
      </div>
}

export { AsyncFetchResultTitles }
