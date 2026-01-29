import { motion } from "framer-motion";
import { Heart, Star, Award, Users } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Loving Environment",
    description: "A safe and nurturing space where every child feels valued and loved.",
    color: "bg-candy/20 text-candy-dark",
  },
  {
    icon: Star,
    title: "Creative Learning",
    description: "Hands-on activities that spark imagination and encourage exploration.",
    color: "bg-sunshine/20 text-sunshine-dark",
  },
  {
    icon: Award,
    title: "Qualified Teachers",
    description: "Experienced educators dedicated to your child's growth and development.",
    color: "bg-lavender/20 text-lavender-dark",
  },
  {
    icon: Users,
    title: "Small Class Sizes",
    description: "Personal attention for every child with our low student-to-teacher ratio.",
    color: "bg-mint/20 text-mint-dark",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-sky/20 text-sky-dark font-fredoka text-sm font-semibold inline-block mb-4">
            ✨ About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient-rainbow">Rainbow Kids?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-nunito text-lg">
            At Rainbow Kids Academy, we believe every child is unique and special. 
            Our holistic approach to early education combines play-based learning 
            with structured activities to nurture young minds.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card-playful text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4`}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <feature.icon size={32} />
              </motion.div>
              <h3 className="font-fredoka font-bold text-xl mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-nunito text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          className="bg-gradient-ocean rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-fredoka font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Our Mission 🎯
          </h3>
          <p className="text-primary-foreground/90 font-nunito text-lg max-w-3xl mx-auto">
            "To provide a joyful, inclusive, and stimulating environment where children 
            develop confidence, creativity, and a lifelong love for learning through 
            play-based education and meaningful experiences."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
