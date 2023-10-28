import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import TilePuzzle from "./pages/TilePuzzle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TilePuzzle />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
