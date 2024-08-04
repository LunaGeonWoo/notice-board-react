import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
  },
]);

export default router;
