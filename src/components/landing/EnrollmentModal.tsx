import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, User, Mail, Phone, GraduationCap, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          child_name: formData.childName,
          date_of_birth: formData.dateOfBirth,
          class_type: formData.classType,
          parent_name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("🎉 Enrollment request submitted successfully!");
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          childName: "",
          parentName: "",
          email: "",
          phone: "",
          classType: "",
          dateOfBirth: "",
        });
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      onClose();
    }
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
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-background rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-border"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Success State */}
            {isSuccess ? (
              <motion.div
                className="p-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle className="w-20 h-20 text-mint mx-auto mb-6" />
                </motion.div>
                <h3 className="font-fredoka font-bold text-2xl text-foreground mb-3">
                  Enrollment Submitted! 🎉
                </h3>
                <p className="font-nunito text-muted-foreground">
                  Thank you for choosing Rainbow Kids Academy. We'll contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-gradient-rainbow p-5 rounded-t-3xl">
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center text-primary-foreground transition-colors"
                    disabled={isSubmitting}
                  >
                    <X size={18} />
                  </button>
                  
                  <div className="text-center text-primary-foreground">
                    <motion.div
                      className="text-3xl mb-1"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🌈
                    </motion.div>
                    <h2 className="font-fredoka font-bold text-xl">
                      Enroll Your Child
                    </h2>
                    <p className="font-nunito text-xs opacity-90">
                      Start their colorful learning journey today!
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {/* Child Name */}
                  <div className="space-y-1.5">
                    <Label className="font-fredoka font-semibold text-foreground text-sm">
                      Child's Name <span className="text-candy">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter child's name"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        className="pl-10 h-11 rounded-xl border-2 border-border focus:border-sky font-nunito text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth & Class Selection - Side by Side */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="font-fredoka font-semibold text-foreground text-sm">
                        Date of Birth <span className="text-candy">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="pl-10 h-11 rounded-xl border-2 border-border focus:border-sky font-nunito text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="font-fredoka font-semibold text-foreground text-sm">
                        Class <span className="text-candy">*</span>
                      </Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <select
                          value={formData.classType}
                          onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                          className="w-full pl-10 h-11 rounded-xl border-2 border-border focus:border-sky font-nunito bg-background text-foreground text-sm appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Select</option>
                          {classOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Parent Name */}
                  <div className="space-y-1.5">
                    <Label className="font-fredoka font-semibold text-foreground text-sm">
                      Parent/Guardian Name <span className="text-candy">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter parent's name"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="pl-10 h-11 rounded-xl border-2 border-border focus:border-sky font-nunito text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Phone - Side by Side */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="font-fredoka font-semibold text-foreground text-sm">
                        Email <span className="text-candy">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10 h-11 rounded-xl border-2 border-border focus:border-sky font-nunito text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="font-fredoka font-semibold text-foreground text-sm">
                        Phone <span className="text-candy">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10 h-11 rounded-xl border-2 border-border focus:border-sky font-nunito text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div 
                    className="pt-2"
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 btn-playful bg-gradient-rainbow text-primary-foreground rounded-2xl font-fredoka text-base"
                    >
                      {isSubmitting ? (
                        <motion.span
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ⏳
                          </motion.span>
                          Submitting...
                        </motion.span>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Submit Enrollment
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-center text-muted-foreground text-xs font-nunito">
                    We'll contact you within 24 hours to confirm enrollment.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal;
