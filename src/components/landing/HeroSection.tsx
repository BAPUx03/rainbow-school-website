import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Cloud, Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const floatingElements = [
  { icon: Star, color: "text-sunshine", delay: 0, x: "10%", y: "20%" },
  { icon: Cloud, color: "text-sky", delay: 0.5, x: "85%", y: "15%" },
  { icon: Heart, color: "text-candy", delay: 1, x: "15%", y: "70%" },
  { icon: Sparkles, color: "text-lavender", delay: 1.5, x: "80%", y: "65%" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Floating Decorations */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.color} opacity-60`}
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <el.icon size={40} />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-candy/20 text-candy-dark font-fredoka text-sm font-semibold">
                🌟 Admissions Open for 2025-26
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-foreground mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-gradient-rainbow">Rainbow Kids Academy</span>{" "}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 20, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🌈
              </motion.span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 font-nunito max-w-xl mx-auto lg:mx-0">
              Where Learning Is Fun, Colorful & Creative! We nurture young minds 
              with love, creativity, and joyful education for children aged 3-10 years.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="btn-playful bg-gradient-rainbow text-primary-foreground px-8 py-6 text-lg rounded-full"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Enroll Now
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full border-2 border-sky hover:bg-sky/10"
                >
                  Take a Tour
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "500+", label: "Happy Students" },
                { value: "15+", label: "Expert Teachers" },
                { value: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-fredoka font-bold text-sky-dark">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-nunito">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-rainbow rounded-3xl opacity-20 blur-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <img
                src={heroImage}
                alt="Happy children at Rainbow Kids Academy"
                className="relative rounded-3xl shadow-2xl w-full max-w-2xl mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
