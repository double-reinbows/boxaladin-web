import React from 'react'
import './index.css'

class Loading extends React.Component {

  render() {
    return (
      <div className="loader__container">
        <div className="loader" />
      </div>
    )
  }

}

export default Loading