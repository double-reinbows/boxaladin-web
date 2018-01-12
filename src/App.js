import React from 'react';
import { Provider } from 'react-redux'

import store from './store/'
import RouteList from './routes'
import phone from './phone.jpeg'

class App extends React.Component {
  render() {
    return (
      <div>
      <img  src={phone} width="350"  height="900" alt='logo' style={{ zIndex:1, float:'right', paddingTop: '300px'}}/>
      <Provider store={store}>
        <RouteList/>
      </Provider>
      </div>
    )
  }
}

export default App;
