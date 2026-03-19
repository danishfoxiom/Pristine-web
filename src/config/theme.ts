
const theme = {
  token: {
    // Color palette
    colorPrimary: '#102257', // Primary blue color for hover states
    // colorPrimary: '#fb1f8b', // Primary pink color for hover states
    colorError: '#EF4444',   // Error/pending status color
    colorSuccess: '#10B981', // Success/completed status color
    colorInfo: '#3B82F6',    // Info/shipped status color
    colorWarning: '#F59E0B', // Warning color
    colorTextBase: '#1F2937', // Base text color
    colorTextSecondary: '#6B7280', // Secondary text color
    colorBgContainer: '#FFFFFF', // Background color for containers
    colorBorder: '#E5E7EB',  // Border color
    colorBgLayout: '#F5F5F5', // Layout background color
    
    // Size and spacing
    borderRadius: 12, // Default border radius for components
    borderRadiusLG: 16, // Larger border radius
    borderRadiusSM: 8,  // Smaller border radius
    
    // Shadow
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    boxShadowSecondary: '0 6px 16px rgba(0, 0, 0, 0.12)',

    // Font settings
    fontFamily: '"IsidoraSans-Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontWeightStrong: 600,
    
    // Component specific
    tablePaddingVertical: 16,
    tablePaddingHorizontal: 16,
    tableHeaderBg: 'transparent',
    tableHeaderColor: '#6B7280',
    tableRowHoverBg: '#2563EB',
  },
  components: {
    Table: {
      // Table component specific tokens
      colorBgContainer: 'transparent',
      headerBg: 'transparent',
      headerSplitColor: 'transparent',
      headerBorderRadius: 0,
      rowHoverBg: 'transparent', // We'll handle hover styles in our custom CSS
      rowSelectedBg: 'rgba(37, 99, 235, 0.1)',
      rowSelectedHoverBg: 'rgba(37, 99, 235, 0.2)',
      // Override styling via classNames
      // Note: this is a way to inject critical styles for our table design
      className: 'styled-order-table',
    },
    Card: {
      // Card component specific tokens
      colorBgContainer: '#FFFFFF',
      borderRadiusLG: 12,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    Button: {
      // Button component specific tokens
      colorBorder: 'transparent',
      colorBgContainer: 'transparent',
      colorText: '#6B7280',
    },
    Badge: {
      // Badge component specific tokens
      colorBgContainer: 'rgba(0, 0, 0, 0.05)',
      colorText: '#1F2937',
      borderRadius: 12,
    },
  },
};

export default theme;