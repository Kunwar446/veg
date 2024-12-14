import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom"
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'


// redux-persist
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "./redux/store.js"
import {Provider} from "react-redux"


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store }>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ,
)
