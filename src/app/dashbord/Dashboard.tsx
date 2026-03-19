import React, { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  Book,
  ClipboardCheck,
  ScrollText,
  UserPlus,
  CreditCard,
  Bell,
  BookOpen,
  Award,
  Search,
  LogOut,
  LucideIcon,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

// Types
interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  colored?: boolean;
  variant?: "primary" | "secondary" | "success" | "warning";
}

interface Admission {
  id: number;
  student: string;
  studentId: string;
  class: string;
  date: string;
  status: "Pending" | "Approved" | "In Review";
}

interface Event {
  title: string;
  date: string;
  type: "meeting" | "event" | "exam";
}

interface CourseProgress {
  title: string;
  progress: number;
}

interface Announcement {
  title: string;
  date: string;
  message: string;
}

// Static Data
const admissionsData: Admission[] = [
  {
    id: 1,
    student: "Student 1",
    studentId: "STU-2001",
    class: "Grade 10",
    date: "May 11, 2025",
    status: "Approved",
  },
  {
    id: 2,
    student: "Student 2",
    studentId: "STU-2002",
    class: "Grade 9",
    date: "May 12, 2025",
    status: "In Review",
  },
  {
    id: 3,
    student: "Student 3",
    studentId: "STU-2003",
    class: "Grade 11",
    date: "May 13, 2025",
    status: "Pending",
  },
  {
    id: 4,
    student: "Student 4",
    studentId: "STU-2004",
    class: "Grade 8",
    date: "May 14, 2025",
    status: "Approved",
  },
];

const eventsData: Event[] = [
  { title: "Teacher's Meeting", date: "Today, 11:30 AM", type: "meeting" },
  { title: "Science Exhibition", date: "Tomorrow, 9:00 AM", type: "event" },
  { title: "Parent-Meeting", date: "May 25, 2025", type: "exam" },
  { title: "Teachers Meeting", date: "May 28, 2025", type: "meeting" },
];

const courseProgressData: CourseProgress[] = [
  { title: "Mathematics 101", progress: 75 },
  { title: "Science Fundamentals", progress: 40 },
  { title: "Literature Studies", progress: 90 },
];

const announcementsData: Announcement[] = [
  {
    title: "Midterm Exam Schedule",
    date: "May 15, 2025",
    message: "The midterm exams will start next week. Check the schedule.",
  },
  {
    title: "New Course Available",
    date: "May 14, 2025",
    message: "A new course on Advanced Physics has been added.",
  },
];

// Enhanced StatCard Component with consistent colors
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  colored = false,
  variant = "primary",
}) => {
  // Define variant styles using your custom colors
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "primary":
        return {
          bg: colored
            ? "bg-gradient-to-br from-primary-color to-primary-dark text-white"
            : "bg-white text-primary-dark",
          iconBg: colored ? "bg-white/20" : "bg-secondary-color",
          iconColor: colored ? "text-white" : "text-primary-color",
        };
      case "secondary":
        return {
          bg: colored
            ? "bg-gradient-to-br from-primary-color to-primary-dark text-white"
            : "bg-white text-primary-dark",
          iconBg: colored ? "bg-white/20" : "bg-blue-100",
          iconColor: colored ? "text-white" : "text-blue-600",
        };
      case "success":
        return {
          bg: colored
            ? "bg-gradient-to-br from-primary-color to-primary-dark text-white"
            : "bg-white text-primary-dark",
          iconBg: colored ? "bg-white/20" : "bg-emerald-100",
          iconColor: colored ? "text-white" : "text-emerald-600",
        };
      case "warning":
        return {
          bg: colored
            ? "bg-gradient-to-br from-primary-color to-primary-dark text-white"
            : "bg-white text-primary-dark",
          iconBg: colored ? "bg-white/20" : "bg-amber-100",
          iconColor: colored ? "text-white" : "text-amber-600",
        };
      default:
        return {
          bg: colored
            ? "bg-gradient-to-br from-primary-color to-primary-dark text-white"
            : "bg-white text-primary-dark",
          iconBg: colored ? "bg-white/20" : "bg-secondary-color",
          iconColor: colored ? "text-white" : "text-primary-color",
        };
    }
  };

  const styles = getVariantStyles(variant);

  //     const { user } = useSelector((state: RootState) => state.user);
  // console.log("user>>>", user?.permissions);

  return (
    <div
      className={`relative overflow-hidden rounded-md shadow-card hover:shadow-xl transition-all duration-300 ${styles.bg}`}
    >
      {/* Background pattern for visual interest */}
      {colored && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5"></div>
        </div>
      )}

      <div className="relative p-card">
        <div className="flex justify-between items-start">
          <div>
            <h3
              className={`text-xs font-medium ${
                colored ? "text-white/80" : "text-text-gray"
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-2xl font-bold mt-2 ${
                colored ? "text-white" : "text-primary-dark"
              }`}
            >
              {value}
            </p>

            {trend && (
              <div className="flex items-center mt-3">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    trend.positive
                      ? colored
                        ? "bg-white/20 text-white"
                        : "bg-emerald-100 text-emerald-600"
                      : colored
                      ? "bg-white/20 text-white"
                      : "bg-red-100 text-red-accent"
                  }`}
                >
                  {trend.positive ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    colored
                      ? "text-white/90"
                      : trend.positive
                      ? "text-emerald-600"
                      : "text-red-accent"
                  }`}
                >
                  {trend.positive ? "+" : ""}
                  {trend.value}
                </span>
                <span
                  className={`text-xs ml-1 ${
                    colored ? "text-white/70" : "text-text-gray"
                  }`}
                >
                  from last month
                </span>
              </div>
            )}
          </div>

          <div
            className={`w-12 h-12 rounded-md flex items-center justify-center ${styles.iconBg}`}
          >
            <Icon size={20} className={styles.iconColor} />
          </div>
        </div>

        {/* Indicator bar for visual interest */}
        {trend && (
          <div className="mt-4 h-1 w-full bg-gray-200/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                trend.positive
                  ? colored
                    ? "bg-white/50"
                    : "bg-emerald-500"
                  : colored
                  ? "bg-white/30"
                  : "bg-red-accent"
              }`}
              style={{ width: `${Math.min(parseInt(trend.value) * 10, 100)}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

// SectionHeader Component
const SectionHeader: React.FC<{
  title: string;
  onViewAll?: () => void;
}> = ({ title, onViewAll }) => (
  <div className="bg-white rounded-t-md px-card py-4 border-b border-neutral-gray flex justify-between items-center">
    <h2 className="text-base font-semibold text-primary-dark">{title}</h2>
    {onViewAll && (
      <button
        onClick={onViewAll}
        className="text-xs text-primary-color hover:text-primary-dark font-medium transition-colors"
        aria-label={`View all ${title.toLowerCase()}`}
      >
        View All
      </button>
    )}
  </div>
);

// CourseProgressCard Component
const CourseProgressCard: React.FC<CourseProgress> = ({ title, progress }) => {
  // Choose a color based on progress using your custom colors
  let progressColor = "text-red-accent";
  let progressBgColor = "bg-red-accent";
  if (progress >= 75) {
    progressColor = "text-primary-color";
    progressBgColor = "bg-primary-color";
  } else if (progress >= 40) {
    progressColor = "text-primary-color";
    progressBgColor = "bg-primary-color";
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-card hover:shadow-lg transition-all duration-300 border border-neutral-gray">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-primary-dark">{title}</h4>
          <p className="text-xs text-text-gray mt-1">{progress}% Complete</p>
        </div>
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-neutral-gray"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={progressColor}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-dark">
            {progress}%
          </span>
        </div>
      </div>

      {/* Progress bar for visual reinforcement */}
      <div className="mt-2 h-1.5 w-full bg-neutral-gray rounded-full overflow-hidden">
        <div
          className={progressBgColor}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Main Component
const Dashboard: React.FC = () => {
  const [admissionPage, setAdmissionPage] = useState<number>(1);
  const [eventPage, setEventPage] = useState<number>(1);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const recordsPerPage = 4;

  // Toast notification
  const showToast = (message: string, type: "success" | "error"): void => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Pagination for Admissions
  const totalAdmissionPages = Math.ceil(admissionsData.length / recordsPerPage);
  const currentAdmissions = admissionsData.slice(
    (admissionPage - 1) * recordsPerPage,
    admissionPage * recordsPerPage
  );

  // Pagination for Events
  const totalEventPages = Math.ceil(eventsData.length / recordsPerPage);
  const currentEvents = eventsData.slice(
    (eventPage - 1) * recordsPerPage,
    eventPage * recordsPerPage
  );

  // Handle Quick Action
  const handleQuickAction = (action: string) => {
    showToast(`${action} triggered`, "success");
    console.log(`${action} clicked`);
  };

  // Chart data for fee collections
  const feeCollectionData = [
    { name: "Jan", amount: 40000 },
    { name: "Feb", amount: 30000 },
    { name: "Mar", amount: 20000 },
    { name: "Apr", amount: 27800 },
    { name: "May", amount: 18900 },
    { name: "Jun", amount: 23900 },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="p-card mx-auto">

        {toast && (
          <div
            className={`fixed top-16 right-4 px-4 py-3 rounded-md shadow-lg z-50 transition-all duration-300 transform ${
              toast.type === "success"
                ? "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700"
                : "bg-red-50 border-l-4 border-red-accent text-red-700"
            }`}
          >
            {toast.message}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-section">
          <StatCard
            title="Total Students"
            value="1,256"
            trend={{ value: "2.5%", positive: true }}
            icon={Users}
            colored={true}
            variant="primary"
          />
          <StatCard
            title="Total Teachers"
            value="86"
            icon={GraduationCap}
            colored={true}
            variant="secondary"
          />
          <StatCard
            title="Active Courses"
            value="42"
            trend={{ value: "4.2%", positive: true }}
            icon={Book}
            colored={true}
            variant="success"
          />
          <StatCard
            title="Today's Attendance"
            value="94%"
            trend={{ value: "1.2%", positive: false }}
            icon={ClipboardCheck}
            colored={true}
            variant="warning"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-section">
          {/* Recent Admissions */}
          <div className="rounded-md shadow-card lg:col-span-2 bg-white overflow-hidden">
            <SectionHeader
              title="Recent Admissions"
              onViewAll={() => console.log("View all recent admissions")}
            />
            <div className="p-card">
              <div className="space-y-4">
                {currentAdmissions.map((admission) => (
                  <div
                    key={admission.id}
                    className="flex items-center justify-between p-4 bg-white border border-neutral-gray rounded-md hover:shadow-card transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-color to-primary-dark flex items-center justify-center">
                        <UserPlus size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-dark">
                          {admission.student}
                        </p>
                        <p className="text-xs text-text-gray">
                          ID: {admission.studentId}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-primary-dark">
                        {admission.class}
                      </p>
                      <p className="text-xs text-text-gray">Class</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-primary-dark">
                        {admission.date}
                      </p>
                      <p className="text-xs text-text-gray">Date</p>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          admission.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : admission.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-secondary-color text-primary-color"
                        }`}
                      >
                        {admission.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-xs text-text-gray">
                  Showing {(admissionPage - 1) * recordsPerPage + 1} to{" "}
                  {Math.min(
                    admissionPage * recordsPerPage,
                    admissionsData.length
                  )}{" "}
                  of {admissionsData.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setAdmissionPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={admissionPage === 1}
                    className={`px-3 py-1.5 text-xs rounded-md ${
                      admissionPage === 1
                        ? "text-text-gray bg-neutral-gray cursor-not-allowed"
                        : "text-primary-dark bg-white hover:bg-secondary-color border border-neutral-gray"
                    } transition-all`}
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: totalAdmissionPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setAdmissionPage(page)}
                      className={`px-3 py-1.5 text-xs rounded-md ${
                        admissionPage === page
                          ? "text-white bg-primary-color"
                          : "text-primary-dark bg-white hover:bg-secondary-color border border-neutral-gray"
                      } transition-all`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setAdmissionPage((prev) =>
                        Math.min(prev + 1, totalAdmissionPages)
                      )
                    }
                    disabled={admissionPage === totalAdmissionPages}
                    className={`px-3 py-1.5 text-xs rounded-md ${
                      admissionPage === totalAdmissionPages
                        ? "text-text-gray bg-neutral-gray cursor-not-allowed"
                        : "text-primary-dark bg-white hover:bg-secondary-color border border-neutral-gray"
                    } transition-all`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-md shadow-card overflow-hidden">
            <SectionHeader
              title="Upcoming Events"
              onViewAll={() => console.log("View all upcoming events")}
            />
            <div className="p-card">
              <div className="space-y-4">
                {currentEvents.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white border border-neutral-gray rounded-md hover:shadow-card transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          event.type === "meeting"
                            ? "bg-gradient-to-r from-primary-color to-primary-dark"
                            : event.type === "event"
                            ? "bg-gradient-to-r from-primary-color to-primary-dark"
                            : "bg-gradient-to-r from-primary-color to-primary-dark"
                        }`}
                      >
                        {event.type === "meeting" && (
                          <Users size={18} className="text-white" />
                        )}
                        {event.type === "event" && (
                          <GraduationCap size={18} className="text-white" />
                        )}
                        {event.type === "exam" && (
                          <ScrollText size={18} className="text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-dark">
                          {event.title}
                        </p>
                        <p className="text-xs text-text-gray">{event.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        event.type === "meeting"
                          ? "bg-secondary-color text-primary-color"
                          : event.type === "event"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-xs text-text-gray">
                  Showing {(eventPage - 1) * recordsPerPage + 1} to{" "}
                  {Math.min(eventPage * recordsPerPage, eventsData.length)} of{" "}
                  {eventsData.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setEventPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={eventPage === 1}
                    className={`px-3 py-1.5 text-xs rounded-md ${
                      eventPage === 1
                        ? "text-text-gray bg-neutral-gray cursor-not-allowed"
                        : "text-primary-dark bg-white hover:bg-secondary-color border border-neutral-gray"
                    } transition-all`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalEventPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setEventPage(page)}
                        className={`px-3 py-1.5 text-xs rounded-md ${
                          eventPage === page
                            ? "text-white bg-primary-color"
                            : "text-primary-dark bg-white hover:bg-secondary-color border border-neutral-gray"
                        } transition-all`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setEventPage((prev) =>
                        Math.min(prev + 1, totalEventPages)
                      )
                    }
                    disabled={eventPage === totalEventPages}
                    className={`px-3 py-1.5 text-xs rounded-md ${
                      eventPage === totalEventPages
                        ? "text-text-gray bg-neutral-gray cursor-not-allowed"
                        : "text-primary-dark bg-white hover:bg-secondary-color border border-neutral-gray"
                    } transition-all`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Progress and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-section">
          {/* Course Progress */}
          <div className="bg-white p-card rounded-md shadow-card">
            <SectionHeader title="Course Progress" />
            <div className="space-y-6 mt-6">
              {courseProgressData.map((course, index) => (
                <CourseProgressCard
                  key={index}
                  title={course.title}
                  progress={course.progress}
                />
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white p-card rounded-md shadow-card">
            <SectionHeader title="Announcements" />
            <div className="space-y-4 mt-6">
              {announcementsData.map((announcement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white border border-neutral-gray rounded-md hover:shadow-card transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-color to-primary-dark flex items-center justify-center">
                    <Bell className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-primary-dark">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-text-gray mt-1">
                      {announcement.date}
                    </p>
                    <p className="text-sm text-text-gray mt-2">
                      {announcement.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Collections and Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fee Collections */}
          <div className="bg-white p-card rounded-md shadow-card lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-primary-dark">
                Fee Collections
              </h2>
              <div className="flex space-x-3">
                <select
                  className="text-xs rounded-md px-3 py-2 border border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  aria-label="Select fee collection period"
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
                <button
                  className="text-xs bg-secondary-color text-primary-color hover:bg-primary-color hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                  aria-label="Export fee collection data"
                >
                  Export
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-primary-color to-primary-dark border border-emerald-200 rounded-md p-4">
                <p className="text-xs text-white font-medium">Collected</p>
                <p className="text-2xl font-bold text-white mt-1">$124,580</p>
                <div className="mt-2 flex items-center">
                  <TrendingUp size={14} className="text-white" />
                  <span className="text-xs ml-1 text-white">
                    +8.2% from last period
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary-color to-primary-dark border border-emerald-200 rounded-md p-4">
                <p className="text-xs text-white font-medium">Pending</p>
                <p className="text-2xl font-bold text-white mt-1">$28,350</p>
                <div className="mt-2 flex items-center">
                  <TrendingDown size={14} className="text-white" />
                  <span className="text-xs ml-1 text-white">
                    -3.1% from last period
                  </span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={feeCollectionData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#102257" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#102257"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value: number) =>
                      `${(value / 1000).toFixed(0)}k`
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [
                      `${Number(value).toLocaleString()}`,
                      "Amount",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#102257"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-card rounded-md shadow-card">
            <SectionHeader title="Quick Links" />
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                {
                  title: "View Grades",
                  icon: Award,
                  color: "from-primary-color to-primary-dark",
                },
                {
                  title: "Assignments",
                  icon: BookOpen,
                  color: "from-primary-color to-primary-dark",
                },
                {
                  title: "Fee Payment",
                  icon: CreditCard,
                  color: "from-primary-color to-primary-dark",
                },
                {
                  title: "Schedule Exam",
                  icon: ScrollText,
                  color: "from-primary-color to-primary-dark",
                },
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(link.title)}
                  className="flex flex-col items-center justify-center p-4 rounded-md bg-white border border-neutral-gray hover:shadow-card transition-all duration-300"
                  aria-label={`Access ${link.title}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center mb-2`}
                  >
                    <link.icon size={20} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary-dark text-center">
                    {link.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Additional Quick Actions */}
            <div className="mt-6 p-4  rounded-md">
              <h3 className="text-sm font-semibold text-white mb-3">
                Popular Actions
              </h3>
              <div className="space-y-2 ">
                {[
                  { title: "Generate Report", icon: ScrollText },
                  { title: "Manage Accounts", icon: Users },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action.title)}
                    className="w-full flex items-center p-3 rounded-md bg-gradient-to-r from-primary-color to-primary-dark border border-neutral-gray hover:bg-secondary-color transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center mr-3">
                      <action.icon size={16} className="text-primary-color" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {action.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
