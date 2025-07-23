import './App.css';
import { RouterProvider } from 'react-router';
import { myrouter } from './routes/routes';
import { ThemeProvider } from './Context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={myrouter} />
    </ThemeProvider>
  );
}

export default App;
