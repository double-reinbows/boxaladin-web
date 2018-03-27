// @flow

import React from 'react'
import './index.css'

type Props = {|
  isLoading: boolean,
|}

const Loading = ({ isLoading }: Props) => {
  return (
    isLoading === true ? (
      <div className="loader__container">
        <div className="loader" />
      </div>
    ) : null
  )
}

export default Loading