import { useState } from 'react';
import Home from './Home';
import { Service } from '../Component/Service';

const menuItems = [
  { label: 'Home', value: 'HOME' },
  { label: 'EMPLOYEE', value: 'EMPLOYEE' },
  { label: 'DEPARTMENT', value: 'DEPARTMENT' },
  { label: 'EMPLOYEEDEPARTMENT', value: 'EMPLOYEEDEPARTMENT' },
];

export default function Navbar({ logout }) {
  const [activeMenu, setActiveMenu] = useState('HOME');

  const renderContent = () => {
    return activeMenu === 'HOME' ? <Home /> : <Service service={activeMenu} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-sky-600 to-sky-800 p-4 flex flex-wrap items-center justify-between shadow-md">
        <div className="text-white text-2xl font-semibold tracking-wide">HRSERVICE</div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveMenu(item.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeMenu === item.value
                  ? 'bg-white text-sky-700 shadow'
                  : 'bg-sky-500 text-white hover:bg-sky-400'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="p-4">{renderContent()}</div>
    </div>
  );
}
