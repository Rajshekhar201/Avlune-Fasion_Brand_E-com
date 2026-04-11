"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user has authenticated in this session
    const authStatus = sessionStorage.getItem("avlune_admin_auth");
    if (authStatus !== "true") {
      setIsAuthenticated(false);
      if (pathname !== "/admin") {
        router.push("/admin");
      }
    } else {
      setIsAuthenticated(true);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem("avlune_admin_auth");
    setIsAuthenticated(false);
    router.push("/admin");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Visitors", href: "/admin/visitors", icon: Users },
  ];

  // If we're on the login page, just show the login content
  if (!isAuthenticated && pathname === "/admin") {
    return <>{children}</>;
  }

  // Prevent flash of content before redirecting
  if (!isAuthenticated) return null;

  return (
    <div className="admin-container">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header">
          <span className="brand-text">AVLUNÈ Admin</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: "-100%" } : false}
            animate={{ x: 0 }}
            exit={isMobile ? { x: "-100%" } : false}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`admin-sidebar ${isMobile ? "mobile" : ""}`}
          >
            <div className="sidebar-header">
              <h2>AVLUNÈ</h2>
              <p>Administration</p>
              {isMobile && (
                <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
                  <X size={20} />
                </button>
              )}
            </div>

            <nav className="sidebar-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                    className={`nav-item ${isActive ? "active" : ""}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="sidebar-footer">
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
              <Link href="/" className="back-to-site" target="_blank">
                View Live Site →
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`admin-main ${isMobile ? "mobile" : ""}`}>
        {children}
      </main>

      <style jsx global>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background-color: #F8F9FA;
          font-family: var(--font-body);
        }

        .mobile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #111;
          color: white;
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 40;
        }

        .brand-text {
          font-family: var(--font-display);
          font-size: 1.25rem;
          letter-spacing: 0.1em;
        }

        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 50;
        }

        .admin-sidebar {
          width: 260px;
          background-color: #111;
          color: white;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 60;
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .admin-sidebar.mobile {
          width: 80%;
          max-width: 300px;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }

        .sidebar-header h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.15em;
          margin: 0;
          color: var(--color-accent);
        }

        .sidebar-header p {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-top: 0.25rem;
        }

        .close-btn {
          position: absolute;
          right: 1.5rem;
          top: 2rem;
          color: white;
        }

        .sidebar-nav {
          padding: 1.5rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          color: rgba(255,255,255,0.7);
          border-radius: 8px;
          transition: all 0.2s ease;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .nav-item.active {
          background: var(--color-accent);
          color: #111;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255,255,255,0.7);
          transition: color 0.2s;
          font-size: 0.875rem;
          padding: 0.5rem 0;
          width: 100%;
        }

        .logout-btn:hover {
          color: #EF4444;
        }

        .back-to-site {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          text-decoration: underline;
        }

        .admin-main {
          flex: 1;
          margin-left: 260px;
          padding: 2rem;
          min-height: 100vh;
        }

        .admin-main.mobile {
          margin-left: 0;
          padding: 5rem 1rem 2rem 1rem;
        }
        
        .admin-page-title {
          font-family: var(--font-display);
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #111;
        }
      `}</style>
    </div>
  );
}
