// @flow

import React, { Component } from 'react'
import './index.css'

class Loading extends Component <{}> {

  render() {
    return (
      <div className="loader__container">
        <div className="loader" />
      </div>
    )
  }

}

export default Loading