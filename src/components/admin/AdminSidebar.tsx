import { motion } from "framer-motion";
import { 
  TrendingUp, GraduationCap, Users, Image, MessageSquare, 
  Settings, ClipboardList, Quote, Palette, Globe, Menu, X, LogOut
} from "lucide-react";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
}

const sidebarItems = [
  { name: "Dashboard", icon: TrendingUp, id: "dashboard" },
  { name: "Enrollments", icon: ClipboardList, id: "enrollments" },
  { name: "SEO & Settings", icon: Globe, id: "seo" },
  { name: "Teachers", icon: Users, id: "teachers" },
  { name: "Classes", icon: GraduationCap, id: "classes" },
  { name: "Activities", icon: Palette, id: "activities" },
  { name: "Gallery", icon: Image, id: "gallery" },
  { name: "Testimonials", icon: Quote, id: "testimonials" },
  { name: "Messages", icon: MessageSquare, id: "messages" },
];

const AdminSidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeSection, 
  setActiveSection,
  onLogout 
}: AdminSidebarProps) => {
  return (
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
              Admin CMS
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
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-nunito font-semibold ${
              activeSection === item.id
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
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors font-nunito font-semibold"
        >
          <LogOut size={22} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
