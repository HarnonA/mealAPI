import { Provider } from 'react-redux'
import Routes from './Routes'

import storeConfig from './store/storeConfig'

import './App.css'

function App(props) {
  const store = storeConfig();
  return (
    <Provider store={store} >
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
