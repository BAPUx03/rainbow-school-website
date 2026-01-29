import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number | null;
  avatar_initials: string | null;
  color_class: string | null;
}

const fallbackTestimonials = [
  { id: "1", name: "Priya Patel", role: "Parent of Aarav, Age 5", content: "Rainbow Kids Academy has been a blessing for our family. Aarav has grown so much in confidence and loves going to school every day. The teachers are incredibly caring and creative!", rating: 5, avatar_initials: "PP", color_class: "bg-candy" },
  { id: "2", name: "Rajesh Sharma", role: "Parent of Ananya, Age 4", content: "The curriculum is perfect for young children - learning through play! Ananya comes home excited about what she learned each day. The communication with parents is excellent.", rating: 5, avatar_initials: "RS", color_class: "bg-sky" },
  { id: "3", name: "Meera Desai", role: "Parent of Ishaan, Age 6", content: "The best decision we made was enrolling Ishaan here. The facilities are wonderful, and the teachers go above and beyond. He's made great friends and loves all the activities!", rating: 5, avatar_initials: "MD", color_class: "bg-mint" },
  { id: "4", name: "Amit Mehta", role: "Parent of Kavya, Age 3", content: "As first-time parents, we were nervous about preschool, but Rainbow Kids made the transition so smooth. Kavya adapted quickly and the staff are amazing with the little ones.", rating: 5, avatar_initials: "AM", color_class: "bg-lavender" },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-candy/20 text-candy-dark font-fredoka text-sm font-semibold inline-block mb-4">
            💬 Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-foreground mb-4">
            What <span className="text-gradient-rainbow">Parents Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-nunito text-lg">
            Don't just take our word for it - hear from the families who have 
            made Rainbow Kids Academy part of their lives.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="card-playful text-center py-12 px-8 md:px-16 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-sky/30 mx-auto mb-6" />

              {/* Content */}
              <p className="text-lg md:text-xl text-foreground font-nunito mb-8 italic leading-relaxed">
                "{currentTestimonial?.content}"
              </p>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(currentTestimonial?.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-sunshine fill-sunshine" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className={`w-14 h-14 rounded-full ${currentTestimonial?.color_class || 'bg-candy'} flex items-center justify-center text-primary-foreground font-fredoka font-bold text-lg`}>
                  {currentTestimonial?.avatar_initials}
                </div>
                <div className="text-left">
                  <h4 className="font-fredoka font-bold text-foreground">
                    {currentTestimonial?.name}
                  </h4>
                  <p className="text-muted-foreground text-sm font-nunito">
                    {currentTestimonial?.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-2 border-sky hover:bg-sky/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-sky w-8" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-2 border-sky hover:bg-sky/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
