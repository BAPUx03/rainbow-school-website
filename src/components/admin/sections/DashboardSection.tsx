import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Image, MessageSquare, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface DashboardSectionProps {
  setActiveSection: (section: string) => void;
}

const DashboardSection = ({ setActiveSection }: DashboardSectionProps) => {
  const [stats, setStats] = useState({
    enrollments: 0,
    pendingEnrollments: 0,
    teachers: 0,
    classes: 0,
    galleryItems: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [enrollments, teachers, classes, gallery, messages] = await Promise.all([
        supabase.from("enrollments").select("id, status"),
        supabase.from("teachers").select("id").eq("is_active", true),
        supabase.from("classes").select("id").eq("is_active", true),
        supabase.from("gallery").select("id").eq("is_active", true),
        supabase.from("contact_messages").select("id, is_read"),
      ]);

      const enrollmentData = enrollments.data || [];
      const pendingCount = enrollmentData.filter(e => e.status === "pending").length;
      const unreadCount = (messages.data || []).filter(m => !m.is_read).length;

      setStats({
        enrollments: enrollmentData.length,
        pendingEnrollments: pendingCount,
        teachers: teachers.data?.length || 0,
        classes: classes.data?.length || 0,
        galleryItems: gallery.data?.length || 0,
        unreadMessages: unreadCount,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Enrollments",
      value: stats.enrollments.toString(),
      change: `${stats.pendingEnrollments} pending`,
      icon: Users,
      color: "bg-sky/20 text-sky-dark",
      section: "enrollments",
    },
    {
      title: "Active Classes",
      value: stats.classes.toString(),
      change: "Programs",
      icon: GraduationCap,
      color: "bg-mint/20 text-mint-dark",
      section: "classes",
    },
    {
      title: "Gallery Images",
      value: stats.galleryItems.toString(),
      change: "Photos",
      icon: Image,
      color: "bg-candy/20 text-candy-dark",
      section: "gallery",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages.toString(),
      change: "New enquiries",
      icon: MessageSquare,
      color: "bg-lavender/20 text-lavender-dark",
      section: "messages",
    },
  ];

  const quickActions = [
    { name: "View Enrollments", icon: Users, color: "bg-sky", section: "enrollments" },
    { name: "Manage Gallery", icon: Image, color: "bg-candy", section: "gallery" },
    { name: "View Messages", icon: MessageSquare, color: "bg-mint", section: "messages" },
    { name: "SEO Settings", icon: Calendar, color: "bg-lavender", section: "seo" },
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="card-playful cursor-pointer hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveSection(stat.section)}
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
            {quickActions.map((action) => (
              <motion.button
                key={action.name}
                onClick={() => setActiveSection(action.section)}
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

        {/* Welcome Message */}
        <motion.div
          className="card-playful lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-fredoka font-bold text-lg text-foreground mb-4">
            Welcome to Admin CMS 🌈
          </h3>
          <p className="text-muted-foreground font-nunito mb-4">
            Manage all aspects of your Rainbow Kids Academy website from this dashboard:
          </p>
          <ul className="space-y-2 text-muted-foreground font-nunito">
            <li>📝 <strong>Enrollments:</strong> View and manage enrollment submissions</li>
            <li>🌐 <strong>SEO & Settings:</strong> Update site title, description, and school info</li>
            <li>👩‍🏫 <strong>Teachers:</strong> Add, edit, or remove teacher profiles</li>
            <li>📚 <strong>Classes:</strong> Manage class programs and curricula</li>
            <li>🎨 <strong>Activities:</strong> Update extracurricular activities</li>
            <li>📸 <strong>Gallery:</strong> Upload and manage gallery photos</li>
            <li>💬 <strong>Testimonials:</strong> Manage parent testimonials</li>
            <li>✉️ <strong>Messages:</strong> View contact form submissions</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardSection;
