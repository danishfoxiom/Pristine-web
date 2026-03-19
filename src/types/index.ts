export interface SidebarItem {
  id: string;
  title: string;
  icon?: string;
  path?: string;
  subItems?: SidebarItem[];
  badge?: string;
}

export type Role = 
  | 'admin' 
  | 'doctor';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}
