import { motion } from "framer-motion";
import { Baby, BookOpen, GraduationCap, School } from "lucide-react";
import { Button } from "@/components/ui/button";

const classes = [
  {
    icon: Baby,
    name: "Play Group",
    age: "Age 3-4",
    description: "Introduction to learning through play, sensory activities, and social interaction.",
    features: ["Sensory Play", "Basic Shapes & Colors", "Rhymes & Songs", "Motor Skills"],
    color: "from-candy to-candy-dark",
    bgColor: "bg-candy/10",
  },
  {
    icon: BookOpen,
    name: "Nursery",
    age: "Age 4-5",
    description: "Building foundational skills in literacy, numeracy, and creative expression.",
    features: ["Alphabet Recognition", "Number Concepts", "Art & Craft", "Story Time"],
    color: "from-sky to-sky-dark",
    bgColor: "bg-sky/10",
  },
  {
    icon: School,
    name: "Junior KG",
    age: "Age 5-6",
    description: "Developing reading, writing, and mathematical thinking skills.",
    features: ["Reading Basics", "Simple Math", "Science Exploration", "Physical Education"],
    color: "from-mint to-mint-dark",
    bgColor: "bg-mint/10",
  },
  {
    icon: GraduationCap,
    name: "Senior KG",
    age: "Age 6-7",
    description: "Preparing for primary school with advanced academic and life skills.",
    features: ["Advanced Reading", "Problem Solving", "Environmental Studies", "Digital Basics"],
    color: "from-lavender to-lavender-dark",
    bgColor: "bg-lavender/10",
  },
];

const ClassesSection = () => {
  return (
    <section id="classes" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-sunshine/20 text-sunshine-dark font-fredoka text-sm font-semibold inline-block mb-4">
            📚 Our Classes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-foreground mb-4">
            Programs for <span className="text-gradient-rainbow">Every Age</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-nunito text-lg">
            Age-appropriate curriculum designed to meet developmental milestones 
            while making learning an exciting adventure.
          </p>
        </motion.div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={index}
              className={`card-playful ${classItem.bgColor} overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${classItem.color} flex items-center justify-center flex-shrink-0`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <classItem.icon size={40} className="text-primary-foreground" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-fredoka font-bold text-2xl text-foreground">
                      {classItem.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-background text-sm font-fredoka font-semibold text-muted-foreground">
                      {classItem.age}
                    </span>
                  </div>

                  <p className="text-muted-foreground font-nunito mb-4">
                    {classItem.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {classItem.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-background text-xs font-nunito font-semibold text-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="font-fredoka font-semibold hover:bg-background/50"
                  >
                    Learn More →
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
