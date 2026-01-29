import { Bell } from "lucide-react";
import { motion } from "framer-motion";

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  sidebarOpen: boolean;
}

const AdminHeader = ({ title, subtitle, sidebarOpen }: AdminHeaderProps) => {
  return (
    <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="font-fredoka font-bold text-2xl text-foreground">{title}</h1>
        <p className="text-muted-foreground text-sm font-nunito">
          {subtitle}
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
  );
};

export default AdminHeader;
