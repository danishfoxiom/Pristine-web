export const API = {
  // BASEURL: "http://localhost:8004/",
  BASEURL: "https://lms-server.bairuhatech.com/",
  // FILE_UPLOAD:"https://file-upload-server.bairuhatech.com/upload",
  LOGIN: "auth/login",

  // institutions mangements
  INSTITUTION: "institutions/all",
  INSTITUTION_STATS: "institutions",
  ACADEMICYEAR: "academic-years",
  INSTITUTIONS: "institutions",
  USERS: "users",
  GRADES: "grades",
  DIVISIONS: "divisions",
  GET_DIVISIONS: "divisions/all",
  STRUCTURE_CLONE: "structure-clone",
  GET_STUDENTS: "students",
  COURSES: "programs",
  ALL_COURSES: "programs/all",
  PROGRAMS: "programs",
  // PERMISSIONS
  PERMISSIONS: "permissions",

  // suppliers
  SUPPLIERS: "suppliers",
  SUPPLIER_BY_ID: (id: string) => `suppliers/${id}`,

  // fees
  CATEGORIES: "fees-categories",
  FEE_STRUCTURE: "fee-structure",
  FEE_STRUCTURE_ITEMS: "fee-structure-items",
  DISCOUNT: "fee-discounts",
  STUDENT_INVOICES: "student-fee-invoices",
  GET_DISCOUNT: "student-fee-invoices/student/{studentId}/discounts",
  FINANCIAL_YEAR: "financial-year", // Added for fetching current financial year
  NEXT_INVOICE_NUMBER: "student-fee-invoices/next-voucher-number", // Added for fetching next invoice number
  // USER ROLES
  CREATE_ROLE: "/roles/with-permissions",
  ROLE: "roles",
  DELETE_ROLE: "roles",
  UPDATE_ROLE: "roles/with-permissions",

  // DOCUMENT UPLOAD
  USER_DOCUMENTS: "/user-documents",
  USER_DOCUMENT_BY_ID: (id: string) => `/user-documents/${id}`,

  // EMPLOYEES
  CREATE_EMPLOYEES: "employees/with-user",
  DELETE_EMPLOYEES: "employees",
  UPDATE_EMPLOYEES: "employees",
  GET_EMPLOYEES: "employees",
  EMPLOYEE_ATTENDANCE: "employee-attendance",
  EMPLOYEE_SALARY_SETTINGS: "employee-salary-settings",
  EMPLOYEE_LEAVES: "/employee-leaves",

  // subjects and curriculum
  DIVISION_SUBJECT_MAPPER: "grade-subjects",

  // ACADEMIC STRUCTURE
  DEPARTMENTS: "departments",
  TIMETABLE_SLOTS: "timetable-slots",

  // Grades endpoints
  GRADE_BY_ID: (id: string) => `grades/${id}`,
  INSTITUTION_DEPARTMENTS: (institutionId: string) =>
    `institutions/${institutionId}/departments`,
  ACADEMIC_YEARS: "academic-years",
  CREATE_GRADE: "grades",
  GET_INSTITUTIONS: "institutions",
  GET_ACADEMIC_YEARS: "academic-years",
  GET_GRADES: "grades",
  GET_ALL_GRADES: "grades/all",
  ADMISSIONS: "admissions",
  ADMISSION_BY_ID: (id: string) => `/admissions/${id}`,

  STUDENTS: "students", //  for create and get all
  STUDENT_BY_ID: (id: string) => `/students/${id}`, // for update and delete
  PARENTS: "parents",
  GET_ALL_DIVISIONS: "/divisions/all",

  SUBJECTS: "subjects", // for create and get all
  SUBJECT_BY_ID: (id: string) => `/subjects/${id}`, // for update and delete

  // USERS
  GET_USERS: "users",

  // Departments
  GET_DEPARTMENTS: "departments",

  // library books
  LIBRARY_BOOKS: "library-books", // for post
  LIBRARY_BOOK_BY_ID: (id: string) => `library-books/${id}`, // for put get by id and delete
  LIBRARY_CATEGORIES: "library-books/all", // for get all

  // library members
  LIBRARY_MEMBERS: "library-members", // for post and get all
  LIBRARY_MEMBER_BY_ID: (id: string) => `library-members/${id}`, // for put get by id and delete

  // library book issues
  BOOK_ISSUES: "book-issues", // for post and get all
  BOOK_ISSUE_BY_ID: (id: string) => `book-issues/${id}`, // for put get by id and delete

  // Roles
  GET_ROLES: "roles",

  // hostel
  HOSTEL: "hostels",
  HOSTEL_BLOCKS: "hostel-blocks",
  ROOMS: "hostel-rooms",
  ROOM_REGISTRY: "hostel-assignments",
  HOSTEL_BLOCK_BY_ID: (id: string) => `hostel-blocks/${id}`, // for put get by id and delete
  HOSTEL_ROOMS: "hostel-rooms", // for post and get all
  HOSTEL_ROOM_BY_ID: (id: string) => `hostel-rooms/${id}`, // for put get by id and delete
  HOSTEL_ASSIGNMENT: "hostel-assignments", // for post and get all
  HOSTEL_ASSIGNMENT_BY_ID: (id: string) => `hostel-assignments/${id}`, // for put get by id and delete

  // timetable-template
  TIMETABLE_TEMPLATE: "/time-table-templates",
  TIMETABLE_TEMPLATE_WITHOUT_SLOTS: "/time-table-templates/without-slots",
  CLASS_TEMPLATE_ASSIGNMENTS: "class-timetables",
  TIMETABLE_TEMPLATE_WITH_SLOTS: "class-timetables/division",
  DELETE_TEACHER_ASSIGNMENTS: "class-timetables",
  // ==========================================
  // NEW: Timetable Assignments endpoints
  // ==========================================

  // Main CRUD operations for timetable assignments
  TIMETABLE_ASSIGNMENTS: "class-timetables", // GET (with filters), POST
  TIMETABLE_ASSIGNMENT_BY_ID: (id: string) => `timetable-assignments/${id}`, // GET, PUT, DELETE

  // Bulk operations
  TIMETABLE_ASSIGNMENTS_BULK: "timetable-assignments/bulk", // POST - Create multiple assignments
  TIMETABLE_ASSIGNMENTS_BULK_UPDATE: "timetable-assignments/bulk-update", // PUT - Update multiple assignments
  TIMETABLE_ASSIGNMENTS_BULK_DELETE: "timetable-assignments/bulk-delete", // DELETE - Delete multiple
  TIMETABLE_TEACHER_AND_SUBJECT_ASSIGNMENTS: "class-timetable-entries/bulk",
  TIMETABLE_CLASS_ENTRIES_BULK: "class-timetable-entries/bulk",

  // Query assignments by relationships
  TIMETABLE_ASSIGNMENTS_BY_TIMETABLE: (timetableId: string) =>
    `timetable-assignments/timetable/${timetableId}`, // GET assignments for a specific timetable
  TIMETABLE_ASSIGNMENTS_BY_TEACHER: (teacherId: string) =>
    `timetable-assignments/teacher/${teacherId}`, // GET assignments for a specific teacher
  TIMETABLE_ASSIGNMENTS_BY_DIVISION: (divisionId: string) =>
    `timetable-assignments/division/${divisionId}`, // GET assignments for a specific division
  TIMETABLE_ASSIGNMENTS_BY_SUBJECT: (subjectId: string) =>
    `timetable-assignments/subject/${subjectId}`, // GET assignments for a specific subject
  TIMETABLE_ASSIGNMENTS_BY_INSTITUTION: (institutionId: string) =>
    `timetable-assignments/institution/${institutionId}`, // GET assignments for a specific institution
  TIMETABLE_ASSIGNMENTS_BY_ACADEMIC_YEAR: (academicYearId: string) =>
    `timetable-assignments/academic-year/${academicYearId}`, // GET assignments for a specific academic year
  TIMETABLE_ASSIGNMENTS_BY_GRADE: (gradeId: string) =>
    `timetable-assignments/grade/${gradeId}`, // GET assignments for a specific grade

  // Assignment status operations
  TIMETABLE_ASSIGNMENT_ACTIVATE: (id: string) =>
    `timetable-assignments/${id}/activate`, // PUT - Activate assignment
  TIMETABLE_ASSIGNMENT_DEACTIVATE: (id: string) =>
    `timetable-assignments/${id}/deactivate`, // PUT - Deactivate assignment
  TIMETABLE_ASSIGNMENTS_BULK_STATUS: "timetable-assignments/bulk-status", // PUT - Update status of multiple assignments

  // Validation and conflict checking
  TIMETABLE_ASSIGNMENTS_VALIDATE: "timetable-assignments/validate", // POST - Validate assignment before creation
  TIMETABLE_ASSIGNMENTS_CONFLICTS: "timetable-assignments/conflicts", // GET - Check for conflicts
  TIMETABLE_ASSIGNMENTS_DUPLICATE_CHECK:
    "timetable-assignments/duplicate-check", // POST - Check for duplicates

  // Statistics and reporting
  TIMETABLE_ASSIGNMENTS_STATS: "timetable-assignments/statistics", // GET - Get assignment statistics
  TIMETABLE_ASSIGNMENTS_SUMMARY: "timetable-assignments/summary", // GET - Get summary by filters
  TIMETABLE_ASSIGNMENTS_REPORT: "timetable-assignments/report", // GET - Generate detailed reports

  // Export and import
  TIMETABLE_ASSIGNMENTS_EXPORT: "timetable-assignments/export", // GET - Export assignments (CSV, Excel)
  TIMETABLE_ASSIGNMENTS_IMPORT: "timetable-assignments/import", // POST - Import assignments from file
  TIMETABLE_ASSIGNMENTS_TEMPLATE: "timetable-assignments/import-template", // GET - Download import template
  TIMETABLE_CLASS_ENTRIES_WITH_SLOTS: "",

  // ==========================================
  // Grade Subjects endpoints (for dropdown data and relationships)
  // ==========================================

  GRADE_SUBJECTS: "grade-subjects", // GET (with filters), POST
  ALL_GRADE_SUBJECTS: "grade-subjects/all", // GET (with filters), POST
  GRADE_SUBJECT_BY_ID: (id: string) => `grade-subjects/${id}`, // GET, PUT, DELETE
  GRADE_SUBJECTS_BY_DIVISION: (divisionId: string) =>
    `grade-subjects/division/${divisionId}`, // GET grade subjects for a specific division
  GRADE_SUBJECTS_BY_TEACHER: (teacherId: string) =>
    `grade-subjects/teacher/${teacherId}`, // GET grade subjects for a specific teacher
  GRADE_SUBJECTS_BY_SUBJECT: (subjectId: string) =>
    `grade-subjects/subject/${subjectId}`, // GET grade subjects for a specific subject
  GRADE_SUBJECTS_BY_GRADE: (gradeId: string) =>
    `grade-subjects/grade/${gradeId}`, // GET grade subjects for a specific grade
  GRADE_SUBJECTS_BY_INSTITUTION: (institutionId: string) =>
    `grade-subjects/institution/${institutionId}`, // GET grade subjects for a specific institution
  GRADE_SUBJECTS_BY_ACADEMIC_YEAR: (academicYearId: string) =>
    `grade-subjects/academic-year/${academicYearId}`, // GET grade subjects for a specific academic year

  // ==========================================
  // Legacy Class Schedules endpoints (for backward compatibility)
  // ==========================================

  CLASS_SCHEDULES: "class-schedules", // GET, POST
  CLASS_SCHEDULES_GENERATE: "class-schedules/generate", // POST - Generate schedules from assignments
  CLASS_SCHEDULES_CONFLICTS: "class-schedules/conflicts/detect", // GET - Detect scheduling conflicts
  CLASS_SCHEDULE_BY_ID: (id: string) => `class-schedules/${id}`, // GET, PUT, DELETE
  CLASS_SCHEDULE_STATUS: (id: string) => `class-schedules/${id}/status`, // PUT - Update schedule status

  // Weekly schedule views
  DIVISION_WEEKLY_SCHEDULE: (divisionId: string) =>
    `class-schedules/division/${divisionId}/weekly`, // GET weekly schedule for division
  TEACHER_WEEKLY_SCHEDULE: (teacherId: string) =>
    `class-schedules/teacher/${teacherId}/weekly`, // GET weekly schedule for teacher
  INSTITUTION_WEEKLY_SCHEDULE: (institutionId: string) =>
    `class-schedules/institution/${institutionId}/weekly`, // GET weekly schedule for institution

  // Schedule generation and management
  CLASS_SCHEDULES_BULK_GENERATE: "class-schedules/bulk-generate", // POST - Generate multiple schedules
  CLASS_SCHEDULES_AUTO_ASSIGN: "class-schedules/auto-assign", // POST - Auto-assign schedules based on constraints
  CLASS_SCHEDULES_OPTIMIZE: "class-schedules/optimize", // POST - Optimize existing schedules

  // subjects
  CHAPTERS: "chapters",
  MATERIALS: "materials",
  LIBRARY_CONFIGURATION: "library-settings",
  // CHAPTERS: "chapters",
  // TOPICS: "topics",

  // transport
  VEHICLE_REGISTRY: "transport-vehicles",
  VEHICLE_ROUTES: "transport-routes",
  TRANSPORT_ASSIGNMENTS: "transport-assignments",
  DRIVER_PROFILES: "transport-drivers",

  // attendence
  ATTENDENCE_CATEGORY: "attendance-types",
  // EMPLOYEES:"employees",

  // EXAM
  EXAM_TYPES: "exam-types",
  GRADES_TYPE: "grading-schemes",
  EXAMS: "exams",
  SUBJECT_MAPPINGS: "exam-subjects",
  EXAM_CLASS_MAPPINGS: "exam-classes",
  MARKS_ENTRY: "student-marks",
  RESULT_PUBLISHING: "report-cards",
  RESULTS_EXAM: "student-results",
  REPORT_CARD_STATUS: "report-cards/status",
  REPORT_CARD_GENERATION: "report-cards/generate",

  // accounts
  ACCOUNT_CATEGORY: "account-categories",
  PARENT_CATEGORIES: "account-categories/main/list",
  LEDGERS: "ledgers",
  tRANSACTION: "transactions",
  HSN_MASTER: "hsn-master",
  FINANCIAL_YEARS: "financial-year",
  // image picker //
  IMAGE_COMPRESS: "img_compress/compress",
  FILE_UPLOAD: "img_compress/file",
  CHART_OF_ACCOUNTS: "chart-of-accounts",
  CASH_FLOW_GROUPS: "cash-flow-groups",

  // products
  PRODUCTS_CATEGORY: "products-category",
  PRODUCTS: "products",
  VARIANTS: "variants",
  PURCHASE_TYPES: "purchase-types",
  PURCHASES: "grn",
  PURCHASES__ORDER: "purchases",
  PURCHASE_RETURN: "purchase-return",
  PRODUCTS_VARIANTS: "productvariant/add_variants",

  // GRN specific endpoints
  GRN_NEXT_NUMBER: "grn/next-number",
  GRN_PURCHASE_ITEMS: (purchaseOrderId: string) =>
    `grn/purchase-items/${purchaseOrderId}`,
  GRN_AVAILABLE_PRODUCTS: "grn/products/available",
  // Grade Schema rules
  GRADE_SCHEMA_RULES: "grading-scheme-rules",

  // attendence
  STUDENT_ATTENDENCE: "student-attendance",

  // teachers
  HOME_WORKS: "homework",
  GET_HOMEWORKS_ASSIGN_STUDENTS_DEATAILS: "/homework/assign",

  GET_CAMPUS_BY_INSTITUTION: "/campus/institution",
  CAMPUS_ACTIVE: "/campus/active",
  CAMPUS_INACTIVE: "/campus/inactive",

  LEAVE_TYPES: "/leave-types",
};

export interface ApplicableEntity {
  entity_type:
    | "grade"
    | "division"
    | "student"
    | "program"
    | "department"
    | "institution";
  entity_id: string;
  entity_name: string;
}
