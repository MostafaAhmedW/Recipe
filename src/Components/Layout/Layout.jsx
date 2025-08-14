import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className=" flex justify-between flex-col min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
