import { useState } from 'react';
import { AuthProvider } from "./Context/AuthContext";
import './App.css';
import { RouterProvider } from 'react-router';
import { myrouter } from './routes/routes';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={myrouter}></RouterProvider>
    </AuthProvider>
  )
}

export default App
