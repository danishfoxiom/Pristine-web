export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface SubItem {
  id: string;
  title: string;
  path: string;
}

export interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  path?: string;
  badge?: string;
  subItems?: SubItem[];
}


export interface ExamType {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  created_by: string;
}
