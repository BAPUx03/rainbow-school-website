import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  image_url: string;
  alt_text: string | null;
  category: string | null;
}

const fallbackGalleryItems = [
  { id: "1", image_url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop", alt_text: "Children painting in art class", category: "Art" },
  { id: "2", image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop", alt_text: "Kids playing in the playground", category: "Play" },
  { id: "3", image_url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=400&fit=crop", alt_text: "Story time with teacher", category: "Learning" },
  { id: "4", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", alt_text: "Children doing crafts", category: "Craft" },
  { id: "5", image_url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop", alt_text: "Music class performance", category: "Music" },
  { id: "6", image_url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop", alt_text: "Outdoor activities", category: "Sports" },
];

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackGalleryItems);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (!error && data && data.length > 0) {
        setGalleryItems(data);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-orange/20 text-orange-dark font-fredoka text-sm font-semibold inline-block mb-4">
            📸 Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-bold text-foreground mb-4">
            Moments of <span className="text-gradient-rainbow">Joy & Learning</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-nunito text-lg">
            Explore snapshots from our classrooms, events, and activities that 
            capture the happiness and growth of our little learners.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image_url}
                alt={item.alt_text || "Gallery image"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-background/80 text-foreground text-sm font-fredoka font-semibold">
                    {item.category || "Photo"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
                >
                  <X className="w-6 h-6 text-background" />
                </button>
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.alt_text || "Gallery image"}
                  className="w-full rounded-2xl shadow-2xl"
                />
                <p className="text-center text-background font-fredoka mt-4">
                  {selectedImage.alt_text}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
