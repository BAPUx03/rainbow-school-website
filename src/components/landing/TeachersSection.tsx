import { motion } from "framer-motion";
import teacherLily from "@/assets/teacher-lily.jpg";
import teacherTom from "@/assets/teacher-tom.jpg";
import teacherEmma from "@/assets/teacher-emma.jpg";

const teachers = [
  {
    name: "Miss Lily Johnson",
    role: "Art Teacher",
    bio: "Passionate about nurturing creativity in young minds through colorful art projects.",
    image: teacherLily,
    color: "from-candy to-candy-dark",
  },
  {
    name: "Mr. Tom Brown",
    role: "Sports Coach",
    bio: "Dedicated to helping children develop physical skills while having fun.",
    image: teacherTom,
    color: "from-mint to-mint-dark",
  },
  {
    name: "Miss Emma Lee",
    role: "Storytelling Teacher",
    bio: "Bringing magical stories to life and inspiring a love for reading.",
    image: teacherEmma,
    color: "from-lavender to-lavender-dark",
  },
];

const TeachersSection = () => {
  return (
    <section id="teachers" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-lavender/20 text-lavender-dark font-fredoka text-sm font-semibold inline-block mb-4">
            👩‍🏫 Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-foreground mb-4">
            Meet Our <span className="text-gradient-rainbow">Amazing Teachers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-nunito text-lg">
            Our qualified and caring educators create a nurturing environment 
            where every child can thrive and reach their full potential.
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              className="card-playful text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Image */}
              <motion.div
                className="relative mb-6 mx-auto w-40 h-40"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${teacher.color} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-background shadow-lg"
                />
              </motion.div>

              {/* Info */}
              <h3 className="font-fredoka font-bold text-xl text-foreground mb-1">
                {teacher.name}
              </h3>
              <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${teacher.color} text-primary-foreground text-sm font-fredoka font-semibold mb-3`}>
                {teacher.role}
              </span>
              <p className="text-muted-foreground font-nunito text-sm">
                {teacher.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;
