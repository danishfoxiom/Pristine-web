// import { SidebarItem } from "../../types";

// export const sidebarData: SidebarItem[] = [
//   {
//     id: "dashboard",
//     title: "Dashboard",
//     icon: "layout-dashboard",
//     path: "/",
//   },
//   {
//     id: "institution Management",
//     title: "Institution Management",
//     icon: "graduation-cap",
//     subItems: [
//       {
//         id: "manage-institution",
//         title: "Manage Institution",
//         path: "/users/manage-institution",
//       },
//       {
//         id: "academic year setup",
//         title: "Academic Year Setup",
//         path: "/users/academic-year-setup",
//       },
//       {
//         id: "campus-managment",
//         title: "Campus Management",
//         path: "/users/campus-management",
//       },
//        {
//         id: "super-admin-assignment",
//         title: "Super AdminAssignment",
//         path: "/users/super-admin-assignment",
//       },
//     ],
//   },
//   {
//     id: "Academic Structure",
//     title: "Academic Structure",
//     icon: "GraduationCap",
//     subItems: [
//       {
//         id: "Academic Years",
//         title: "Academic Years",
//         path: "/users/academic-structure/academic-years",
//       },
//       {
//         id: "Departments",
//         title: "Departments",
//         path: "/users/academic-structure/departments",
//       },
//       {
//         id: "Grades",
//         title: "Grades",
//         path: "/users/academic-structure/grades",
//       },
//        {
//         id: "Divisions",
//         title: "Divisions",
//         path: "/users/academic-structure/divisions",
//       },
//       {
//         id: "Structure Cloning",
//         title: "Structure Cloning",
//         path: "/users/academic-structure/structure-cloning",
//       },
//     ],
//   },
//   {
//     id: "user-management",
//     title: "User Management",
//     icon: "users",
//     subItems: [
//       { id: "roles", title: "Role-based Access", path: "/users/roles" },
//       {
//         id: "departments",
//         title: "Department & Class Allocation",
//         path: "/users/departments",
//       },
//       { id: "id-cards", title: "ID Card Generation", path: "/users/id-cards" },
//       {
//         id: "import-export",
//         title: "Bulk Import/Export",
//         path: "/users/import-export",
//       },
//       // my adds
//       { id: "profiles", title: "User Profiles", path: "/users/profiles" },
//       { id: "logs", title: "Activity Logs", path: "/users/logs" },
//       { id: "archived", title: "Archived Users", path: "/users/archived" },
//     ],
//   },
//   {
//     id: "Student Management",
//     title: "Student Management",
//     icon: "BookOpen",
//     subItems: [
//       {
//         id: "studentDirectory",
//         title: "Student Directory",
//         path: "/users/student-management/student-directory",
//       },
//       {
//         id: "admission",
//         title: "Admission",
//         path: "/users/student-management/admission",
//       },
//       {
//         id: "documentManagement",
//         title: "Document Management",
//         path: "/users/student-management/document-management",
//       },
//       {
//         id: "admissionCards",
//         title: "Admission Cards",
//         path: "/users/student-management/admission-cards",
//       },
//     ],
//   },
//   {
//     id: "employee-management",
//     title: "EmployeeManagement",
//     icon: "users",
//     subItems: [
//       {
//         id: "employee-directory",
//         title: "Employee Directory",
//         path: "employee-mangement/manage-employee-directory",
//       },
//       {
//         id: "department-designationMapper",
//         title: "Department&Designation",
//         path: "employee-mangement/manage-department-designation-mapper",
//       },
//       {
//         id: "employmentStatus-tracker",
//         title: "EmploymentStatus Tracker",
//         path: "employee-mangement/manage-employment-status",
//       },
//       {
//         id: "payroll Readiness",
//         title: "Payroll Readiness",
//         path: "employee-mangement/manage-payroll-readiness",
//       },
//     ],
//   },
//   {
//     id: "employee-management",
//     title: "EmployeeManagement",
//     icon: "users",
//     subItems: [
//       {
//         id: "employee-directory",
//         title: "Employee Directory",
//         path: "employee-mangement/manage-employee-directory",
//       },
//       {
//         id: "department-designationMapper",
//         title: "Department&Designation",
//         path: "employee-mangement/manage-department-designation-mapper",
//       },
//       {
//         id: "employmentStatus-tracker",
//         title: "EmploymentStatus Tracker",
//         path: "employee-mangement/manage-employment-status",
//       },
//       {
//         id: "payroll Readiness",
//         title: "Payroll Readiness",
//         path: "employee-mangement/manage-payroll-readiness",
//       },
//     ],
//   },
//   {
//     id: "subjectCurriculum",
//     title: "Subject & Curriculum",
//     icon: "BookOpen",
//     subItems: [
//       {
//         id: "subjectCatalog",
//         title: "Subject Catalog",
//         path: "/users/subject-curriculum/subject-catalog",
//       },
//       {
//         id: "divisionSubjectMapper",
//         title: "Division Subject Mapper",
//         path: "/users/subject-curriculum/division-subject-mapper",
//       },
//       {
//         id: "teacherAssignment",
//         title: "Teacher Assignment",
//         path: "/users/subject-curriculum/teacher-assignment",
//       },
//       {
//         id: "Materials & Syllabus Upload",
//         title: "Materials & Syllabus Upload",
//         path: "/users/subject-curriculum/materials-syllabus-upload",
//       },
//     ],
//   },
//   {
//     id: "Class-Scheduling",
//     title: "Class&Scheduling",
//     icon: "book-open",
//     badge: "New",
//     subItems: [
//       {
//         id: "Timetable-Templates",
//         title: "Timetable Templates",
//         path: "class-scheduling/manage-timetable-templates",
//       },
//       {
//         id: "Timetable-Assignment",
//         title: "Timetable Assignment",
//         path: "class-scheduling/manage-timetable-assignments",
//       },
//       {
//         id: " Conflict-Detection-Alerts",
//         title: " Conflict Detection & Alerts",
//         path: "class-scheduling/manage-conflict-detection-alerts",
//       },
//       { id: "TeacherView", title: "TeacherView", path: "class-scheduling/teacher-view" },
//       { id: " Class-View", title: " Class View", path: "class-scheduling/class-view" },
//     ],
//   },
//   {
//     id: "Exams & Assessments",
//     title: "Exams & Assessments",
//     icon: "NotepadText",
//     subItems: [
//       {
//         id: "Exam Planner",
//         title: "Exam Planner",
//         path: "/users/exams-assessments/exam-planner",
//       },
//       {
//         id: "Subject-Invigilator Mapping",
//         title: "Subject-Invigilator Mapping",
//         path: "/users/exams-assessments/subject-invigilator-mapping",
//       },
//       {
//         id: "Marks Entry",
//         title: "Marks Entry",
//         path: "/users/exams-assessments/marks-entry",
//       },
//       {
//         id: "Report Card Generator",
//         title: "Report Card Generator",
//         path: "/users/exams-assessments/report-card-generator",
//       },
//       {
//         id: "Performance Analytics",
//         title: "Performance Analytics",
//         path: "/users/exams-assessments/performance-analytics",
//       },
//       {
//         id: "Result Publishing",
//         title: "Result Publishing",
//         path: "/users/exams-assessments/result-publishing",
//       },
//     ],
//   },
//   {
//     id: "attendanceManagement",
//     title: "Attendance Management",
//     icon: "book-open",
//     badge: "New",
//     subItems: [
//        {
//         "id": "Attendance_Categories",
//         "title": "Attendance Categories",
//         "path": "attendance-management/Attendance_Categories"
//       },
//       {
//         id: "Student-Attendance",
//         title: "Student Attendance",
//         path: "attendance-management/student-attendance",
//       },
//       {
//         id: " Employee-Attendance",
//         title: " Employee Attendance",
//         path: "attendance-management/employee-attendance",
//       },
//       {
//         id: " Attendance-Configuration",
//         title: " Attendance Configuration",
//         path: "attendance-management/attendance-configuration",
//       },
//     ],
//   },
//   {
//     id: "Fee Management",
//     title: "Fee Management",
//     icon: "NotepadText",
//     subItems: [
//       {
//         id: "Fee Categories",
//         title: "Fee Categories",
//         path: "/users/fee-management/fee-categories",
//       },
//       {
//         id: "Fee Structures",
//         title: "Fee Structures",
//         path: "/users/fee-management/fee-structures-per-grade",
//       },
//       {
//         id: "Invoices",
//         title: "Invoices",
//         path: "/users/fee-management/invoices",
//       },
//       {
//         id: "Payment Tracker",
//         title: "Payment Tracker",
//         path: "/users/fee-management/payment-tracker",
//       },
//       {
//         id: "Discounts & Waivers",
//         title: "Discounts & Waivers",
//         path: "/users/fee-management/discounts-and-waivers",
//       },
//       {
//         id: "Payment Gateway",
//         title: "Payment Gateway",
//         path: "/users/fee-management/gateway-setup",
//       },
//       {
//         id: "Fee Reports",
//         title: "Fee Reports",
//         path: "/users/fee-management/fee-reports",
//       },
//     ],
//   },
//   {
//     id: "Library",
//     title: "Library",
//     icon: "book-open",
//     badge: "New",
//     subItems: [
//       { id: "Book-Catalog", title: "Book Catalog", path: "library/book-catalog" },
//       { id: "Members-Roles", title: " Members&Roles", path: "library/members-roles" },
//       {
//         id: "Issue-ReturnManager",
//         title: " Issue & Return Manager",
//         path: "library/issue-return-manager",
//       },
//       {
//         id: " Alerts-Reports",
//         title: " Alerts & Reports",
//         path: "library/alerts-reports",
//       },
//       {
//         id: " Library-Configuration",
//         title: " Library Configuration",
//         path: "library/library-configuration",
//       },
//     ],
//   },
//   {
//     id: "Transport",
//     title: "Transport",
//     icon: "book-open",
//     badge: "New",
//     subItems: [
//       {
//         id: "vehicle-Registry",
//         title: "Vehicle Registry",
//         path: "transport/vehicle-registry",
//       },
//       {
//         id: " Route-Management",
//         title: " Route Management",
//         path: "transport/route-management",
//       },
//       {
//         id: " Driver-Profiles",
//         title: " Driver Profiles",
//         path: "transport/driver-profiles",
//       },
//       {
//         id: " Assign-Transport",
//         title: " Assign Transport",
//         path: "transport/assign-transport",
//       },
//       {
//         id: "  Transport-Reports",
//         title: "Transport Reports",
//         path: "transport/transport-reports",
//       },
//     ],
//   },
//   {
//     id: "Hostel",
//     title: "Hostel",
//     icon: "book-open",
//     // badge: "New",
//     subItems: [
//       {
//         id: " Hostel-Blocks",
//         title: " Hostel Blocks",
//         path: "/hostel/hostel-blocks",
//       },
//       {
//         id: "RoomRegistry",
//         title: "Room Registry",
//         path: "/hostel/room-registry",
//       },
//       {
//         id: "Student-RoomAssignment",
//         title: "Student Room Assignment",
//         path: "/hostel/student-room-assignment",
//       },
//       {
//         id: " Hostel-Reports",
//         title: " Hostel Reports",
//         path: "/hostel/hostel-reports",
//       },
//     ],
//   },
//   {
//     id: "ID&Certificate-Center",
//     title: "ID&Certificate Center",
//     icon: "book-open",
//     badge: "New",
//     subItems: [
//       {
//         id: "IDCard-Templates",
//         title: "ID Card Templates",
//         path: "id-certification-center/iDCard-templates",
//       },
//       {
//         id: "GenerateIDCards",
//         title: "Generate IDCards",
//         path: "id-certification-center/generate-id-cards",
//       },
//       {
//         id: "Certificate-Templates",
//         title: " Certificate Templates",
//         path: "id-certification-center/certificate-templates",
//       },
//       {
//         id: " GenerateCertificates",
//         title: " Generate Certificates",
//         path: "id-certification-center/generate-certificates",
//       },
//       {
//         id: "  Issuance History",
//         title: " Issuance History",
//         path: "id-certification-center/issuance-history",
//       },
//     ],
//   },
//   {
//     id: "Promotions-AcademicYearEnd",
//     title: "Promotions&Academic Year End",
//     icon: "book-open",
//     // badge: "New",
//     subItems: [
//       {
//         id: "Student-PromotionWizard",
//         title: "Student Promotion Wizard",
//         path: "promotion-academic-year/student-promotion-wizard",
//       },
//       {
//         id: "PromotionHistory",
//         title: "Promotion History",
//         path: "promotion-academic-year/promotion-history",
//       },
//       {
//         id: " Academic-History",
//         title: "Academic History",
//         path: "promotion-academic-year/academic-history",
//       },
//       {
//         id: " Academic-YearArchival",
//         title: " Academic YearArchival",
//         path: "promotion-academic-year/academic-year-archival",
//       },
//     ],
//   },
// ];
