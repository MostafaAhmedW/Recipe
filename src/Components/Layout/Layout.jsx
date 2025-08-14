import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className=" flex justify-between flex-col min-h-screen">
        <Outlet />

        <Footer/>
      </div>
    </>
  );
}
