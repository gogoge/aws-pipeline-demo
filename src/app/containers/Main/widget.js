import React from 'react'
const AsyncFetchResultTitles = (props) => {
  return <div>{
      props.data.fetchResult.map((value, idx) => {
        return <div key={idx}>{value.id} / {value.title}</div>
      })}
      </div>
}

export { AsyncFetchResultTitles }
