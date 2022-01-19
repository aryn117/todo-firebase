import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { UserAuthContextProvider } from './auth/userAuthContext';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserAuthContextProvider>
        <Router>
          <App />
        </Router>
      </UserAuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
