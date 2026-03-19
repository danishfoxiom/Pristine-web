// src/components/suppliers/statCard.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1 text-gray-800">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary-color flex items-center justify-center">
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
