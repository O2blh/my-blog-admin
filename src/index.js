import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux'
import App from './App'

import './style/common.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/admin">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
