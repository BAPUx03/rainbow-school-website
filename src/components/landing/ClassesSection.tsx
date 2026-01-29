import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Baby, BookOpen, GraduationCap, School, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ClassItem {
  id: string;
  name: string;
  age_range: string;
  description: string | null;
  features: string[] | null;
  icon_name: string | null;
  color_class: string | null;
  bg_color_class: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Baby,
  BookOpen,
  School,
  GraduationCap,
};

const fallbackClasses = [
  {
    id: "1",
    name: "Play Group",
    age_range: "Age 3-4",
    description: "Introduction to learning through play, sensory activities, and social interaction.",
    features: ["Sensory Play", "Basic Shapes & Colors", "Rhymes & Songs", "Motor Skills"],
    icon_name: "Baby",
    color_class: "from-candy to-candy-dark",
    bg_color_class: "bg-candy/10",
  },
  {
    id: "2",
    name: "Nursery",
    age_range: "Age 4-5",
    description: "Building foundational skills in literacy, numeracy, and creative expression.",
    features: ["Alphabet Recognition", "Number Concepts", "Art & Craft", "Story Time"],
    icon_name: "BookOpen",
    color_class: "from-sky to-sky-dark",
    bg_color_class: "bg-sky/10",
  },
  {
    id: "3",
    name: "Junior KG",
    age_range: "Age 5-6",
    description: "Developing reading, writing, and mathematical thinking skills.",
    features: ["Reading Basics", "Simple Math", "Science Exploration", "Physical Education"],
    icon_name: "School",
    color_class: "from-mint to-mint-dark",
    bg_color_class: "bg-mint/10",
  },
  {
    id: "4",
    name: "Senior KG",
    age_range: "Age 6-7",
    description: "Preparing for primary school with advanced academic and life skills.",
    features: ["Advanced Reading", "Problem Solving", "Environmental Studies", "Digital Basics"],
    icon_name: "GraduationCap",
    color_class: "from-lavender to-lavender-dark",
    bg_color_class: "bg-lavender/10",
  },
];

const ClassesSection = () => {
  const [classes, setClasses] = useState<ClassItem[]>(fallbackClasses);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (!error && data && data.length > 0) {
        setClasses(data);
      }
    };

    fetchClasses();
  }, []);

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
          {classes.map((classItem, index) => {
            const IconComponent = iconMap[classItem.icon_name || "Baby"] || Baby;
            
            return (
              <motion.div
                key={classItem.id}
                className={`card-playful ${classItem.bg_color_class || 'bg-candy/10'} overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${classItem.color_class || 'from-candy to-candy-dark'} flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <IconComponent size={40} className="text-primary-foreground" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-fredoka font-bold text-2xl text-foreground">
                        {classItem.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-background text-sm font-fredoka font-semibold text-muted-foreground">
                        {classItem.age_range}
                      </span>
                    </div>

                    <p className="text-muted-foreground font-nunito mb-4">
                      {classItem.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {classItem.features?.map((feature, i) => (
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
