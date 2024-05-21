import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Home />} />
    <Route path="about/" element={<About />} />
  </Route>
));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
