import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LayoutDashboard, Bell, Calendar, Image as ImageIcon, LogOut, Menu, Moon, Sun, X } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Protect the route: Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, navigate]);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  // If user is not logged in, do not render the layout to avoid flashing content
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Notices', path: '/admin/notices', icon: Bell },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex transition-colors duration-300 relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-30 h-screen transition-all duration-300 ease-in-out border-r border-maroon-800 dark:border-slate-800 flex-shrink-0
          bg-maroon-900 dark:bg-slate-900 text-white
          ${sidebarOpen ? 'translate-x-0 w-64' : (isMobile ? '-translate-x-full w-64' : 'translate-x-0 w-20')}
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-maroon-800 dark:border-slate-800 h-16">
           {sidebarOpen && <span className="font-bold text-lg animate-fade-in whitespace-nowrap overflow-hidden">Admin Panel</span>}
           <button 
             onClick={() => setSidebarOpen(!sidebarOpen)} 
             className="p-1.5 hover:bg-maroon-800 dark:hover:bg-slate-800 rounded-lg text-saffron-500 transition-colors ml-auto"
           >
             {isMobile && sidebarOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>

        <nav className="mt-6 px-2 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                location.pathname === item.path
                  ? 'bg-saffron-500 text-maroon-900 font-bold shadow-md'
                  : 'text-gray-300 hover:bg-maroon-800 dark:hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={22} className="flex-shrink-0" />
              {sidebarOpen && <span className="whitespace-nowrap overflow-hidden animate-fade-in">{item.name}</span>}
              {!sidebarOpen && !isMobile && (
                <div className="absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-maroon-800 dark:border-slate-800 bg-maroon-900 dark:bg-slate-900">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 text-gray-300 hover:text-white w-full px-3 py-2 hover:bg-maroon-800 dark:hover:bg-slate-800 rounded-lg transition-colors group relative ${!sidebarOpen && !isMobile ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="whitespace-nowrap overflow-hidden animate-fade-in">Logout</span>}
            {!sidebarOpen && !isMobile && (
              <div className="absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300">
        <header className="bg-white dark:bg-slate-900 shadow-sm p-4 h-16 flex justify-between md:justify-end items-center sticky top-0 z-10 border-b dark:border-slate-800">
           {/* Mobile Menu Trigger (Visible only when sidebar is closed on mobile) */}
           <div className="md:hidden">
             {!sidebarOpen && (
               <button onClick={() => setSidebarOpen(true)} className="text-gray-600 dark:text-gray-300 p-2">
                 <Menu size={24} />
               </button>
             )}
           </div>

           <div className="flex items-center gap-4 md:gap-6">
             <button 
               onClick={toggleTheme} 
               className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-saffron-500 transition-colors"
               title="Toggle Dark Mode"
             >
               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>
             <div className="flex flex-col text-right hidden sm:flex">
               <span className="text-gray-800 dark:text-gray-200 text-sm font-bold">Admin</span>
               <span className="text-xs text-gray-500 dark:text-gray-400">Administrator</span>
             </div>
             <div className="w-9 h-9 md:w-10 md:h-10 bg-maroon-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-maroon-900 dark:text-saffron-500 font-bold border border-maroon-200 dark:border-slate-700">
               A
             </div>
           </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-700">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;