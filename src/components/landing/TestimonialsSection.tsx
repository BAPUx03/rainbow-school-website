import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Parent of Emma, Age 5",
    content: "Rainbow Kids Academy has been a blessing for our family. Emma has grown so much in confidence and loves going to school every day. The teachers are incredibly caring and creative!",
    rating: 5,
    avatar: "SM",
    color: "bg-candy",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Parent of Lucas, Age 4",
    content: "The curriculum is perfect for young children - learning through play! Lucas comes home excited about what he learned each day. The communication with parents is excellent.",
    rating: 5,
    avatar: "DC",
    color: "bg-sky",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Parent of Aanya, Age 6",
    content: "The best decision we made was enrolling Aanya here. The facilities are wonderful, and the teachers go above and beyond. She's made great friends and loves all the activities!",
    rating: 5,
    avatar: "PS",
    color: "bg-mint",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Parent of Oliver, Age 3",
    content: "As first-time parents, we were nervous about preschool, but Rainbow Kids made the transition so smooth. Oliver adapted quickly and the staff are amazing with the little ones.",
    rating: 5,
    avatar: "MT",
    color: "bg-lavender",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
                "{testimonials[currentIndex].content}"
              </p>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-sunshine fill-sunshine" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className={`w-14 h-14 rounded-full ${testimonials[currentIndex].color} flex items-center justify-center text-primary-foreground font-fredoka font-bold text-lg`}>
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <h4 className="font-fredoka font-bold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-muted-foreground text-sm font-nunito">
                    {testimonials[currentIndex].role}
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
