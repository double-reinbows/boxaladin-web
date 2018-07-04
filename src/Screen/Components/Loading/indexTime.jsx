// @flow

import React from 'react'
import './index.css'

type Props = {|
  isLoadingTime: boolean,
|}

const LoadingTime = ({ isLoadingTime, timer }: Props) => {
  return (
    isLoadingTime === true ? (
      <div className="loader__container">
        <div className="loader" />
        <h1>{timer}</h1>
      </div>
    ) : null
  )
}

export default LoadingTime
