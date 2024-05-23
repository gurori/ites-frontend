import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Home />} />
    <Route path="about/" element={<About />} />
    <Route path="login/" element={<Login />} />
    <Route path="register/" element={<Register />} />
  </Route>
));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
