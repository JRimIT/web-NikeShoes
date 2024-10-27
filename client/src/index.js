import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayOut from './layout/LayOut';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import store from './redux/revenue/storeRevenue';
=======
import store from './redux/store/store';
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
import ScrollToTop from './layout/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>
      <LayOut></LayOut>
<<<<<<< HEAD
    </BrowserRouter>,
=======
    </BrowserRouter>
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
