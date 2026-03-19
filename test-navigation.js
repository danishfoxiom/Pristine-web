// Simple test to verify navigation filtering works
const { getFilteredNavigation } = require('./src/components/Sidebar/navigation.ts');

// Test with demo permissions
const demoPermissions = [
  "test", "dashboard", "mangeinstitution", "academicyears", "departments", "courses",
  "grades", "divisions", "allusers", "studentdirectory", "employeedirectory"
];

const result = getFilteredNavigation({ permissions: demoPermissions });

console.log('Navigation items count:', result.length);
console.log('First few items:', result.slice(0, 3).map(item => ({
  id: item.id,
  title: item.title,
  hasSubItems: !!item.subItems
})));
