//@flow
import React from 'react';
import { Provider } from 'react-redux'

import store from './store/'
import RouteList from './routes'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouteList/>
      </Provider>
    )
  }
}

export default App;
