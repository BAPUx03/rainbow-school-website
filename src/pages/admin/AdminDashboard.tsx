import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardSection from "@/components/admin/sections/DashboardSection";
import EnrollmentsSection from "@/components/admin/sections/EnrollmentsSection";
import SEOSection from "@/components/admin/sections/SEOSection";
import TeachersSection from "@/components/admin/sections/TeachersSection";
import ClassesSection from "@/components/admin/sections/ClassesSection";
import ActivitiesSection from "@/components/admin/sections/ActivitiesSection";
import GallerySection from "@/components/admin/sections/GallerySection";
import TestimonialsSection from "@/components/admin/sections/TestimonialsSection";
import MessagesSection from "@/components/admin/sections/MessagesSection";

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Welcome back, Admin! 👋" },
  enrollments: { title: "Enrollments", subtitle: "Manage student enrollment requests" },
  seo: { title: "SEO & Settings", subtitle: "Update website metadata and school information" },
  teachers: { title: "Teachers", subtitle: "Manage teacher profiles" },
  classes: { title: "Classes", subtitle: "Manage class programs and curricula" },
  activities: { title: "Activities", subtitle: "Manage extracurricular activities" },
  gallery: { title: "Gallery", subtitle: "Manage photo gallery" },
  testimonials: { title: "Testimonials", subtitle: "Manage parent testimonials" },
  messages: { title: "Messages", subtitle: "View contact form submissions" },
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/admin");
        return;
      }

      // Check if user has admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        toast.error("You do not have admin access");
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin");
      }
    });

    checkAuth();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-5xl"
        >
          🌈
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection setActiveSection={setActiveSection} />;
      case "enrollments":
        return <EnrollmentsSection />;
      case "seo":
        return <SEOSection />;
      case "teachers":
        return <TeachersSection />;
      case "classes":
        return <ClassesSection />;
      case "activities":
        return <ActivitiesSection />;
      case "gallery":
        return <GallerySection />;
      case "testimonials":
        return <TestimonialsSection />;
      case "messages":
        return <MessagesSection />;
      default:
        return <DashboardSection setActiveSection={setActiveSection} />;
    }
  };

  const currentSection = sectionTitles[activeSection] || sectionTitles.dashboard;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-[280px]" : "ml-[80px]"}`}>
        <AdminHeader
          title={currentSection.title}
          subtitle={currentSection.subtitle}
          sidebarOpen={sidebarOpen}
        />
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
