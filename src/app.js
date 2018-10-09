import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import 'semantic-ui-css/semantic.min.css';
import "react-toggle/style.css";
import './index.html';

// Create app
const container = document.querySelector('#app-container');

// Render app
ReactDOM.render(
  <BrowserRouter>
    <AppContainer>
      <App />
    </AppContainer>
  </BrowserRouter>
  , container
);

// Hot module reloading
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <BrowserRouter>
        <AppContainer>
          {/* <App /> */}
        </AppContainer>
      </BrowserRouter>
      , container
    );
  });
}
