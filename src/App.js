import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TilePuzzle from "./pages/TilePuzzle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TilePuzzle />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
