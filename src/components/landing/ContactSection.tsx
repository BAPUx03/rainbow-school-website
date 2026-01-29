import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Near City Garden, Vastrapur, Ahmedabad, Gujarat 380015",
    color: "bg-candy/20 text-candy-dark",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 7016592727",
    color: "bg-sky/20 text-sky-dark",
  },
  {
    icon: Mail,
    title: "Email",
    content: "pruthvirajsinh.biz@gmail.com",
    color: "bg-mint/20 text-mint-dark",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon-Sat: 8:00 AM - 5:00 PM",
    color: "bg-lavender/20 text-lavender-dark",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon. 🌈");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-background">
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
            📍 Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-foreground mb-4">
            Get In <span className="text-gradient-rainbow">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-nunito text-lg">
            Have questions about enrollment or want to schedule a visit? 
            We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="card-playful flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-fredoka font-semibold text-foreground">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground text-sm font-nunito">
                      {info.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map - Ahmedabad Location */}
            <div className="rounded-3xl overflow-hidden h-64 bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9024892925!2d72.5273852!3d23.0396541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f6d7f4d4e9%3A0x8d5c1b8f0f8f8f8f!2sVastrapur%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rainbow Kids Academy Location - Ahmedabad"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-playful">
              <h3 className="font-fredoka font-bold text-2xl text-foreground mb-6">
                Send us a Message ✉️
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-xl border-2 border-border focus:border-sky h-12 font-nunito"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl border-2 border-border focus:border-sky h-12 font-nunito"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-xl border-2 border-border focus:border-sky h-12 font-nunito"
                  />
                </div>

                <div>
                  <label className="block text-sm font-fredoka font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-xl border-2 border-border focus:border-sky min-h-32 font-nunito"
                    required
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-playful bg-gradient-rainbow text-primary-foreground h-14 text-lg rounded-2xl"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
