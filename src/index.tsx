import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import './index.scss';
import remote from 'utils/remote';
import { toast } from 'react-toastify';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import persistedStore from './app/store';
import "react-toggle/style.css";

const { store, persistor } = persistedStore();
const { apiUrl } = remote();

axios.defaults.baseURL = apiUrl;
toast.configure({ position: 'top-right' });

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
