// globalStyles.js
// Import this in your root component to apply the table styling globally

import { createGlobalStyle } from 'styled-components';

const primaryColor = '#102257'   // blue color 
// const primaryColor = '#fb1f8b'   // pink color 

const GlobalStyles = createGlobalStyle`
  /* Custom styling for all Ant Design tables with the styled-order-table class */
  /* Custom styling for all Ant Design tables with the styled-order-table class */
  .styled-order-table {
    /* Overall table container */
    margin: 0 !important;
    background: transparent !important;
    width: 100% !important; /* Ensure table takes full width of container */
    padding: 24px !important;

    /* Fix table layout issues */
    .ant-table {
      background: transparent !important;
      width: 100% !important;
    }
    
    .ant-table-container {
      border-start-start-radius: 0 !important;
      border-start-end-radius: 0 !important;
      border-end-start-radius: 0 !important;
      border-end-end-radius: 0 !important;
      overflow: visible !important; /* Allow box-shadows to be visible */
    }

    table {
      border-spacing: 0 16px !important; /* Increased spacing for better pop-up effect */
      border-collapse: separate !important;
      background: transparent !important;
      width: 100% !important;
      table-layout: fixed !important; /* Fixed layout for better column alignment */
    }

    /* Remove unwanted borders */
    .ant-table-cell::before {
      display: none !important;
    }

    /* Adjust header styling for perfect alignment with rows */
    .ant-table-thead {
      border: none !important;
      margin-bottom: 8px !important;
    }
    
    .ant-table-thead > tr {
      background: #EBEDF0 !important; /* Enhanced gray background for header */
      border-radius: 16px !important;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
    }
    
    .ant-table-thead > tr > th {
      background: transparent !important;
      border-bottom: none !important;
      color: #6B7280 !important;
      font-weight: 600 !important;
      padding: 16px 20px !important;
      text-align: left !important;
      &::before {
        display: none !important; /* Remove header column dividers */
      }
    }
    
    /* Rounded corners for header row */
    .ant-table-thead > tr > th:first-child {
      border-top-left-radius: 16px !important;
      border-bottom-left-radius: 16px !important;
      padding-left: 24px !important;
    }
    
    .ant-table-thead > tr > th:last-child {
      border-top-right-radius: 16px !important;
      border-bottom-right-radius: 16px !important;
      padding-right: 24px !important;
      text-align: right !important;
    }
    
    /* Exactly match header and cell padding for alignment */
    .ant-table-tbody > tr > td:first-child {
      padding-left: 24px !important;
    }
    
    .ant-table-tbody > tr > td:last-child {
      padding-right: 24px !important;
      text-align: right !important; /* Align action buttons to the right */
    }
    
    /* Remove unwanted borders and shadows */
    .ant-table-wrapper .ant-table-container {
      border: none !important;
      box-shadow: none !important;
    }

    /* Table body styling */
    .ant-table-tbody {
      background: transparent !important;
    }

    /* Create perfectly rounded rows with consistent spacing */
    .ant-table-tbody > tr {
      background: white !important;
      border: 1px solid #E5E7EB !important;
      border-radius: 16px !important;
      margin-bottom: 0 !important; /* Spacing handled by table border-spacing */
      transition: all 0.3s ease !important; 
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02) !important;
      position: relative !important; /* For the shadow effect */
    }

    /* Remove default cell borders */
    .ant-table-tbody > tr > td {
      border-bottom: none !important;
      padding: 16px 20px !important;
      background: transparent !important;
      transition: color 0.3s ease !important;
    }

    /* Perfect rounded corners for row cells */
    .ant-table-tbody > tr > td:first-child {
      border-top-left-radius: 16px !important;
      border-bottom-left-radius: 16px !important;
    }

    .ant-table-tbody > tr > td:last-child {
      border-top-right-radius: 16px !important;
      border-bottom-right-radius: 16px !important;
    }

    /* Ensure all column dividers are removed */
    .ant-table-container table > tbody > tr > td,
    .ant-table-container table > thead > tr > th {
      border-inline-end: none !important; /* Modern property for border-right in RTL support */
    }
    
    /* Override any potential borders from ant-design */
    .ant-table-cell-fix-right, 
    .ant-table-cell-fix-left {
      background: transparent !important;
      border-right: none !important;
      border-left: none !important;
    }
    
    /* Remove any cell borders that Ant Design might inject */
    .ant-table-cell {
      border: none !important;
    }
    
    /* Disable the column separator resize handle */
    .ant-table-column-separator {
      display: none !important;
    }

    /* Custom hover styling */
    .ant-table-tbody > tr.row-hovered {
      background-color: ${primaryColor} !important; /////////////////////////////////////////////////////////////
      color: white !important;
      border-color: #2563EB !important;
      z-index: 10 !important;
      transform: translateY(0px) scale(1.03) !important;
      box-shadow: 0 15px 25px rgba(37, 99, 235, 0.2) !important;
    }

    .ant-table-tbody > tr.row-hovered td {
      color: white !important;
    }
    
    /* Fix for avatar borders on hover */
    .ant-table-tbody > tr.row-hovered .ant-avatar {
      border: 1px solid rgba(255, 255, 255, 0.8) !important;
    }

    /* Fix for text colors on hover */
    .ant-table-tbody > tr.row-hovered .text-muted {
      color: rgba(255, 255, 255, 0.85) !important;
    }

    .ant-table-tbody > tr.row-hovered .action-button {
      color: white !important;
    }
    
    .ant-table-tbody > tr.row-hovered .action-button:hover {
      background-color: rgba(255, 255, 255, 0.15) !important;
    }

    /* Override the default hover styles */
    .ant-table-tbody > tr.ant-table-row:hover > td {
      background: transparent !important;
    }
    
    .status-badge .ant-badge-status-text {
      background: rgba(0, 0, 0, 0.05) !important;
      padding: 4px 12px !important;
      border-radius: 50px !important; /* Fully rounded */
      font-size: 12px !important;
      font-weight: 500 !important;
      line-height: 1.2 !important;
    }

    /* Adjust status badge colors */
    .status-badge[color="#EF4444"] .ant-badge-status-text {
      color: #EF4444 !important;
      background: rgba(239, 68, 68, 0.1) !important;
    }
    
    .status-badge[color="#3B82F6"] .ant-badge-status-text {
      color: #3B82F6 !important;
      background: rgba(59, 130, 246, 0.1) !important;
    }
    
    .status-badge[color="#10B981"] .ant-badge-status-text {
      color: #10B981 !important;
      background: rgba(16, 185, 129, 0.1) !important;
    }

    /* Enhanced status badge hover style */
    .ant-table-tbody > tr.row-hovered .status-badge .ant-badge-status-text {
      background: white !important;
      color: #2563EB !important;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
    }

    /* Hide horizontal scrollbar */
    .ant-table-body {
      overflow-x: hidden !important;
      overflow-y: hidden !important;
      scrollbar-width: none !important; /* Firefox */
      -ms-overflow-style: none !important; /* IE and Edge */
      &::-webkit-scrollbar {
        display: none !important; /* Chrome, Safari, Opera */
      }
    }

    /* Perfectly styled status badges */
    .status-badge .ant-badge-status-dot {
      display: none !important; /* Remove the dot */
    }
    
    /* Consistent pagination styling */
    .ant-pagination {
      margin: 20px 0 0 0 !important;
    }
    
    /* Improve action buttons appearance */
    .action-button {
      border-radius: 50% !important;
      width: 28px !important;
      height: 28px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.2s !important;
    }
    
    .action-button:hover {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
  }
    
    /* Remove unnecessary borders and shadows */
    .ant-table-wrapper .ant-table-container {
      border: none !important;
      box-shadow: none !important;
    }

    /* Table body styling */
    .ant-table-tbody {
      background: transparent !important;
    }

    /* Create perfectly rounded rows with consistent spacing */
    .ant-table-tbody > tr {
      background: white !important;
      border: 1px solid #E5E7EB !important;
      border-radius: 16px !important;
      margin-bottom: 0 !important; /* Spacing handled by table border-spacing */
      transition: all 0.3s ease !important;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02) !important;
    }

    /* Remove default cell borders */
    .ant-table-tbody > tr > td {
      border-bottom: none !important;
      padding: 16px 20px !important;
      background: transparent !important;
      transition: color 0.3s ease !important;
    }

    /* Perfect rounded corners for row cells */
    .ant-table-tbody > tr > td:first-child {
      border-top-left-radius: 16px !important;
      border-bottom-left-radius: 16px !important;
    }

    .ant-table-tbody > tr > td:last-child {
      border-top-right-radius: 16px !important;
      border-bottom-right-radius: 16px !important;
    }

    /* Override the default hover styles */
    .ant-table-tbody > tr.ant-table-row:hover > td {
      background: transparent !important;
    }

    /* Custom hover styling with perfect treatment */
    .ant-table-tbody > tr.row-hovered {
      background-color: #2563EB !important;
      color: white !important;
      border-color: #2563EB !important;
      z-index: 10 !important;
      box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25) !important;
    }

    .ant-table-tbody > tr.row-hovered td {
      color: white !important;
    }
    
    /* Fix for avatar borders on hover */
    .ant-table-tbody > tr.row-hovered .ant-avatar {
      border: 1px solid rgba(255, 255, 255, 0.8) !important;
    }

    /* Fix for text colors on hover */
    .ant-table-tbody > tr.row-hovered .text-muted {
      color: rgba(255, 255, 255, 0.85) !important;
    }

    .ant-table-tbody > tr.row-hovered .action-button {
      color: white !important;
    }
    
    .ant-table-tbody > tr.row-hovered .action-button:hover {
      background-color: rgba(255, 255, 255, 0.15) !important;
    }

    /* Perfectly styled status badges */
    .status-badge .ant-badge-status-dot {
      display: none !important; /* Remove the dot */
    }
    
    .status-badge .ant-badge-status-text {
      background: rgba(0, 0, 0, 0.05) !important;
      padding: 4px 12px !important;
      border-radius: 50px !important; /* Fully rounded */
      font-size: 12px !important;
      font-weight: 500 !important;
      line-height: 1.2 !important;
    }

    /* Adjust status badge colors */
    .status-badge[color="#EF4444"] .ant-badge-status-text {
      color: #EF4444 !important;
      background: rgba(239, 68, 68, 0.1) !important;
    }
    
    .status-badge[color="#3B82F6"] .ant-badge-status-text {
      color: #3B82F6 !important;
      background: rgba(59, 130, 246, 0.1) !important;
    }
    
    .status-badge[color="#10B981"] .ant-badge-status-text {
      color: #10B981 !important;
      background: rgba(16, 185, 129, 0.1) !important;
    }

    /* Enhanced status badge hover style */
    .ant-table-tbody > tr.row-hovered .status-badge .ant-badge-status-text {
      background: white !important;
      color: #2563EB !important;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
    }

    /* Consistent pagination styling */
    .ant-pagination {
      margin: 20px 0 0 0 !important;
    }
    
    /* Improve action buttons appearance */
    .action-button {
      border-radius: 50% !important;
      width: 28px !important;
      height: 28px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.2s !important;
    }
    
    .action-button:hover {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
  }

  /* Super enhanced animation for row hover */
  @keyframes popUp {
    0% { transform: translateY(0) scale(1); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02); }
    30% { transform: translateY(-20px) scale(1.03); }
    60% { transform: translateY(-15px) scale(1.03); }
    100% { transform: translateY(-12px) scale(1.03); box-shadow: 0 20px 25px rgba(37, 99, 235, 0.3); }
  }

  .row-pop-animation {
    animation: popUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
    will-change: transform, box-shadow !important; /* Performance optimization */
    position: relative !important;
    z-index: 100 !important; /* Ensure hovered row appears above others */
  }

  /* Font style helpers */
  .font-medium {
    font-weight: 500 !important;
  }

  .text-muted {
    color: #6B7280 !important;
  }
`;

export default GlobalStyles;