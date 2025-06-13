import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FilePlus, 
  Search, 
  ClipboardList,
  Archive,
  Bell,
  User,
  LayoutDashboard
} from 'lucide-react';
import { useUser } from '../../../hooks/useUser';

const WebLayout: React.FC = () => {
const navigate = useNavigate();
  const {authUser} = useUser()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with right border */}
      <div className="w-64 bg-white flex flex-col gap-4 border-r border-gray-200">
        {/* Logo */}
        <div className="p-4 mt-1">
          <div className="flex items-center pl-4 space-x-2">
            <Archive className="text-[#2196F3] size-6" />
            <span className="text-2xl font-semibold text-[#111827]">ArchiveDigital</span>
          </div>
        </div>
        
        {/* Navigation with more space at the top */}
        <nav className="flex-1 p-4 pl-10 pt-6 space-y-3 ">
          <NavItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            text="Dashboard" 
            to="/"
          />
          <NavItem 
            icon={<UploadCloud className="h-5 w-5" />} 
            text="Digitalise" 
            to="/digitalise"
          />
          <NavItem 
            icon={<FilePlus className="h-5 w-5" />} 
            text="Create" 
            to="/create"
          />
          <NavItem 
            icon={<Search className="h-5 w-5" />} 
            text="Search" 
            to="/search"
          />
          <NavItem 
            icon={<ClipboardList className="h-5 w-5" />} 
            text="Audit Log" 
            to="/audit-log"
          />
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              {/* Breadcrumbs or other elements can go here */}
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-[#4B5563] hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 cursor-pointer"  onClick={()=>navigate(`/profile/${authUser?.username}`)}>
                <div className="h-8 w-8 rounded-full bg-[#2196F3] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[#111827]">{authUser?.username.split(' ')[0] || 'John Doe'}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Improved NavItem component with proper active state
interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center space-x-3 p-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-[#2196F3]/10 text-[#2196F3] font-medium border-l-4 border-[#2196F3] pl-2.5' 
          : 'text-[#4B5563] hover:bg-gray-100 hover:text-[#2196F3]'
        }`
      }
    >
      <span>
        {icon}
      </span>
      <span>{text}</span>
    </NavLink>
  );
};

export default WebLayout;