import { useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router';
import { myrouter } from './routes/routes';

function App() {

  return (
    <RouterProvider router={myrouter} />
  )
}

export default App
