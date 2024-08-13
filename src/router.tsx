import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import PostDetail from "./routes/PostDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "posts/:postId/",
        element: <PostDetail />,
      },
      {
        path: "social",
        children: [
          { path: "github", element: <GithubConfirm /> },
          { path: "kakao", element: <KakaoConfirm /> },
        ],
      },
    ],
  },
]);

export default router;
