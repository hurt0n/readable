import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './styles/prod/css/surface_styles.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import reducer from './reducers'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
