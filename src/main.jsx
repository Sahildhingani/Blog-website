import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './Component/Signup.jsx';
import Login from './Component/Login.jsx';
import Layout from './Layout.jsx';
import Home from './Component/Home.jsx';
import About from './Component/About.jsx';
import SelfPost from './Component/YourPost.jsx';
import CreatePost from './Component/PostPage.jsx';
import store from './app/Store.js';
import { Provider } from 'react-redux';
import Pageview from './Component/viewpage.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />, // Default route
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout />, // Shared layout for authenticated routes
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/selfposts',
        element:<SelfPost/>,
      },
      {
        path:'/createpost',
        element:<CreatePost/>
      },
      {
        path:'/page',
        element:<Pageview/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

