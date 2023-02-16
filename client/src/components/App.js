import React, { Component } from 'react';
import SignUp from './SignUp';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const router= createBrowserRouter([
   {
    path: '/',
    element: <SignUp></SignUp>
   }
])

export class App extends Component {
  render() {
    return (
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    )
  }
}

export default App