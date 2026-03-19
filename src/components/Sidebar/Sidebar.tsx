import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  LucideIcon,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFilteredNavigation } from "./navigation"; // Import from navigation.js
import { Modal } from "antd";
import { useAuth } from "../../context/AuthContext";

// Improved type definitions
interface SubMenuItem {
  id: string;
  title: string;
  path: string;
  resource: string;
}

interface BaseMenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: string;
}

interface LeafMenuItem extends BaseMenuItem {
  path: string;
  resource: string;
  subItems?: never;
}

interface ParentMenuItem extends BaseMenuItem {
  path?: never;
  resource: string[];
  subItems: SubMenuItem[];
}

type MenuItem = LeafMenuItem | ParentMenuItem;

interface ExpandedMenus {
  [key: string]: boolean;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenus>({});
  const [generalExpanded, setGeneralExpanded] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Get user permissions from auth context
  const userPermissions = useMemo(() => {
    return user?.permissions || [];
  }, [user]);

  // Memoize filtered navigation to prevent unnecessary recalculations
  const menuItems = useMemo(
    () => getFilteredNavigation({ permissions: userPermissions }) as MenuItem[],
    [userPermissions]
  );

  // Type guard for ParentMenuItem
  const isParentMenuItem = (item: MenuItem): item is ParentMenuItem => {
    return Array.isArray((item as ParentMenuItem).subItems);
  };

  // Find parent menu item for a given path
  const findParentMenuItem = useCallback(
    (path: string): MenuItem | null => {
      for (const item of menuItems || []) {
        if (
          item &&
          isParentMenuItem(item) &&
          item.subItems?.some((subItem) => subItem.path === path)
        ) {
          return item;
        }
      }
      return null;
    },
    [menuItems]
  );

  // Update active menu and expanded state based on current path
  const updateActiveMenuState = useCallback(
    (currentPath: string) => {
      // Direct match in main items
      const mainMenuItem = menuItems?.find(
        (item) => !isParentMenuItem(item) && item?.path === currentPath
      );
      if (mainMenuItem) {
        setActiveMenu(mainMenuItem.id);
        setExpandedMenus((prev) => ({
          ...prev,
          [mainMenuItem.id]: false,
        }));
        return;
      }

      // Check in subitems
      const parentItem = findParentMenuItem(currentPath);
      if (parentItem && isParentMenuItem(parentItem)) {
        const subItem = parentItem.subItems?.find(
          (sub) => sub.path === currentPath
        );
        if (subItem) {
          setActiveMenu(subItem.id);
          setExpandedMenus((prev) => ({
            ...prev,
            [parentItem.id]: true,
          }));
        }
      }
    },
    [menuItems, findParentMenuItem]
  );

  // Handle location changes
  useEffect(() => {
    if (location.pathname) {
      updateActiveMenuState(location.pathname);
    }
  }, [location.pathname, updateActiveMenuState]);

  // Toggle submenu with proper event handling
  const toggleSubmenu = useCallback((menuId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  }, []);

  // Handle menu item clicks
  const handleMenuClick = useCallback(
    (
      menuId: string,
      path: string,
      hasSubmenus?: boolean,
      e?: React.MouseEvent
    ) => {
      e?.preventDefault();

      // If clicking the same menu item that's already active and has submenus
      if (activeMenu === menuId && hasSubmenus) {
        toggleSubmenu(menuId, e);
        return;
      }

      setActiveMenu(menuId);

      // Navigate only if there's a path and no submenus
      if (path && !hasSubmenus) {
        navigate(path);
        // Close other menus when navigating to a leaf node
        setExpandedMenus(() => {
          const parentItem = findParentMenuItem(path);
          return parentItem ? { [parentItem.id]: true } : {};
        });
      } else if (hasSubmenus) {
        // Toggle the clicked menu's expanded state
        toggleSubmenu(menuId, e);
      }
    },
    [activeMenu, navigate, toggleSubmenu, findParentMenuItem]
  );

  // Render icon component with proper type checking
  const renderIcon = useCallback((IconComponent: any) => {
    if (!IconComponent) return null;
    return <IconComponent size={20} />;
  }, []);

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  return (
    <div
      ref={sidebarRef}
      className="bg-primary-color mt-5 ml-4 w-[260px] h-[95vh] rounded-[30px] overflow-hidden flex flex-col"
    >
      {/* App Logo/Title - Sticky */}
      <div className="px-8 py-3 border-b border-white/20 text-white sticky top-0 z-10">
        <h1 className="text-xl font-bold">LMS</h1>
      </div>

      {/* Menu Items - Scrollable */}
      <div
        ref={menuContainerRef}
        className="overflow-y-auto overflow-x-hidden flex-grow scrollbar-none"
      >
        <ul className="list-none pt-[14px] m-0">
          {menuItems?.map((item) => {
            if (!item) return null;
            return (
              <li key={item.id} className={expandedMenus[item.id] ? "" : ""}>
                <div
                  className={`concave-item relative px-8 py-2.5 mb-1 flex items-center cursor-pointer transition-colors duration-200 ${
                    activeMenu === item.id
                      ? "active bg-background text-primary-color font-medium ml-2 rounded-l-[20px]"
                      : "text-white hover:bg-white/15 rounded-l-[20px]"
                  }`}
                  onClick={(e) =>
                    handleMenuClick(
                      item.id,
                      item.path ?? "",
                      !!item.subItems,
                      e
                    )
                  }
                >
                  <span className="mr-3">{renderIcon(item.icon)}</span>
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {item.badge}
                    </span>
                  )}
                  {item.subItems && (
                    <span
                      className="p-1"
                      onClick={(e) => toggleSubmenu(item.id, e)}
                    >
                      {expandedMenus[item.id] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </div>

                {item.subItems && expandedMenus[item.id] && (
                  <ul className="list-none pl-12 m-0">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={`concave-item relative px-2.5 py-2.5 mb-1 border-none flex items-center cursor-pointer text-sm leading-tight transition-colors duration-200 ${
                          activeMenu === subItem.id
                            ? "active bg-background text-primary-color font-medium rounded-l-[20px]"
                            : "text-white hover:bg-white/15 rounded-l-[20px]"
                        }`}
                        onClick={(e) =>
                          handleMenuClick(
                            subItem.id,
                            subItem.path ?? "",
                            false,
                            e
                          )
                        }
                      >
                        {subItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* General Section - Sticky Footer */}
      <div className="sticky bottom-0 bg-primary-color border-t border-white/20 z-10 pt-2 pb-2">
        <div
          className="px-8 py-3 flex items-center justify-between cursor-pointer text-white hover:bg-white/15 rounded-l-lg mx-2"
          onClick={() => setGeneralExpanded(!generalExpanded)}
        >
          <h3 className="text-xs uppercase font-medium">General</h3>
          {generalExpanded ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </div>

        {generalExpanded && (
          <ul className="list-none p-0 mx-2 mt-1 mb-2">
            <li
              className="concave-item px-8 py-2.5 flex items-center cursor-pointer text-white hover:bg-white/15 rounded-l-lg"
              onClick={() => navigate("/settings")}
            >
              <Settings size={18} className="mr-3" />
              <span>Settings</span>
            </li>
            <li
              className="concave-item px-8 py-2.5 flex items-center cursor-pointer text-white hover:bg-white/15 rounded-l-lg"
              onClick={() => navigate("/help")}
            >
              <HelpCircle size={18} className="mr-3" />
              <span>Help</span>
            </li>
            <li
              className="concave-item px-8 py-2.5 flex items-center cursor-pointer text-white hover:bg-white/15 rounded-l-lg"
              onClick={showLogoutConfirm}
            >
              <LogOut size={18} className="mr-3" />
              <span>Logout</span>
            </li>
          </ul>
        )}
      </div>

      {/* Updated CSS with concave corner styles */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Concave corner styles */
        .concave-item {
          position: relative;
        }

        .concave-item.active::before,
        .concave-item.active::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 20px;
          right: 0;
          background: transparent;
          z-index: 1;
        }

        .concave-item.active::before {
          top: -20px;
          border-bottom-right-radius: 20px;
          box-shadow: 0 10px 0 0 var(--theme-background-color, white);
        }

        .concave-item.active::after {
          bottom: -20px;
          border-top-right-radius: 20px;
          box-shadow: 0 -10px 0 0 var(--theme-background-color, white);
        }

        /* Ensure proper stacking context */
        .concave-item.active {
          z-index: 2;
        }
      `}</style>

      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Log out"
        cancelText="Cancel"
        // okButtonProps={{ danger: true }}
        // cancelButtonProps={{ disabled: isLoggingOut }}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default Sidebar;
