import React, { Component } from 'react'


class Test extends Component {

  state = {
    user : ''
  }

  componentWillMount() {
      axios.get('')
        .then(response =>
          this.setState({ user : response.data })
        );
    }


  render () {

  }
}
