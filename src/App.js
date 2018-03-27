// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './store/'
import RouteList from './routes'

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <RouteList/>
      </Provider>
    )
  }
}

