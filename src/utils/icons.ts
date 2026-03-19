import * as Icons from "lucide-react";

export const getIcon = (iconName: string): React.ComponentType<any> => {
  const IconComponent =
    Icons[
      (iconName.charAt(0).toUpperCase() +
        iconName.slice(1)) as keyof typeof Icons
    ];
  return (IconComponent as React.ComponentType<any>) || Icons.LayoutDashboard;
};
