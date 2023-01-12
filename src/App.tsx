import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Editor from './components/editor/Editor';
import ErrorPage from './components/error-page';
import LandingPage from './components/landingPage/LandingPage';

const router = createBrowserRouter([
  {
    path: '/Pro5/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/Pro5/editor',
    element: <Editor />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
