import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useSidebar } from "./context/SidebarContext";

function layout() {
  const { isOpen } = useSidebar();

  return (
    <>
      <Header />
      <Sidebar />
      <div className={`transition-all duration-300 ${isOpen ? 'md:ml-64' : 'ml-0'}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default layout;
