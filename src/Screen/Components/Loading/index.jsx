import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Loading = (props) => {
  return (
    props.isLoading ? (
      <div className="loader__container">
        <div className="loader" />
      </div>
    ): null
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
}

export default Loading
