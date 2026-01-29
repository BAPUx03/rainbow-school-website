import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, User, Mail, Phone, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const classOptions = [
  { value: "playgroup", label: "Play Group (Age 3-4)" },
  { value: "nursery", label: "Nursery (Age 4-5)" },
  { value: "junior-kg", label: "Junior KG (Age 5-6)" },
  { value: "senior-kg", label: "Senior KG (Age 6-7)" },
  { value: "primary", label: "Primary (Age 7-10)" },
];

const EnrollmentModal = ({ isOpen, onClose }: EnrollmentModalProps) => {
  const [formData, setFormData] = useState({
    childName: "",
    parentName: "",
    email: "",
    phone: "",
    classType: "",
    dateOfBirth: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast.success("🎉 Enrollment request submitted! We'll contact you soon.");
      setFormData({
        childName: "",
        parentName: "",
        email: "",
        phone: "",
        classType: "",
        dateOfBirth: "",
      });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-background rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-rainbow p-6 rounded-t-3xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center text-primary-foreground transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center text-primary-foreground">
                <motion.div
                  className="text-4xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌈
                </motion.div>
                <h2 className="font-fredoka font-bold text-2xl">
                  Enroll Your Child
                </h2>
                <p className="font-nunito text-sm opacity-90 mt-1">
                  Start their colorful learning journey today!
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Child Name */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                  Child's Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter child's name"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito"
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito"
                    required
                  />
                </div>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                  Select Class *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={formData.classType}
                    onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                    className="w-full pl-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito bg-background text-foreground appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a class</option>
                    {classOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Parent Name */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                  Parent/Guardian Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter parent's name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-2 border-border focus:border-sky font-nunito"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.div 
                className="pt-4"
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 btn-playful bg-gradient-rainbow text-primary-foreground rounded-2xl font-fredoka text-lg"
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Submit Enrollment
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-center text-muted-foreground text-sm font-nunito">
                We'll contact you within 24 hours to confirm the enrollment.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal;
