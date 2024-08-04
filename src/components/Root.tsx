import Header from "./Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <ReactQueryDevtools />
    </>
  );
}
