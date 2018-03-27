// @flow

import React from 'react'
import './index.css'

type Props = {|
  isLoading: boolean,
|}

export default const Loading = ({ isLoading }: Props) => {
  return (
    Props.isLoading === true ? (
      <div className="loader__container">
        <div className="loader" />
      </div>
    ) : null
  )
}
