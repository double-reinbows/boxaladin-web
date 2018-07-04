// @flow

import React from 'react'
import './index.css'

type Props = {|
  isLoadingTime: boolean,
|}

const LoadingTime = ({ isLoadingTime, timer }: Props) => {
  if (timer >= 100) {
    timer = 100;
  }
  return (
    isLoadingTime === true ? (
      <div className="loader__container">
        <h1 style = {{ fontWeight: 'bold', color: 'white' }}>{timer}%</h1>
        <div className="loader" />
      </div>
    ) : null
  )
}

export default LoadingTime
