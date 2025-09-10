import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useSidebar } from "./context/SidebarContext";
import { useAuth } from "./context/AuthContext";

function layout() {
  const { isOpen } = useSidebar();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Pages where sidebar should not be shown (even if authenticated)
  const pagesWithoutSidebar = ['/', '/signin', '/signup', '/about', '/team', '/terms', '/changelog'];
  
  // Show sidebar only if user is authenticated AND not on excluded pages
  const shouldShowSidebar = isAuthenticated && !pagesWithoutSidebar.includes(location.pathname);

  return (
    <>
      <Header />
      {shouldShowSidebar && <Sidebar />}
      <div className={`transition-all duration-300 ${shouldShowSidebar && isOpen ? 'md:ml-64' : 'ml-0'}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default layout;
