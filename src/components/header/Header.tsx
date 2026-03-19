import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Menu,
  MessageSquare,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { message, Modal } from "antd";

interface UserType {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface HeaderProps {
  user: UserType | null;
  onMenuClick: () => void;
  avatar?: string;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick }) => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    if (showUserMenu) setShowUserMenu(false);
  };

  const showLogoutConfirm = () => {
    setShowUserMenu(false);
    setIsModalVisible(true);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // Simple logout - just navigate to home
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
      setIsModalVisible(false);
    }
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md px-3 py-3 flex justify-between items-center rounded-[33px] w-[97%] ml-2 mr-3 mb-6">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-primary-dark hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 lg:w-80 pl-10 pr-4 py-2 rounded-sm border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-color text-sm"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg text-primary-dark hover:bg-gray-100 relative">
          <MessageSquare size={20} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            1
          </span>
        </button>

        <button
          onClick={toggleNotifications}
          className="p-2 rounded-lg text-primary-dark hover:bg-gray-100 relative dropdown-container"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Notification dropdown */}
        {showNotifications && (
          <div className="absolute top-16 right-4 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-primary-dark">
                Notifications
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="p-3 border-b border-gray-200 hover:bg-gray-100">
                <p className="text-sm font-medium text-primary-dark">
                  New admission application
                </p>
                <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
              </div>
              <div className="p-3 border-b border-gray-200 hover:bg-gray-100">
                <p className="text-sm font-medium text-primary-dark">
                  Fee payment received
                </p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
              <div className="p-3 hover:bg-gray-100">
                <p className="text-sm font-medium text-primary-dark">
                  Staff meeting reminder
                </p>
                <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
              </div>
            </div>
            <div className="p-2 border-t border-gray-200">
              <button className="w-full text-center text-xs text-primary-color hover:text-primary-dark font-medium py-1 rounded">
                View all notifications
              </button>
            </div>
          </div>
        )}

        {/* User profile */}
        <div className="relative dropdown-container">
          <button
            onClick={toggleUserMenu}
            className="flex items-center space-x-2 p-2 rounded-md border border-gray-200 hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || "User"}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <span className="text-white text-sm font-medium">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium text-primary-dark">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role ? user?.role?.toLowerCase() : "user"}
              </p>
            </div>
            <ChevronDown
              size={16}
              className="text-primary-dark hidden sm:block"
            />
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute top-14 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-3 border-b border-gray-200">
                <p className="text-sm font-medium text-primary-dark">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {user?.role ? user?.role?.toLowerCase() : "user"}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/users/profiles");
                  }}
                  className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-primary-dark hover:bg-gray-100"
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/settings");
                  }}
                  className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-primary-dark hover:bg-gray-100"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
              </div>
              <div className="py-1 border-t border-gray-200">
                <button
                  onClick={showLogoutConfirm}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut size={16} />
                  <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Log out"
        cancelText="Cancel"
        okButtonProps={{ danger: true, disabled: isLoggingOut }}
        cancelButtonProps={{ disabled: isLoggingOut }}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </header>
  );
};

export default Header;
