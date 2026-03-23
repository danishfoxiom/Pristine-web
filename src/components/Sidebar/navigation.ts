// navigation.js
import {
  LayoutDashboard,
  Package,
  Users,
  LucideIcon,
} from "lucide-react";

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

// Define all navigation items with resources
const allNavigation: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    resource: "dashboard",
  },
  {
    id: "patient",
    title: "Patient",
    icon: Users,
    path: "/patient",
    resource: "patients",
  },
  {
    id: "product",
    title: "Product",
    icon: Package,
    path: "/product",
    resource: "products",
  },
  {
    id: "order-history",
    title: "Order History",
    icon: Package,
    path: "/order-history",
    resource: "order-history",
  },
];

// Function to filter navigation based on user permissions
export const getFilteredNavigation = (user: {
  permissions: Array<{ resource: string } | string>;
}): MenuItem[] => {
  if (!user || !user.permissions || !Array.isArray(user.permissions)) {
    return [];
  }

  // Extract allowed resources from user permissions
  const allowedResources = user.permissions
    .map((permission) => {
      // Handle both string and object formats
      if (typeof permission === "string") {
        return permission.toLowerCase();
      } else if (permission && typeof permission.resource === "string") {
        return permission.resource.toLowerCase();
      }
      return null;
    })
    .filter(Boolean); // Remove any null values

  // Create a unique set of resources
  const uniqueResources = [...new Set(allowedResources)];

  // Type guard for ParentMenuItem
  const isParentMenuItem = (item: MenuItem): item is ParentMenuItem => {
    return Array.isArray((item as ParentMenuItem).subItems);
  };

  // Filter navigation items based on permissions
  return allNavigation
    .map((item): MenuItem | null => {
      // Check if the navigation item's resource is in allowed resources
      const isResourceAllowed = Array.isArray(item.resource)
        ? item.resource.some((res) =>
            uniqueResources.includes(res.toLowerCase())
          )
        : uniqueResources.includes(item.resource?.toLowerCase());

      if (!isResourceAllowed) {
        return null;
      }

      // If the item has subitems, filter those too
      if (isParentMenuItem(item)) {
        const filteredSubItems = item.subItems.filter((subItem) =>
          uniqueResources.includes(subItem.resource?.toLowerCase())
        );

        // Only include this item if it has at least one allowed subitem
        if (filteredSubItems.length === 0) {
          return null;
        }

        // Return a new object with filtered subitems
        return {
          ...item,
          subItems: filteredSubItems,
        };
      }

      // Return the original nav item if it has no subitems
      return item;
    })
    .filter((item): item is MenuItem => item !== null); // Remove any null items and assert type
};

// Export for direct use in components
export const navigation = allNavigation;

// Helper function to check if user has access to a specific resource
export const hasAccessToResource = (
  user: { permissions: Array<{ resource: string } | string> },
  resource: string
): boolean => {
  if (!user || !user.permissions || !Array.isArray(user.permissions)) {
    return false;
  }

  const allowedResources = user.permissions
    .map((permission) => {
      if (typeof permission === "string") {
        return permission.toLowerCase();
      } else if (permission && typeof permission.resource === "string") {
        return permission.resource.toLowerCase();
      }
      return null;
    })
    .filter(Boolean);

  return allowedResources.includes(resource.toLowerCase());
};

// Helper function to check if user has specific action permission on a resource
export const hasPermission = (
  user: { permissions: Array<{ resource: string; action: string } | string> },
  resource: string,
  action: string
): boolean => {
  if (!user || !user.permissions || !Array.isArray(user.permissions)) {
    return false;
  }

  return user.permissions.some((permission) => {
    if (
      typeof permission === "object" &&
      permission.resource &&
      permission.action
    ) {
      return (
        permission.resource.toLowerCase() === resource.toLowerCase() &&
        permission.action.toLowerCase() === action.toLowerCase()
      );
    }
    return false;
  });
};
