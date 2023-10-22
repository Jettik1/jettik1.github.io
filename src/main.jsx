import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './widgets/store'
import App from './App.jsx'
import './index.css'
import Post from "./components/Post.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: `:id`,
        errorElement: <ErrorPage/>,
        element: <Post />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,

)
