import { motion } from "framer-motion";
import { Instagram, Heart, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Classes", href: "#classes" },
    { name: "Activities", href: "#activities" },
    { name: "Gallery", href: "#gallery" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "#contact" },
    { name: "FAQs", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/", color: "hover:bg-candy", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/pruthvirajsinh-makwana-635974393/", color: "hover:bg-sky", label: "LinkedIn" },
    { icon: Mail, href: "mailto:pruthvirajsinh.biz@gmail.com", color: "hover:bg-mint", label: "Email" },
    { icon: Phone, href: "tel:+917016592727", color: "hover:bg-lavender", label: "Phone" },
  ];

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌈</span>
              <span className="font-fredoka font-bold text-xl">Rainbow Kids</span>
            </div>
            <p className="text-background/70 font-nunito text-sm mb-4">
              Where learning is fun, colorful, and creative! Nurturing young minds 
              since 2018 with love and dedication in Ahmedabad, Gujarat.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full bg-background/10 flex items-center justify-center transition-colors ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-fredoka font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background font-nunito text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-fredoka font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background font-nunito text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-fredoka font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-background/70 font-nunito text-sm mb-4">
              Subscribe to our newsletter for updates and parenting tips!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/50 font-nunito text-sm focus:outline-none focus:border-sky"
              />
              <motion.button
                className="px-4 py-2 bg-gradient-rainbow rounded-xl font-fredoka font-semibold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 font-nunito text-sm text-center md:text-left">
              © {currentYear} Rainbow Kids Academy. All rights reserved.
            </p>
            <p className="text-background/50 font-nunito text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-candy fill-candy" /> for our little stars
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
