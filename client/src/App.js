import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**import all components */
import Username from './components/Username.js';
import Profile from './components/Profile.js';
import Reset from './components/Reset.js';
import Register from './components/Register.js';
import Recovery from './components/Recovery.js';
import Password from './components/Password.js';
import PageNotFound from './components/PageNotFound.js';



/**root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/profile',
        element : <Profile></Profile>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/password',
        element : <Password></Password>
    },
    {
        path : '/*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
    return (
      <main>
          <RouterProvider router={router}></RouterProvider>
      </main>
    )
  }

