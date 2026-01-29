import { motion } from "framer-motion";
import { Sparkles, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onEnrollClick: () => void;
}

const CTASection = ({ onEnrollClick }: CTASectionProps) => {
  return (
    <section className="py-20 bg-gradient-rainbow relative overflow-hidden">
      {/* Floating decorations */}
      <motion.div
        className="absolute top-10 left-10 text-6xl opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-6xl opacity-20"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🎈
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 text-4xl opacity-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🌟
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎓
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-primary-foreground mb-4">
            Ready to Join Our Rainbow Family?
          </h2>
          
          <p className="text-primary-foreground/90 font-nunito text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Give your child the gift of joyful learning! Admissions are now open 
            for the 2025-26 academic year. Limited seats available!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={onEnrollClick}
                className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-lg rounded-full font-fredoka shadow-lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Enroll Now
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg rounded-full font-fredoka"
                onClick={() => window.open("tel:+917016592727")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </motion.div>
          </div>

          {/* Feature badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              "🏫 Modern Facilities",
              "👩‍🏫 Expert Teachers",
              "🎨 Creative Learning",
              "🚌 Transport Available",
            ].map((feature, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-primary-foreground/20 rounded-full text-primary-foreground font-nunito text-sm font-medium backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
