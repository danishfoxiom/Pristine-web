// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import * as Icons from "lucide-react";
// import { SidebarItem as SidebarItemType } from "../../types";

// interface SidebarItemProps {
//   item: SidebarItemType;
//   isCollapsed: boolean;
//   activeItemId: string;
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({
//   item,
//   isCollapsed,
//   activeItemId,
// }) => {
//   const isSubItemActive = item.subItems?.some((sub) => sub.id === activeItemId);
//   const [isExpanded, setIsExpanded] = useState(isSubItemActive);
//   const isActive = activeItemId === item.id;
//   const hasSubItems = item.subItems && item.subItems.length > 0;
//   const shouldShowActive = isActive && !hasSubItems;

//   const toggleExpand = (e: React.MouseEvent) => {
//     if (hasSubItems) {
//       e.preventDefault();
//       setIsExpanded(!isExpanded);
//     }
//   };

//   useEffect(() => {
//     if (isSubItemActive) {
//       setIsExpanded(true);
//     }
//   }, [isSubItemActive]);

//   const IconComponent = (() => {
//     const iconName =
//       (item.icon || "layout-dashboard").charAt(0).toUpperCase() +
//       (item.icon || "layout-dashboard").slice(1);
//     return (
//       (Icons[iconName as keyof typeof Icons] as React.ComponentType<any>) ||
//       Icons.LayoutDashboard
//     );
//   })();

//   // Green dot badge for new items
//   const isNew = item.badge === "new";

//   return (
//     <div className="sidebar-item-container py-[1rem]">
//       {hasSubItems ? (
//         <div>
//           <button
//             onClick={toggleExpand}
//             className={`sidebar-parent-item ${isSubItemActive ? "active" : ""}`}
//           >
//             <div className="item-icon-container">
//               <IconComponent
//                 size={20}
//                 className={isSubItemActive ? "text-primary-green" : "text-text-gray"}
//               />
//               {isNew && <span className="new-dot"></span>}
//             </div>
            
//             {isCollapsed ? (
//               <span className="tooltip">{item.title}</span>
//             ) : (
//               <>
//                 <span className="item-title">{item.title}</span>
//                 {item.badge && item.badge !== "new" && (
//                   <span className="item-badge">{item.badge}</span>
//                 )}
//                 {isExpanded ? (
//                   <ChevronDown size={16} className="chevron text-text-gray" />
//                 ) : (
//                   <ChevronRight size={16} className="chevron text-text-gray" />
//                 )}
//               </>
//             )}
//           </button>
          
//           {!isCollapsed && isExpanded && (
//             <div className="sub-items-container">
//               {item.subItems?.map((subItem) => (
//                 <Link
//                   key={subItem.id}
//                   to={subItem.path || "/"}
//                   className={`sub-item ${activeItemId === subItem.id ? "active" : ""}`}
//                 >
//                   {subItem.title}
//                   {subItem.badge && (
//                     <span className="sub-item-badge">{subItem.badge}</span>
//                   )}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link
//           to={item.path || "/"}
//           className={`sidebar-item ${shouldShowActive ? "active" : ""}`}
//         >
//           <div className="item-icon-container">
//             <IconComponent
//               size={20}
//               className={shouldShowActive ? "text-white" : "text-text-gray"}
//             />
//             {isNew && <span className="new-dot"></span>}
//           </div>
          
//           {isCollapsed ? (
//             <span className="tooltip">{item.title}</span>
//           ) : (
//             <>
//               <span className="item-title">{item.title}</span>
//               {item.badge && item.badge !== "new" && (
//                 <span className="item-badge">{item.badge}</span>
//               )}
//             </>
//           )}
//         </Link>
//       )}
      
//       <style jsx>{`
//         /* Sidebar Item Container */
//         .sidebar-item-container {
//           margin-bottom: 4px;
//           position: relative;
//         }
        
//         /* Main Item Styles */
//         .sidebar-item, .sidebar-parent-item {
//           display: flex;
//           align-items: center;
//           padding: 10px 12px;
//           border-radius: 8px;
//           transition: all 0.2s ease;
//           cursor: pointer;
//           width: 100%;
//           position: relative;
//           text-decoration: none;
//           border: none;
//           background: transparent;
//           text-align: left;
//         }
        
//         .sidebar-item.active {
//           background-color: #2A9D8F;
//           color: white;
//         }
        
//         .sidebar-parent-item.active {
//           color: #2A9D8F;
//           background-color: rgba(42, 157, 143, 0.1);
//           font-weight: 500;
//         }
        
//         .sidebar-item:hover:not(.active), 
//         .sidebar-parent-item:hover:not(.active) {
//           background-color: #F1F5F9;
//           color: #374151;
//         }
        
//         /* Icon Styles */
//         .item-icon-container {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .new-dot {
//           position: absolute;
//           top: -2px;
//           right: -2px;
//           width: 8px;
//           height: 8px;
//           background-color: #2A9D8F;
//           border-radius: 50%;
//         }
        
//         /* Item Title Styles */
//         .item-title {
//           margin-left: 12px;
//           flex: 1;
//           font-size: 14px;
//           font-weight: 500;
//           color: #374151;
//         }
        
//         .sidebar-item.active .item-title {
//           color: white;
//         }
        
//         .sidebar-parent-item.active .item-title {
//           color: #2A9D8F;
//         }
        
//         /* Badge Styles */
//         .item-badge {
//           padding: 2px 8px;
//           margin-left: 8px;
//           font-size: 11px;
//           font-weight: 600;
//           border-radius: 9999px;
//           background-color: #2A9D8F;
//           color: white;
//         }
        
//         /* Chevron Icon */
//         .chevron {
//           margin-left: 8px;
//           flex-shrink: 0;
//         }
        
//         /* Sub-items Container */
//         .sub-items-container {
//           margin-top: 4px;
//           margin-left: 32px;
//           padding-left: 8px;
//           border-left: 1px dashed rgba(107, 114, 128, 0.2);
//         }
        
//         /* Sub-item Styles */
//         .sub-item {
//           display: flex;
//           align-items: center;
//           padding: 8px 12px;
//           margin-bottom: 2px;
//           border-radius: 6px;
//           text-decoration: none;
//           color: #6B7280;
//           font-size: 13px;
//           transition: all 0.2s;
//         }
        
//         .sub-item.active {
//           background-color: rgba(42, 157, 143, 0.1);
//           color: #2A9D8F;
//           font-weight: 500;
//         }
        
//         .sub-item:hover:not(.active) {
//           background-color: #F1F5F9;
//           color: #374151;
//         }
        
//         /* Sub-item Badge */
//         .sub-item-badge {
//           margin-left: 8px;
//           padding: 2px 6px;
//           font-size: 10px;
//           font-weight: 600;
//           border-radius: 9999px;
//           background-color: #2A9D8F;
//           color: white;
//         }
        
//         /* Tooltip Styles */
//         .tooltip {
//           position: absolute;
//           left: 100%;
//           top: 50%;
//           transform: translateY(-50%);
//           margin-left: 8px;
//           padding: 6px 10px;
//           background-color: #2A9D8F;
//           color: white;
//           font-size: 12px;
//           border-radius: 4px;
//           white-space: nowrap;
//           opacity: 0;
//           pointer-events: none;
//           transition: opacity 0.2s;
//           z-index: 100;
//         }
        
//         .sidebar-item:hover .tooltip,
//         .sidebar-parent-item:hover .tooltip {
//           opacity: 1;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SidebarItem;