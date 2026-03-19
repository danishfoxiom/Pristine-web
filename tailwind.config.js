// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         'primary-color': '#2A9D8F', // Main green used in buttons, progress bars, and backgrounds
//         'secondary-color': '#E9F5F4', // Light green for subtle backgrounds
//         'primary-dark': '#1A5C56', // Darker green for text or accents
//         'neutral-gray': '#F5F6FA', // Light gray background for the dashboard
//         'text-gray': '#6B7280', // Gray for secondary text
//         'white': '#FFFFFF', // White for cards and backgrounds
//         'red-accent': '#EF4444', // Red for the timer button
//         "background" : "#f3f4f6",
//       },
//       borderRadius: {
//         'sm': '8px', // Small radius for cards and buttons
//         'md': '12px', // Medium radius for larger elements like the main container
//       },
//       fontSize: {
//         'xs': '12px', // Small text (e.g., "Increased from last month")
//         'sm': '14px', // Secondary text (e.g., project descriptions)
//         'base': '16px', // Default text size (e.g., labels, body text)
//         'lg': '18px', // Larger text (e.g., "Dashboard" heading)
//         'xl': '24px', // For numbers in stats (e.g., "24", "10")
//         '2xl': '32px', // For percentages (e.g., "41%")
//       },
//       fontFamily: {
//         'sans': ['Inter', 'sans-serif'], // Modern sans-serif font similar to the one used
//       },
//       boxShadow: {
//         'card': '0 4px 6px rgba(0, 0, 0, 0.05)', // Subtle shadow for cards
//       },
//       spacing: {
//         'card': '20px', // Padding inside cards
//         'section': '30px', // Spacing between sections
//       },
//        backgroundImage: {
//         // Define gradient
//         'primary-gradient': 'linear-gradient(to right, #11998E, #38EF7D)',
//       },
//     },
//   },
//   plugins: [],
// };



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         'primary-color': '#fb1f8b',     // Light pink for primary elements
//         'secondary-color': '#fabad5',   // Light pink for hovers/containers
//         'primary-dark': '#fb1f8b',      // Deep pink for text/icons/active
//         'neutral-gray': '#F1F5F9',      // Light gray background
//         'text-gray': '#64748B',         // Muted slate text
//         'white': '#FFFFFF',             // White
//         'red-accent': '#EF4444',        // Alert color
//         'background': '#f5e3ed69',      // Light pink background
//       },
//       borderRadius: {
//         'sm': '8px',
//         'md': '12px',
//       },
//       fontSize: {
//         'xs': '12px',
//         'sm': '14px',
//         'base': '16px',
//         'lg': '18px',
//         'xl': '24px',
//         '2xl': '32px',
//       },
//       fontFamily: {
//         'sans': ['"IsidoraSans-Regular"', 'sans-serif'],
//         'light': ['"IsidoraSans-Light"', 'sans-serif'],
//         'regular': ['"IsidoraSans-Regular"', 'sans-serif'],
//         'medium': ['"IsidoraSans-Medium"', 'sans-serif'],
//         'semibold': ['"IsidoraSans-SemiBold"', 'sans-serif'],
//         'bold': ['"IsidoraSans-Bold"', 'sans-serif'],
//       },
//       boxShadow: {
//         'card': '0 4px 6px rgba(0, 0, 0, 0.04)',
//       },
//       spacing: {
//         'card': '20px',
//         'section': '30px',
//       },
//       lineHeight: {
//         'tight': '1.2',
//         'normal': '1.5',
//         'relaxed': '1.75',
//       },
//       fontWeight: {
//         'light': '300',
//         'normal': '400',
//         'medium': '500',
//         'semibold': '600',
//         'bold': '700',
//       },
//       letterSpacing: {
//         'tighter': '-0.05em',
//         'tight': '-0.025em',
//         'normal': '0',
//         'wide': '0.025em',
//         'wider': '0.05em',
//       },
//     },
//     // Define the text color theme
//     textColor: theme => ({
//       ...theme('colors'),
//       // Text color variants from your palette
//       'primary': '#fb1f8b',            // Same as your primary-color for primary text
//       'secondary': '#fabad5',          // Same as secondary-color for secondary text
//       'dark': '#fb1f8b',               // Same as primary-dark for emphasized text
//       'muted': '#64748B',              // Same as text-gray for muted/subtle text
//       'light': '#94A3B8',              // A lighter variant for less emphasis
//       'inverse': '#FFFFFF',            // White text for dark backgrounds
//       'error': '#EF4444',              // Same as red-accent for error messages
//     }),
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {  
      colors: {
        'primary-color': '#102257',  //rgb(16 34 87)  #3B82F6  // Vibrant blue for primary elements
        'secondary-color': '#DBEAFE',    // Light blue for hovers/containers
        'primary-dark': '#1E3A8A',       // Deep navy blue for text/icons/active
        'neutral-gray': '#F1F5F9',       // Light gray background
        'text-gray': '#64748B',          // Muted slate text
        'white': '#FFFFFF',              // White
        'red-accent': '#EF4444',         // Alert/error color
        'background': '#f5f5f5', 
        'form-bg':'#e0e0e2bd',        // Very light blue background
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        'card': '20px',
        'section': '30px',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #3B82F6, #60A5FA)', // Blue gradient
      },
    },
  },
  plugins: [],
};
