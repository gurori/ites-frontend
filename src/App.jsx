import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Home from "./components/pages/home/Home";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Home />} />
  </Route>
));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
