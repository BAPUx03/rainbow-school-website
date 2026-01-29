import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Activity {
  id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  color_class: string | null;
}

const fallbackActivities = [
  { id: "1", name: "Art & Craft", description: "Express creativity through painting, drawing, and hands-on craft projects.", emoji: "🎨", color_class: "bg-candy" },
  { id: "2", name: "Music & Dance", description: "Explore rhythm, movement, and musical instruments in fun sessions.", emoji: "🎵", color_class: "bg-sky" },
  { id: "3", name: "Story Time", description: "Magical storytelling sessions that spark imagination and language skills.", emoji: "📖", color_class: "bg-lavender" },
  { id: "4", name: "Sports", description: "Physical activities that develop coordination, teamwork, and fitness.", emoji: "⚽", color_class: "bg-mint" },
  { id: "5", name: "Basic Robotics", description: "Introduction to STEM concepts through fun robotics activities.", emoji: "🤖", color_class: "bg-sunshine" },
  { id: "6", name: "Cooking Fun", description: "Simple cooking activities that teach life skills and healthy eating.", emoji: "🍳", color_class: "bg-orange" },
];

const ActivitiesSection = () => {
  const [activities, setActivities] = useState<Activity[]>(fallbackActivities);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (!error && data && data.length > 0) {
        setActivities(data);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section id="activities" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-mint/20 text-mint-dark font-fredoka text-sm font-semibold inline-block mb-4">
            🎭 Activities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-foreground mb-4">
            Fun <span className="text-gradient-rainbow">Extracurricular</span> Activities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-nunito text-lg">
            Beyond academics, we offer diverse activities that help children discover 
            their passions and develop well-rounded personalities.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="card-playful group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className={`w-14 h-14 rounded-2xl ${activity.color_class || 'bg-candy'} flex items-center justify-center text-2xl flex-shrink-0`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {activity.emoji || "🎨"}
                </motion.div>

                <div>
                  <h3 className="font-fredoka font-bold text-xl text-foreground mb-2 group-hover:text-sky transition-colors">
                    {activity.name}
                  </h3>
                  <p className="text-muted-foreground font-nunito text-sm">
                    {activity.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
