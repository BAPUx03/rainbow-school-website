import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, GraduationCap, Image, MessageSquare, 
  TrendingUp, Calendar, Bell, Settings,
  Menu, X, LogOut, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const stats = [
  {
    title: "Total Students",
    value: "487",
    change: "+12%",
    icon: Users,
    color: "bg-sky/20 text-sky-dark",
    trend: "up",
  },
  {
    title: "Active Classes",
    value: "24",
    change: "+2",
    icon: GraduationCap,
    color: "bg-mint/20 text-mint-dark",
    trend: "up",
  },
  {
    title: "Gallery Uploads",
    value: "156",
    change: "+8",
    icon: Image,
    color: "bg-candy/20 text-candy-dark",
    trend: "up",
  },
  {
    title: "New Enquiries",
    value: "23",
    change: "5 pending",
    icon: MessageSquare,
    color: "bg-lavender/20 text-lavender-dark",
    trend: "neutral",
  },
];

const quickActions = [
  { name: "Add New Class", icon: GraduationCap, color: "bg-sky" },
  { name: "Upload Photos", icon: Image, color: "bg-candy" },
  { name: "View Enquiries", icon: MessageSquare, color: "bg-mint" },
  { name: "Edit Content", icon: Settings, color: "bg-lavender" },
];

const recentActivities = [
  { action: "New student enrollment", name: "Emma Watson", time: "2 hours ago", emoji: "🎉" },
  { action: "Gallery updated", name: "Art Class Photos", time: "5 hours ago", emoji: "📸" },
  { action: "New enquiry received", name: "Contact Form", time: "Yesterday", emoji: "✉️" },
  { action: "Teacher profile updated", name: "Miss Lily", time: "2 days ago", emoji: "👩‍🏫" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in (demo purpose)
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const sidebarItems = [
    { name: "Dashboard", icon: TrendingUp, active: true },
    { name: "Classes", icon: GraduationCap, active: false },
    { name: "Teachers", icon: Users, active: false },
    { name: "Gallery", icon: Image, active: false },
    { name: "Enquiries", icon: MessageSquare, active: false },
    { name: "Content", icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 h-full bg-card border-r border-border z-40 flex flex-col"
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl">🌈</span>
              <span className="font-fredoka font-bold text-lg text-foreground">
                Admin Panel
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <motion.button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-nunito font-semibold ${
                item.active
                  ? "bg-sky/20 text-sky-dark"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              whileHover={{ x: 4 }}
            >
              <item.icon size={22} />
              {sidebarOpen && <span>{item.name}</span>}
            </motion.button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors font-nunito font-semibold"
          >
            <LogOut size={22} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-[280px]" : "ml-[80px]"}`}>
        {/* Header */}
        <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="font-fredoka font-bold text-2xl text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm font-nunito">
              Welcome back, Admin! 👋
            </p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              className="relative p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </motion.button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-rainbow flex items-center justify-center text-primary-foreground font-fredoka font-bold">
                A
              </div>
              {sidebarOpen && (
                <div className="text-left">
                  <p className="font-fredoka font-semibold text-foreground text-sm">Admin</p>
                  <p className="text-muted-foreground text-xs font-nunito">Super Admin</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="card-playful"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-sm font-nunito font-semibold text-mint-dark">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-fredoka font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground text-sm font-nunito">
                  {stat.title}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <motion.div
              className="card-playful lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-fredoka font-bold text-lg text-foreground mb-4">
                Quick Actions ⚡
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.name}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center text-primary-foreground`}>
                      <action.icon size={20} />
                    </div>
                    <span className="font-nunito font-semibold text-foreground flex-1 text-left">
                      {action.name}
                    </span>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="card-playful lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-fredoka font-bold text-lg text-foreground">
                  Recent Activity 📋
                </h3>
                <Button variant="ghost" size="sm" className="font-nunito">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-2xl">{activity.emoji}</span>
                    <div className="flex-1">
                      <p className="font-nunito font-semibold text-foreground text-sm">
                        {activity.action}
                      </p>
                      <p className="text-muted-foreground text-xs font-nunito">
                        {activity.name}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-xs font-nunito">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Calendar Preview */}
          <motion.div
            className="card-playful mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-fredoka font-bold text-lg text-foreground flex items-center gap-2">
                <Calendar className="text-sky" size={22} />
                Upcoming Events
              </h3>
              <Button variant="ghost" size="sm" className="font-nunito">
                View Calendar
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { date: "Feb 14", title: "Valentine's Day Celebration", color: "bg-candy/20 border-candy" },
                { date: "Feb 20", title: "Parent-Teacher Meeting", color: "bg-sky/20 border-sky" },
                { date: "Mar 1", title: "Annual Sports Day", color: "bg-mint/20 border-mint" },
              ].map((event, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${event.color} border-l-4`}
                >
                  <p className="font-fredoka font-bold text-foreground">{event.date}</p>
                  <p className="text-muted-foreground text-sm font-nunito">{event.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
