import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Check if user has admin role
        const { data: roles, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin");

        if (roleError || !roles || roles.length === 0) {
          toast.error("You do not have admin access. Please contact the administrator.");
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }

        toast.success("Welcome back! 🌈");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // For the first admin user, automatically grant admin role
        // In production, you would want a more secure onboarding process
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert([{ user_id: data.user.id, role: "admin" }]);

        if (roleError) {
          // Role might already exist or user doesn't have permission
          console.log("Role assignment:", roleError.message);
        }

        toast.success("Account created! You can now login.");
        setIsSignUp(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-20 text-6xl opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌈
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-6xl opacity-20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ⭐
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-playful">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="text-5xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌈
            </motion.div>
            <h1 className="font-fredoka font-bold text-2xl text-foreground mb-2">
              Admin Portal
            </h1>
            <p className="text-muted-foreground font-nunito text-sm">
              {isSignUp ? "Create an admin account" : "Sign in to manage Rainbow Kids Academy"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@rainbowkids.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-sky focus:ring-sky"
                  />
                  <span className="text-sm text-muted-foreground font-nunito">Remember me</span>
                </label>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 btn-playful bg-gradient-rainbow text-primary-foreground rounded-xl font-fredoka text-lg"
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⏳
                  </motion.span>
                ) : isSignUp ? (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" /> Create Account
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-sky hover:underline font-nunito"
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>

          {/* Back to Website */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-sky font-nunito"
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
